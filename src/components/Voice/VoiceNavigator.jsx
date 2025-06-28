import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useVoice } from '../../contexts/VoiceContext';
import { useGamification } from '../../contexts/GamificationContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Headphones,
  MessageSquare
} from 'lucide-react';

const VoiceNavigator = ({ onNavigate, currentPage }) => {
  const { t, i18n } = useTranslation();
  const { 
    isListening, 
    isReading, 
    voiceMode, 
    setVoiceMode,
    speak, 
    stopSpeaking,
    startListening, 
    stopListening,
    processVoiceCommand,
    isSupported,
    isSpeechSupported
  } = useVoice();
  const { updateAchievement, achievements } = useGamification();
  const [showVoiceHelp, setShowVoiceHelp] = useState(false);

  // Voice commands for navigation
  const navigationCommands = {
    en: {
      dashboard: ['dashboard', 'home', 'main'],
      training: ['training', 'courses', 'learn', 'education'],
      community: ['community', 'groups', 'discussion'],
      analytics: ['analytics', 'reports', 'data'],
      media: ['media', 'photos', 'upload'],
      chatbot: ['chatbot', 'help', 'assistant']
    },
    hi: {
      dashboard: ['डैशबोर्ड', 'होम', 'मुख्य'],
      training: ['प्रशिक्षण', 'कोर्स', 'सीखना', 'शिक्षा'],
      community: ['समुदाय', 'समूह', 'चर्चा'],
      analytics: ['विश्लेषण', 'रिपोर्ट', 'डेटा'],
      media: ['मीडिया', 'फोटो', 'अपलोड'],
      chatbot: ['चैटबॉट', 'सहायता', 'सहायक']
    }
  };

  // Toggle voice mode
  const toggleVoiceMode = () => {
    const newMode = !voiceMode;
    setVoiceMode(newMode);
    
    if (newMode) {
      speak(t('voiceModeEnabled'));
      announceCurrentPage();
    } else {
      speak(t('voiceModeDisabled'));
    }
  };

  // Announce current page
  const announceCurrentPage = () => {
    const pageAnnouncements = {
      dashboard: t('currentlyOnDashboard'),
      training: t('currentlyOnTraining'),
      community: t('currentlyOnCommunity'),
      analytics: t('currentlyOnAnalytics'),
      media: t('currentlyOnMedia'),
      chatbot: t('currentlyOnChatbot')
    };
    
    const announcement = pageAnnouncements[currentPage] || t('currentlyOnPage');
    speak(announcement);
  };

  // Handle voice command
  const handleVoiceCommand = () => {
    if (isListening) {
      stopListening();
      return;
    }

    startListening(
      (transcript) => {
        const command = processVoiceCommand(transcript);
        
        // Update voice usage achievement
        updateAchievement('voiceInputsUsed', achievements.voiceInputsUsed + 1);
        
        if (command.action === 'navigate') {
          onNavigate(command.target);
          speak(t('navigatingTo') + ' ' + t(command.target));
        } else {
          // Check for specific navigation commands
          const lang = i18n.language;
          const commands = navigationCommands[lang] || navigationCommands.en;
          
          for (const [page, keywords] of Object.entries(commands)) {
            if (keywords.some(keyword => transcript.toLowerCase().includes(keyword))) {
              onNavigate(page);
              speak(t('navigatingTo') + ' ' + t(page));
              return;
            }
          }
          
          speak(t('commandNotRecognized'));
        }
      },
      (error) => {
        speak(t('voiceError'));
        console.error('Voice command error:', error);
      }
    );
  };

  // Show voice help
  const showHelp = () => {
    setShowVoiceHelp(true);
    const helpText = t('voiceHelpText');
    speak(helpText);
  };

  if (!isSupported && !isSpeechSupported) {
    return null;
  }

  return (
    <>
      {/* Voice Control Panel */}
      <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        voiceMode ? 'scale-110' : 'scale-100'
      }`}>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            {/* Voice Mode Toggle */}
            <button
              onClick={toggleVoiceMode}
              className={`p-3 rounded-full transition-all duration-300 ${
                voiceMode 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={voiceMode ? t('disableVoiceMode') : t('enableVoiceMode')}
            >
              <Headphones className="h-5 w-5" />
            </button>

            {voiceMode && (
              <>
                {/* Voice Command Button */}
                <button
                  onClick={handleVoiceCommand}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  title={isListening ? t('stopListening') : t('startListening')}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>

                {/* Stop Speaking Button */}
                <button
                  onClick={isReading ? stopSpeaking : announceCurrentPage}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isReading
                      ? 'bg-orange-500 text-white'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  title={isReading ? t('stopSpeaking') : t('announceCurrentPage')}
                >
                  {isReading ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>

                {/* Help Button */}
                <button
                  onClick={showHelp}
                  className="p-3 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                  title={t('voiceHelp')}
                >
                  <MessageSquare className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Status Indicator */}
          {voiceMode && (
            <div className="mt-3 text-center">
              <div className={`text-xs font-medium ${
                isListening ? 'text-red-600' : 
                isReading ? 'text-orange-600' : 
                'text-green-600'
              }`}>
                {isListening ? t('listening') : 
                 isReading ? t('speaking') : 
                 t('voiceReady')}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Voice Help Modal */}
      {showVoiceHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('voiceCommands')}
            </h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <strong>{t('navigation')}:</strong>
                <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                  <li>• "{t('dashboard')}" - {t('goToDashboard')}</li>
                  <li>• "{t('training')}" - {t('goToTraining')}</li>
                  <li>• "{t('community')}" - {t('goToCommunity')}</li>
                  <li>• "{t('analytics')}" - {t('goToAnalytics')}</li>
                </ul>
              </div>
              
              <div>
                <strong>{t('general')}:</strong>
                <ul className="ml-4 mt-1 space-y-1 text-gray-600">
                  <li>• "{t('help')}" - {t('getHelp')}</li>
                  <li>• "{t('repeat')}" - {t('repeatLastMessage')}</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowVoiceHelp(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceNavigator;