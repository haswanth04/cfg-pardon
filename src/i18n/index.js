import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Authentication
      'login': 'Login',
      'logout': 'Logout',
      'email': 'Email',
      'password': 'Password',
      'rememberMe': 'Remember me',
      'forgotPassword': 'Forgot Password?',
      'signIn': 'Sign In',
      'welcome': 'Welcome to CFG-Pradan',
      'empoweringWomen': 'Empowering Rural Women',
      
      // Navigation
      'dashboard': 'Dashboard',
      'training': 'Training',
      'community': 'Community',
      'analytics': 'Analytics',
      'profile': 'Profile',
      'settings': 'Settings',
      
      // Roles
      'admin': 'Admin',
      'fieldOfficer': 'Field Officer',
      'shgWoman': 'SHG Woman',
      
      // Training Module
      'trainingPrograms': 'Training Programs',
      'enrolledPrograms': 'Enrolled Programs',
      'completedPrograms': 'Completed Programs',
      'inProgress': 'In Progress',
      'completed': 'Completed',
      'notStarted': 'Not Started',
      'enroll': 'Enroll',
      'viewDetails': 'View Details',
      'startTraining': 'Start Training',
      
      // Community
      'communityGroups': 'Community Groups',
      'discussions': 'Discussions',
      'events': 'Events',
      'announcements': 'Announcements',
      'joinGroup': 'Join Group',
      'createPost': 'Create Post',
      
      // Analytics
      'impactAnalytics': 'Impact Analytics',
      'villageWiseData': 'Village-wise Data',
      'programStats': 'Program Statistics',
      'participationRate': 'Participation Rate',
      'completionRate': 'Completion Rate',
      
      // Voice Features
      'voiceModeEnabled': 'Voice mode enabled. I will read content aloud.',
      'voiceModeDisabled': 'Voice mode disabled.',
      'currentlyOnDashboard': 'You are currently on the dashboard page.',
      'currentlyOnTraining': 'You are currently on the training page.',
      'currentlyOnCommunity': 'You are currently on the community page.',
      'currentlyOnAnalytics': 'You are currently on the analytics page.',
      'currentlyOnMedia': 'You are currently on the media page.',
      'currentlyOnChatbot': 'You are currently on the chatbot page.',
      'currentlyOnPage': 'You are currently on this page.',
      'navigatingTo': 'Navigating to',
      'commandNotRecognized': 'Command not recognized. Please try again.',
      'voiceError': 'Voice recognition error. Please try again.',
      'voiceHelpText': 'You can say commands like: Go to dashboard, Open training, Show community, or Help.',
      'enableVoiceMode': 'Enable Voice Mode',
      'disableVoiceMode': 'Disable Voice Mode',
      'startListening': 'Start Listening',
      'stopListening': 'Stop Listening',
      'stopSpeaking': 'Stop Speaking',
      'announceCurrentPage': 'Announce Current Page',
      'voiceHelp': 'Voice Help',
      'voiceCommands': 'Voice Commands',
      'listening': 'Listening...',
      'speaking': 'Speaking...',
      'voiceReady': 'Voice Ready',
      
      // Gamification
      'congratulations': 'Congratulations',
      'youEarnedABadge': 'You earned a new badge!',
      'points': 'points',
      'awesome': 'Awesome',
      'yourProgress': 'Your Progress',
      'level': 'Level',
      'pointsToNextLevel': 'Points to next level',
      'totalPoints': 'Total Points',
      'badgesEarned': 'Badges Earned',
      'recentBadges': 'Recent Badges',
      'noBadgesYet': 'No badges earned yet',
      'achievements': 'Achievements',
      'trainingsCompleted': 'Trainings Completed',
      'groupsJoined': 'Groups Joined',
      'mediaUploaded': 'Media Uploaded',
      'voiceInputsUsed': 'Voice Inputs Used',
      
      // WhatsApp Integration
      'whatsappIntegration': 'WhatsApp Integration',
      'stayConnectedViaWhatsApp': 'Stay connected and get updates via WhatsApp',
      'whatsappNotifications': 'WhatsApp Notifications',
      'receiveUpdatesOnWhatsApp': 'Receive training updates and reminders',
      'phoneNumber': 'Phone Number',
      'enableWhatsApp': 'Enable WhatsApp',
      'whatsappEnabled': 'WhatsApp Enabled',
      'registeredNumber': 'Registered number',
      'sendTestMessage': 'Send Test Message',
      'ivrSupport': 'IVR Support',
      'getInfoViaPhoneCall': 'Get information via automated phone calls',
      'ivrFeatures': 'IVR Features',
      'checkTrainingStatus': 'Check training status',
      'getScheduleInfo': 'Get schedule information',
      'speakWithFieldOfficer': 'Speak with field officer',
      'applicationUpdates': 'Application updates',
      'requestCall': 'Request Call',
      'ivrCallDisclaimer': 'You will receive a call within 5 minutes',
      'whatsappCommands': 'WhatsApp Commands',
      'send': 'Send',
      'lastMessage': 'Last Message',
      
      // Map and Heatmap
      'impactHeatmap': 'Impact Heatmap',
      'visualizeImpactAcrossRegions': 'Visualize program impact across regions',
      'selectMetric': 'Select Metric',
      'participation': 'Participation',
      'impactScore': 'Impact Score',
      'incomeIncrease': 'Income Increase',
      'high': 'High',
      'medium': 'Medium',
      'low': 'Low',
      'participants': 'Participants',
      'totalParticipants': 'Total Participants',
      'totalCompleted': 'Total Completed',
      'avgImpactScore': 'Avg Impact Score',
      'avgIncomeIncrease': 'Avg Income Increase',
      'population': 'Population',
      
      // Enhanced Chatbot
      'askAnything': 'Ask me anything about CFG-Pradan...',
      
      // Forms
      'submit': 'Submit',
      'cancel': 'Cancel',
      'save': 'Save',
      'edit': 'Edit',
      'delete': 'Delete',
      'search': 'Search',
      'filter': 'Filter',
      'voiceInput': 'Voice Input',
      'startRecording': 'Start Recording',
      'stopRecording': 'Stop Recording',
      
      // Media
      'uploadMedia': 'Upload Media',
      'uploadImage': 'Upload Image',
      'uploadAudio': 'Upload Audio',
      'addDescription': 'Add Description',
      'addTags': 'Add Tags',
      
      // Chatbot
      'chatbot': 'Chatbot',
      'askQuestion': 'Ask a question...',
      'howCanIHelp': 'How can I help you today?',
      'commonQuestions': 'Common Questions',
      
      // General
      'loading': 'Loading...',
      'error': 'Error',
      'success': 'Success',
      'retry': 'Retry',
      'back': 'Back',
      'next': 'Next',
      'previous': 'Previous',
      'close': 'Close',
      'open': 'Open',
      'language': 'Language',
      'notifications': 'Notifications',
      'help': 'Help',
      'about': 'About'
    }
  },
  hi: {
    translation: {
      // Authentication
      'login': 'लॉगिन',
      'logout': 'लॉगआउट',
      'email': 'ईमेल',
      'password': 'पासवर्ड',
      'rememberMe': 'मुझे याद रखें',
      'forgotPassword': 'पासवर्ड भूल गए?',
      'signIn': 'साइन इन',
      'welcome': 'CFG-प्रदान में आपका स्वागत है',
      'empoweringWomen': 'ग्रामीण महिलाओं को सशक्त बनाना',
      
      // Navigation
      'dashboard': 'डैशबोर्ड',
      'training': 'प्रशिक्षण',
      'community': 'समुदाय',
      'analytics': 'विश्लेषण',
      'profile': 'प्रोफ़ाइल',
      'settings': 'सेटिंग्स',
      
      // Roles
      'admin': 'प्रशासक',
      'fieldOfficer': 'फील्ड ऑफिसर',
      'shgWoman': 'SHG महिला',
      
      // Training Module
      'trainingPrograms': 'प्रशिक्षण कार्यक्रम',
      'enrolledPrograms': 'नामांकित कार्यक्रम',
      'completedPrograms': 'पूर्ण कार्यक्रम',
      'inProgress': 'प्रगति में',
      'completed': 'पूर्ण',
      'notStarted': 'शुरू नहीं किया',
      'enroll': 'नामांकन',
      'viewDetails': 'विवरण देखें',
      'startTraining': 'प्रशिक्षण शुरू करें',
      
      // Community
      'communityGroups': 'सामुदायिक समूह',
      'discussions': 'चर्चा',
      'events': 'घटनाएं',
      'announcements': 'घोषणाएं',
      'joinGroup': 'समूह में शामिल हों',
      'createPost': 'पोस्ट बनाएं',
      
      // Analytics
      'impactAnalytics': 'प्रभाव विश्लेषण',
      'villageWiseData': 'गांव-वार डेटा',
      'programStats': 'कार्यक्रम आंकड़े',
      'participationRate': 'भागीदारी दर',
      'completionRate': 'पूर्णता दर',
      
      // Voice Features
      'voiceModeEnabled': 'आवाज़ मोड सक्षम। मैं सामग्री को जोर से पढ़ूंगा।',
      'voiceModeDisabled': 'आवाज़ मोड अक्षम।',
      'currentlyOnDashboard': 'आप वर्तमान में डैशबोर्ड पेज पर हैं।',
      'currentlyOnTraining': 'आप वर्तमान में प्रशिक्षण पेज पर हैं।',
      'currentlyOnCommunity': 'आप वर्तमान में समुदाय पेज पर हैं।',
      'currentlyOnAnalytics': 'आप वर्तमान में विश्लेषण पेज पर हैं।',
      'currentlyOnMedia': 'आप वर्तमान में मीडिया पेज पर हैं।',
      'currentlyOnChatbot': 'आप वर्तमान में चैटबॉट पेज पर हैं।',
      'currentlyOnPage': 'आप वर्तमान में इस पेज पर हैं।',
      'navigatingTo': 'नेविगेट कर रहे हैं',
      'commandNotRecognized': 'कमांड पहचानी नहीं गई। कृपया पुनः प्रयास करें।',
      'voiceError': 'आवाज़ पहचान त्रुटि। कृपया पुनः प्रयास करें।',
      'voiceHelpText': 'आप कमांड कह सकते हैं जैसे: डैशबोर्ड पर जाएं, प्रशिक्षण खोलें, समुदाय दिखाएं, या सहायता।',
      'enableVoiceMode': 'आवाज़ मोड सक्षम करें',
      'disableVoiceMode': 'आवाज़ मोड अक्षम करें',
      'startListening': 'सुनना शुरू करें',
      'stopListening': 'सुनना बंद करें',
      'stopSpeaking': 'बोलना बंद करें',
      'announceCurrentPage': 'वर्तमान पेज की घोषणा करें',
      'voiceHelp': 'आवाज़ सहायता',
      'voiceCommands': 'आवाज़ कमांड',
      'listening': 'सुन रहे हैं...',
      'speaking': 'बोल रहे हैं...',
      'voiceReady': 'आवाज़ तैयार',
      
      // Gamification
      'congratulations': 'बधाई हो',
      'youEarnedABadge': 'आपने एक नया बैज अर्जित किया!',
      'points': 'अंक',
      'awesome': 'शानदार',
      'yourProgress': 'आपकी प्रगति',
      'level': 'स्तर',
      'pointsToNextLevel': 'अगले स्तर के लिए अंक',
      'totalPoints': 'कुल अंक',
      'badgesEarned': 'अर्जित बैज',
      'recentBadges': 'हाल के बैज',
      'noBadgesYet': 'अभी तक कोई बैज नहीं मिला',
      'achievements': 'उपलब्धियां',
      'trainingsCompleted': 'पूर्ण प्रशिक्षण',
      'groupsJoined': 'शामिल समूह',
      'mediaUploaded': 'अपलोड मीडिया',
      'voiceInputsUsed': 'आवाज़ इनपुट उपयोग',
      
      // WhatsApp Integration
      'whatsappIntegration': 'व्हाट्सऐप एकीकरण',
      'stayConnectedViaWhatsApp': 'व्हाट्सऐप के माध्यम से जुड़े रहें और अपडेट प्राप्त करें',
      'whatsappNotifications': 'व्हाट्सऐप सूचनाएं',
      'receiveUpdatesOnWhatsApp': 'प्रशिक्षण अपडेट और रिमाइंडर प्राप्त करें',
      'phoneNumber': 'फोन नंबर',
      'enableWhatsApp': 'व्हाट्सऐप सक्षम करें',
      'whatsappEnabled': 'व्हाट्सऐप सक्षम',
      'registeredNumber': 'पंजीकृत नंबर',
      'sendTestMessage': 'टेस्ट संदेश भेजें',
      'ivrSupport': 'IVR सहायता',
      'getInfoViaPhoneCall': 'स्वचालित फोन कॉल के माध्यम से जानकारी प्राप्त करें',
      'ivrFeatures': 'IVR सुविधाएं',
      'checkTrainingStatus': 'प्रशिक्षण स्थिति जांचें',
      'getScheduleInfo': 'शेड्यूल जानकारी प्राप्त करें',
      'speakWithFieldOfficer': 'फील्ड ऑफिसर से बात करें',
      'applicationUpdates': 'आवेदन अपडेट',
      'requestCall': 'कॉल का अनुरोध करें',
      'ivrCallDisclaimer': 'आपको 5 मिनट के भीतर कॉल आएगी',
      'whatsappCommands': 'व्हाट्सऐप कमांड',
      'send': 'भेजें',
      'lastMessage': 'अंतिम संदेश',
      
      // Map and Heatmap
      'impactHeatmap': 'प्रभाव हीटमैप',
      'visualizeImpactAcrossRegions': 'क्षेत्रों में कार्यक्रम प्रभाव का दृश्य',
      'selectMetric': 'मेट्रिक चुनें',
      'participation': 'भागीदारी',
      'impactScore': 'प्रभाव स्कोर',
      'incomeIncrease': 'आय वृद्धि',
      'high': 'उच्च',
      'medium': 'मध्यम',
      'low': 'कम',
      'participants': 'प्रतिभागी',
      'totalParticipants': 'कुल प्रतिभागी',
      'totalCompleted': 'कुल पूर्ण',
      'avgImpactScore': 'औसत प्रभाव स्कोर',
      'avgIncomeIncrease': 'औसत आय वृद्धि',
      'population': 'जनसंख्या',
      
      // Enhanced Chatbot
      'askAnything': 'CFG-प्रदान के बारे में कुछ भी पूछें...',
      
      // Forms
      'submit': 'जमा करें',
      'cancel': 'रद्द करें',
      'save': 'सहेजें',
      'edit': 'संपादित करें',
      'delete': 'हटाएं',
      'search': 'खोजें',
      'filter': 'फिल्टर',
      'voiceInput': 'आवाज़ इनपुट',
      'startRecording': 'रिकॉर्डिंग शुरू करें',
      'stopRecording': 'रिकॉर्डिंग बंद करें',
      
      // Media
      'uploadMedia': 'मीडिया अपलोड करें',
      'uploadImage': 'छवि अपलोड करें',
      'uploadAudio': 'ऑडियो अपलोड करें',
      'addDescription': 'विवरण जोड़ें',
      'addTags': 'टैग जोड़ें',
      
      // Chatbot
      'chatbot': 'चैटबॉट',
      'askQuestion': 'प्रश्न पूछें...',
      'howCanIHelp': 'आज मैं आपकी कैसे मदद कर सकता हूं?',
      'commonQuestions': 'सामान्य प्रश्न',
      
      // General
      'loading': 'लोड हो रहा है...',
      'error': 'त्रुटि',
      'success': 'सफलता',
      'retry': 'पुनः प्रयास',
      'back': 'वापस',
      'next': 'अगला',
      'previous': 'पिछला',
      'close': 'बंद करें',
      'open': 'खोलें',
      'language': 'भाषा',
      'notifications': 'सूचनाएं',
      'help': 'सहायता',
      'about': 'के बारे में'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;