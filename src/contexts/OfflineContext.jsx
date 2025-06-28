import React, { createContext, useContext, useState, useEffect } from 'react';

const OfflineContext = createContext();

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

export const OfflineProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState({});
  const [pendingSync, setPendingSync] = useState([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load offline data from localStorage
    const savedOfflineData = localStorage.getItem('offlineData');
    const savedPendingSync = localStorage.getItem('pendingSync');

    if (savedOfflineData) {
      try {
        setOfflineData(JSON.parse(savedOfflineData));
      } catch (error) {
        console.error('Error loading offline data:', error);
      }
    }

    if (savedPendingSync) {
      try {
        setPendingSync(JSON.parse(savedPendingSync));
      } catch (error) {
        console.error('Error loading pending sync data:', error);
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveOfflineData = (key, data) => {
    const updatedOfflineData = { ...offlineData, [key]: data };
    setOfflineData(updatedOfflineData);
    localStorage.setItem('offlineData', JSON.stringify(updatedOfflineData));
  };

  const getOfflineData = (key) => {
    return offlineData[key] || null;
  };

  const addToPendingSync = (operation) => {
    const updatedPendingSync = [...pendingSync, { ...operation, timestamp: Date.now() }];
    setPendingSync(updatedPendingSync);
    localStorage.setItem('pendingSync', JSON.stringify(updatedPendingSync));
  };

  const syncData = async () => {
    if (!isOnline || pendingSync.length === 0) return;

    try {
      // Simulate sync operations
      for (const operation of pendingSync) {
        console.log('Syncing operation:', operation);
        // In a real app, this would make API calls
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Clear pending sync after successful sync
      setPendingSync([]);
      localStorage.removeItem('pendingSync');
      
      return { success: true, synced: pendingSync.length };
    } catch (error) {
      console.error('Sync failed:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    isOnline,
    offlineData,
    pendingSync,
    saveOfflineData,
    getOfflineData,
    addToPendingSync,
    syncData
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
};