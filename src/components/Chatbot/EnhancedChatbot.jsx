import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useVoice } from '../../contexts/VoiceContext';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Brain,
  FileText,
  Lightbulb
} from 'lucide-react';

const EnhancedChatbot = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { speak, startListening, stopListening, isListening, isReading, stopSpeaking } = useVoice();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const messagesEndRef = useRef(null);

  // Enhanced knowledge base with CFG-Pradan specific information
  const knowledgeBase = {
    programs: {
      'financial literacy': {
        description: 'Learn basic financial concepts, budgeting, savings, and investment strategies',
        duration: '4 hours',
        eligibility: 'All SHG women',
        benefits: 'Better money management, increased savings, financial independence'
      },
      'digital banking': {
        description: 'Master mobile banking, UPI payments, and online transactions',
        duration: '3 hours',
        eligibility: 'Basic smartphone knowledge required',
        benefits: 'Cashless transactions, easy money transfers, digital payments'
      },
      'entrepreneurship': {
        description: 'Start your own business with confidence and knowledge',
        duration: '5 hours',
        eligibility: 'Completed financial literacy',
        benefits: 'Business skills, income generation, economic independence'
      },
      'sustainable farming': {
        description: 'Learn eco-friendly farming methods and crop rotation',
        duration: '6 hours',
        eligibility: 'Farmers and agricultural workers',
        benefits: 'Better crop yield, reduced costs, environmental protection'
      }
    },
    
    procedures: {
      'apply for training': 'Go to Training section → Browse programs → Click Enroll → Fill application form → Submit',
      'check application status': 'Dashboard → My Applications → View status and updates',
      'join community group': 'Community section → Browse groups → Click Join Group → Confirm membership',
      'upload media': 'Media section → Upload button → Select files → Add description → Submit',
      'use voice input': 'Look for microphone icon → Click to start → Speak clearly → Click again to stop'
    },
    
    support: {
      'field officer contact': 'Your field officer: Priya Sharma, Phone: +91-9876543211',
      'technical support': 'For technical issues, contact: support@cfg-pradan.org',
      'emergency contact': 'Emergency helpline: 1800-123-4567 (24/7 available)'
    }
  };

  useEffect(() => {
    // Initial greeting
    if (messages.length === 0) {
      const greeting = {
        id: 1,
        type: 'bot',
        content: `Namaste ${user?.name}! I'm your CFG-Pradan AI assistant. I can help you with training programs, applications, and answer questions about our platform. How can I assist you today?`,
        timestamp: new Date(),
        suggestions: [
          'How do I apply for financial literacy training?',
          'What programs are available for me?',
          'How to check my application status?',
          'Tell me about digital banking course'
        ]
      };
      setMessages([greeting]);
      
      if (voiceMode) {
        speak(greeting.content);
      }
    }
  }, [user, voiceMode, speak, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Enhanced AI response generation with RAG-like functionality
  const generateEnhancedResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Check for program-specific queries
    for (const [program, details] of Object.entries(knowledgeBase.programs)) {
      if (input.includes(program)) {
        return {
          content: `Here's information about ${program}:\n\n📚 **Description**: ${details.description}\n⏱️ **Duration**: ${details.duration}\n✅ **Eligibility**: ${details.eligibility}\n🎯 **Benefits**: ${details.benefits}\n\nWould you like to know how to apply for this program?`,
          suggestions: [
            'How to apply for this program?',
            'What are the requirements?',
            'When is the next batch?',
            'Show me other programs'
          ]
        };
      }
    }
    
    // Check for procedure queries
    for (const [procedure, steps] of Object.entries(knowledgeBase.procedures)) {
      if (input.includes(procedure.split(' ').slice(0, 2).join(' '))) {
        return {
          content: `Here's how to ${procedure}:\n\n${steps}\n\nNeed help with any specific step?`,
          suggestions: [
            'I need more help with this',
            'What documents do I need?',
            'How long does it take?',
            'Show me something else'
          ]
        };
      }
    }
    
    // Support and contact queries
    if (input.includes('contact') || input.includes('help') || input.includes('support')) {
      return {
        content: `Here are your support options:\n\n👩‍💼 **Field Officer**: ${knowledgeBase.support['field officer contact']}\n💻 **Technical Support**: ${knowledgeBase.support['technical support']}\n🚨 **Emergency**: ${knowledgeBase.support['emergency contact']}\n\nWhat type of help do you need?`,
        suggestions: [
          'Technical problem',
          'Training question',
          'Application issue',
          'General inquiry'
        ]
      };
    }
    
    // Income and impact queries
    if (input.includes('income') || input.includes('earning') || input.includes('money')) {
      return {
        content: `Our programs have helped women increase their income significantly! 💰\n\n📈 **Average income increase**: 45%\n🏆 **Success stories**: 89% of participants report improved financial status\n💼 **New businesses started**: 156 women have started their own ventures\n\nWould you like to know about specific income-generating programs?`,
        suggestions: [
          'Tell me about entrepreneurship training',
          'How to start a business?',
          'Success stories',
          'Financial literacy program'
        ]
      };
    }
    
    // Voice and accessibility queries
    if (input.includes('voice') || input.includes('speak') || input.includes('audio')) {
      return {
        content: `Voice features make our platform accessible to everyone! 🎤\n\n🗣️ **Voice Input**: Use microphone icon in forms\n🔊 **Read Aloud**: Get content read to you\n🌐 **Language Support**: Available in Hindi and English\n📱 **Mobile Friendly**: Works great on smartphones\n\nWould you like me to enable voice mode for our conversation?`,
        suggestions: [
          'Enable voice mode',
          'How to use voice input?',
          'Change language to Hindi',
          'Accessibility features'
        ]
      };
    }
    
    // Default intelligent response
    const responses = [
      `I understand you're asking about "${userInput}". Let me help you with that! Our platform offers comprehensive support for rural women's empowerment. Could you be more specific about what you'd like to know?`,
      `That's a great question about "${userInput}"! I can provide information about training programs, application procedures, community features, or technical support. What would be most helpful?`,
      `I'm here to help with "${userInput}". Our CFG-Pradan platform has many features designed for women like you. Would you like me to explain any specific area?`
    ];
    
    return {
      content: responses[Math.floor(Math.random() * responses.length)],
      suggestions: [
        'Show me training programs',
        'How to join community groups?',
        'Check my progress',
        'Contact field officer'
      ]
    };
  };

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate processing time
    setTimeout(() => {
      const response = generateEnhancedResponse(messageText);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.content,
        suggestions: response.suggestions,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Read response aloud if voice mode is enabled
      if (voiceMode) {
        speak(response.content);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(
        (transcript) => {
          setInputMessage(transcript);
          handleSendMessage(transcript);
        },
        (error) => {
          console.error('Voice input error:', error);
        }
      );
    }
  };

  const toggleVoiceMode = () => {
    const newMode = !voiceMode;
    setVoiceMode(newMode);
    
    if (newMode) {
      speak('Voice mode enabled. I will read my responses aloud.');
    } else {
      stopSpeaking();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <Brain className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">AI Assistant</h1>
              <p className="text-purple-100">
                Powered by advanced AI with CFG-Pradan knowledge
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleVoiceMode}
              className={`p-3 rounded-full transition-colors ${
                voiceMode ? 'bg-white text-purple-600' : 'bg-white bg-opacity-20 text-white'
              }`}
              title={voiceMode ? 'Disable voice mode' : 'Enable voice mode'}
            >
              {voiceMode ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">CFG-Pradan AI Assistant</h3>
              <p className="text-sm text-green-600 flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Online & Ready</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <FileText className="h-3 w-3" />
              <span>Knowledge Base</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Lightbulb className="h-3 w-3" />
              <span>Smart Suggestions</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600'
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
                    <div className="text-sm whitespace-pre-line">{message.content}</div>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Suggestions */}
              {message.suggestions && message.type === 'bot' && (
                <div className="mt-2 ml-10 flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
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
              placeholder={t('askAnything')}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            
            <button
              onClick={handleVoiceInput}
              className={`p-2 rounded-lg transition-colors ${
                isListening
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedChatbot;