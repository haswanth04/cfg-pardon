import React, { createContext, useContext, useState, useEffect } from 'react';

const DatabaseContext = createContext();

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

export const DatabaseProvider = ({ children }) => {
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, error, success
  const [pendingChanges, setPendingChanges] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending changes count from localStorage
    const savedPending = localStorage.getItem('pendingChanges');
    if (savedPending) {
      setPendingChanges(parseInt(savedPending, 10));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync data when online (mock implementation)
  const syncData = async () => {
    if (!isOnline) return;

    setSyncStatus('syncing');
    
    try {
      // Simulate API sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear pending changes after successful sync
      setPendingChanges(0);
      localStorage.removeItem('pendingChanges');
      localStorage.removeItem('pendingData');
      
      setSyncStatus('success');
      
      // Auto-hide success status after 3 seconds
      setTimeout(() => setSyncStatus('idle'), 3000);
      
      return { success: true, synced: pendingChanges };
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 5000);
      throw error;
    }
  };

  // Save document to localStorage (offline-first)
  const saveDocument = async (doc) => {
    try {
      const timestamp = new Date().toISOString();
      const documentWithMeta = {
        ...doc,
        id: doc.id || `${doc.type}_${Date.now()}`,
        timestamp,
        synced: false
      };
      
      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem('pendingData') || '[]');
      const updatedData = [...existingData, documentWithMeta];
      localStorage.setItem('pendingData', JSON.stringify(updatedData));
      
      // Update pending changes count
      const newPendingCount = pendingChanges + 1;
      setPendingChanges(newPendingCount);
      localStorage.setItem('pendingChanges', newPendingCount.toString());
      
      // Auto-sync if online
      if (isOnline) {
        setTimeout(syncData, 1000);
      }
      
      return { success: true, id: documentWithMeta.id };
    } catch (error) {
      console.error('Save failed:', error);
      throw error;
    }
  };

  // Get documents from localStorage
  const getDocuments = async (type) => {
    try {
      const allData = JSON.parse(localStorage.getItem('pendingData') || '[]');
      return allData.filter(doc => doc.type === type);
    } catch (error) {
      console.error('Get documents failed:', error);
      return [];
    }
  };

  // Get pending changes count
  const getPendingChanges = async () => {
    try {
      const allData = JSON.parse(localStorage.getItem('pendingData') || '[]');
      const pending = allData.filter(doc => !doc.synced).length;
      setPendingChanges(pending);
      return pending;
    } catch (error) {
      console.error('Get pending changes failed:', error);
      return 0;
    }
  };

  // Auto-sync when coming online
  useEffect(() => {
    if (isOnline && pendingChanges > 0) {
      syncData();
    }
  }, [isOnline, pendingChanges]);

  const value = {
    syncStatus,
    pendingChanges,
    isOnline,
    syncData,
    saveDocument,
    getDocuments,
    getPendingChanges
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};