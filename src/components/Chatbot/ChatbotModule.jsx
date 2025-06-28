import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User,
  Mic,
  MicOff,
  HelpCircle,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';

const ChatbotModule = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const commonQuestions = [
    {
      question: 'How do I enroll in a training program?',
      answer: 'To enroll in a training program, go to the Training section, browse available programs, and click "Enroll" on the program you\'re interested in.'
    },
    {
      question: 'How can I check my training progress?',
      answer: 'You can view your training progress in the Training section under "In Progress" tab. Each program shows your completion percentage.'
    },
    {
      question: 'How do I join a community group?',
      answer: 'Visit the Community section, browse available groups, and click "Join Group" on any group that interests you.'
    },
    {
      question: 'How can I upload media files?',
      answer: 'Go to the Media section and click "Upload Media". You can upload images, audio, and video files with descriptions and tags.'
    },
    {
      question: 'How do I use voice input in forms?',
      answer: 'Look for the microphone icon in form fields. Click it to start voice recording, speak clearly, and click again to stop.'
    },
    {
      question: 'What should I do if I\'m offline?',
      answer: 'The app works offline! Your data will be saved locally and synced when you\'re back online. Look for the sync icon in the header.'
    },
    {
      question: 'How can I change the language?',
      answer: 'Click the globe icon in the header to switch between English and Hindi.'
    },
    {
      question: 'Who can I contact for support?',
      answer: 'You can contact your field officer or reach out to the CFG-Pradan support team through the contact information in your profile.'
    }
  ];

  useEffect(() => {
    // Initial greeting message
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: t('howCanIHelp'),
          timestamp: new Date()
        }
      ]);
    }
  }, [t, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Check for common questions
    for (const qa of commonQuestions) {
      if (input.includes(qa.question.toLowerCase().split(' ').slice(0, 3).join(' '))) {
        return qa.answer;
      }
    }

    // Keyword-based responses
    if (input.includes('training') || input.includes('course') || input.includes('program')) {
      return 'I can help you with training programs! You can find all available courses in the Training section. Would you like me to guide you through the enrollment process?';
    }
    
    if (input.includes('community') || input.includes('group') || input.includes('discussion')) {
      return 'The Community section is great for connecting with other women! You can join groups, participate in discussions, and attend events. What specific community feature interests you?';
    }
    
    if (input.includes('upload') || input.includes('media') || input.includes('photo') || input.includes('image')) {
      return 'You can upload photos, videos, and audio files in the Media section. Don\'t forget to add descriptions and tags to make them easy to find later!';
    }
    
    if (input.includes('voice') || input.includes('speak') || input.includes('microphone')) {
      return 'Voice input is available in most forms! Look for the microphone icon and click it to start recording. Make sure to speak clearly for best results.';
    }
    
    if (input.includes('offline') || input.includes('internet') || input.includes('connection')) {
      return 'Don\'t worry about internet connectivity! The app works offline and will sync your data when you\'re back online. You\'ll see a sync icon when there\'s data to upload.';
    }
    
    if (input.includes('language') || input.includes('hindi') || input.includes('english')) {
      return 'You can switch between English and Hindi anytime by clicking the globe icon in the header. All content will be translated automatically!';
    }
    
    if (input.includes('help') || input.includes('support') || input.includes('problem')) {
      return 'I\'m here to help! You can ask me about any feature of the platform. For technical issues, you can also contact your field officer or the support team.';
    }

    if (input.includes('hello') || input.includes('hi') || input.includes('namaste')) {
      return `Hello ${user?.name}! I'm here to help you navigate the CFG-Pradan platform. What would you like to know about?`;
    }

    // Default response
    return 'I understand you\'re asking about something specific. Could you please rephrase your question? I can help with training programs, community features, media uploads, voice input, offline functionality, and general platform navigation.';
  };

  const handleQuestionClick = (question) => {
    setInputMessage(question);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center space-x-2">
              <Bot className="h-8 w-8" />
              <span>{t('chatbot')}</span>
            </h1>
            <p className="text-teal-100">
              Get instant help and answers to your questions
            </p>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <Minimize2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">CFG-Pradan Assistant</h3>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                        : 'bg-gradient-to-r from-teal-500 to-blue-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="h-8 w-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={t('askQuestion')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Common Questions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <HelpCircle className="h-5 w-5 text-teal-600" />
              <span>{t('commonQuestions')}</span>
            </h3>
            <div className="space-y-2">
              {commonQuestions.slice(0, 6).map((qa, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(qa.question)}
                  className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {qa.question}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleQuestionClick('How do I enroll in a training program?')}
                className="w-full p-3 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium"
              >
                Training Help
              </button>
              <button
                onClick={() => handleQuestionClick('How do I join a community group?')}
                className="w-full p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                Community Help
              </button>
              <button
                onClick={() => handleQuestionClick('How can I upload media files?')}
                className="w-full p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
              >
                Media Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModule;