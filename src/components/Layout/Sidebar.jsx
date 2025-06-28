import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useDatabase } from '../../contexts/DatabaseContext';
import { Home, BookOpen, Users, BarChart3, MessageSquare, Upload, Map, MapPin, MessageCircle, X, Wifi, WifiOff, FolderSync as Sync } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { syncStatus, pendingChanges, isOnline, syncData } = useDatabase();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: t('dashboard'), roles: ['admin', 'fieldOfficer', 'shgWoman'] },
    { id: 'training', icon: BookOpen, label: t('training'), roles: ['admin', 'fieldOfficer', 'shgWoman'] },
    { id: 'community', icon: Users, label: t('community'), roles: ['admin', 'fieldOfficer', 'shgWoman'] },
    { id: 'analytics', icon: BarChart3, label: t('analytics'), roles: ['admin', 'fieldOfficer'] },
    { id: 'media', icon: Upload, label: 'Media', roles: ['admin', 'fieldOfficer', 'shgWoman'] },
    { id: 'map', icon: Map, label: 'Map', roles: ['admin', 'fieldOfficer'] },
    { id: 'heatmap', icon: MapPin, label: 'Impact Heatmap', roles: ['admin', 'fieldOfficer'] },
    { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', roles: ['admin', 'fieldOfficer', 'shgWoman'] },
    { id: 'chatbot', icon: MessageSquare, label: t('chatbot'), roles: ['admin', 'fieldOfficer', 'shgWoman'] }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  const getSyncStatusColor = () => {
    switch (syncStatus) {
      case 'syncing': return 'text-blue-500';
      case 'success': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getSyncStatusText = () => {
    switch (syncStatus) {
      case 'syncing': return 'Syncing...';
      case 'success': return 'Synced';
      case 'error': return 'Sync failed';
      default: return isOnline ? 'Online' : 'Offline';
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 md:hidden">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button onClick={onClose} className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sync Status */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${getSyncStatusColor()}`}>
                {getSyncStatusText()}
              </span>
            </div>
            
            {pendingChanges > 0 && (
              <button
                onClick={syncData}
                className="flex items-center space-x-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                <Sync className="h-3 w-3" />
                <span>{pendingChanges}</span>
              </button>
            )}
          </div>
        </div>

        <nav className="mt-4 px-4">
          <ul className="space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User role indicator */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-600">{t(user?.role)}</p>
            <p className="text-xs text-gray-500">{user?.village}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;