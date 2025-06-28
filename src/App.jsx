import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OfflineProvider } from './contexts/OfflineContext';
import { VoiceProvider } from './contexts/VoiceContext';
import { DatabaseProvider } from './contexts/DatabaseContext';
import { GamificationProvider } from './contexts/GamificationContext';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import TrainingModule from './components/Training/TrainingModule';
import CommunityModule from './components/Community/CommunityModule';
import AnalyticsModule from './components/Analytics/AnalyticsModule';
import MediaModule from './components/Media/MediaModule';
import EnhancedChatbot from './components/Chatbot/EnhancedChatbot';
import MapModule from './components/Map/MapModule';
import ImpactHeatmap from './components/Map/ImpactHeatmap';
import WhatsAppIntegration from './components/WhatsApp/WhatsAppIntegration';
import VoiceNavigator from './components/Voice/VoiceNavigator';
import BadgeModal from './components/Gamification/BadgeModal';
import ProgressTracker from './components/Gamification/ProgressTracker';
import './i18n';

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Dashboard />
            </div>
            <div>
              <ProgressTracker />
            </div>
          </div>
        );
      case 'training':
        return <TrainingModule />;
      case 'community':
        return <CommunityModule />;
      case 'analytics':
        return <AnalyticsModule />;
      case 'media':
        return <MediaModule />;
      case 'chatbot':
        return <EnhancedChatbot />;
      case 'map':
        return <MapModule />;
      case 'heatmap':
        return <ImpactHeatmap />;
      case 'whatsapp':
        return <WhatsAppIntegration />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <main className="flex-1 p-6 md:ml-64">
          <div className="max-w-7xl mx-auto">
            {renderActiveComponent()}
          </div>
        </main>
      </div>

      {/* Voice Navigator */}
      <VoiceNavigator 
        onNavigate={setActiveTab} 
        currentPage={activeTab} 
      />

      {/* Badge Achievement Modal */}
      <BadgeModal />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <OfflineProvider>
        <DatabaseProvider>
          <VoiceProvider>
            <GamificationProvider>
              <AppContent />
            </GamificationProvider>
          </VoiceProvider>
        </DatabaseProvider>
      </OfflineProvider>
    </AuthProvider>
  );
}

export default App;