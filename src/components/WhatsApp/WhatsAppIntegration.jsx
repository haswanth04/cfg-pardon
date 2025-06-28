import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { MessageCircle, Phone, Send, CheckCircle } from 'lucide-react';

const WhatsAppIntegration = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [lastMessage, setLastMessage] = useState('');

  // Mock WhatsApp API integration
  const registerWhatsApp = async () => {
    // In real implementation, this would call Twilio/Gupshup API
    if (phoneNumber.length >= 10) {
      setIsRegistered(true);
      setLastMessage('WhatsApp notifications enabled successfully!');
      
      // Save to user preferences
      localStorage.setItem(`whatsapp_${user.id}`, phoneNumber);
    }
  };

  // Mock message sending
  const sendTestMessage = async () => {
    // In real implementation, this would send via WhatsApp API
    const message = `Hello ${user.name}! Your training progress: 3 courses completed. Next session: Financial Literacy on Monday 10 AM. Reply STOP to unsubscribe.`;
    
    setLastMessage(message);
    
    // Simulate API call
    setTimeout(() => {
      alert('Test message sent to WhatsApp!');
    }, 1000);
  };

  // Mock IVR call
  const makeIVRCall = async () => {
    // In real implementation, this would trigger Twilio Voice API
    const callScript = `
      Hello ${user.name}, this is CFG Pradan.
      Your current training status:
      - 3 courses completed
      - 2 courses in progress
      - Next session: Monday 10 AM
      
      Press 1 for training schedule
      Press 2 for application status
      Press 3 to speak with field officer
    `;
    
    alert('IVR call initiated! You would receive a call with the following message:\n\n' + callScript);
  };

  // Sample WhatsApp commands and responses
  const whatsappCommands = [
    {
      command: 'STATUS',
      response: 'Your training status: 3 completed, 2 in progress. Next: Financial Literacy on Monday 10 AM.'
    },
    {
      command: 'SCHEDULE',
      response: 'Upcoming sessions:\n• Mon 10 AM - Financial Literacy\n• Wed 2 PM - Digital Banking\n• Fri 11 AM - Community Meeting'
    },
    {
      command: 'HELP',
      response: 'Available commands:\nSTATUS - Check training progress\nSCHEDULE - View upcoming sessions\nAPPLY - Apply for new programs\nCONTACT - Get field officer details'
    },
    {
      command: 'APPLY',
      response: 'Available programs:\n1. Entrepreneurship Training\n2. Health & Nutrition\n3. Leadership Development\n\nReply with program number to apply.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{t('whatsappIntegration')}</h1>
        <p className="text-green-100">
          {t('stayConnectedViaWhatsApp')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WhatsApp Setup */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-green-100 rounded-full">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('whatsappNotifications')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('receiveUpdatesOnWhatsApp')}
              </p>
            </div>
          </div>

          {!isRegistered ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('phoneNumber')}
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={registerWhatsApp}
                disabled={phoneNumber.length < 10}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{t('enableWhatsApp')}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">{t('whatsappEnabled')}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                {t('registeredNumber')}: {phoneNumber}
              </div>

              <button
                onClick={sendTestMessage}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{t('sendTestMessage')}</span>
              </button>
            </div>
          )}
        </div>

        {/* IVR Integration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {t('ivrSupport')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('getInfoViaPhoneCall')}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                {t('ivrFeatures')}
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• {t('checkTrainingStatus')}</li>
                <li>• {t('getScheduleInfo')}</li>
                <li>• {t('speakWithFieldOfficer')}</li>
                <li>• {t('applicationUpdates')}</li>
              </ul>
            </div>

            <button
              onClick={makeIVRCall}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>{t('requestCall')}</span>
            </button>

            <div className="text-xs text-gray-500 text-center">
              {t('ivrCallDisclaimer')}
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Commands Reference */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('whatsappCommands')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatsappCommands.map((cmd, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">
                {t('send')}: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{cmd.command}</code>
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                {cmd.response}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      {lastMessage && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('lastMessage')}
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm text-green-800">
              {lastMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppIntegration;