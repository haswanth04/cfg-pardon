import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const VoiceContext = createContext();

export const useVoice = () => {
  const context = useContext(VoiceContext);
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
};

export const VoiceProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  const isSpeechSupported = 'speechSynthesis' in window;

  // Initialize speech synthesis
  const initSpeech = useCallback(() => {
    if (isSpeechSupported && !synthRef.current) {
      synthRef.current = window.speechSynthesis;
    }
  }, [isSpeechSupported]);

  // Text-to-speech function
  const speak = useCallback((text, options = {}) => {
    if (!isSpeechSupported) return;
    
    initSpeech();
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = i18n.language === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    
    if (options.onEnd) {
      utterance.onend = () => {
        setIsReading(false);
        options.onEnd();
      };
    }
    
    synthRef.current.speak(utterance);
  }, [i18n.language, isSpeechSupported, initSpeech]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsReading(false);
    }
  }, []);

  // Speech recognition function
  const startListening = useCallback((onResult, onError) => {
    if (!isSupported) {
      onError?.('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = i18n.language === 'hi' ? 'hi-IN' : 'en-US';

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult?.(transcript);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      onError?.(event.error);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  }, [isSupported, i18n.language]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  // Voice navigation commands
  const processVoiceCommand = useCallback((command, context = {}) => {
    const lowerCommand = command.toLowerCase();
    
    // Navigation commands
    if (lowerCommand.includes('dashboard') || lowerCommand.includes('डैशबोर्ड')) {
      return { action: 'navigate', target: 'dashboard' };
    }
    if (lowerCommand.includes('training') || lowerCommand.includes('प्रशिक्षण')) {
      return { action: 'navigate', target: 'training' };
    }
    if (lowerCommand.includes('community') || lowerCommand.includes('समुदाय')) {
      return { action: 'navigate', target: 'community' };
    }
    
    // Form commands
    if (lowerCommand.includes('yes') || lowerCommand.includes('हाँ') || lowerCommand.includes('submit')) {
      return { action: 'confirm' };
    }
    if (lowerCommand.includes('no') || lowerCommand.includes('नहीं') || lowerCommand.includes('cancel')) {
      return { action: 'cancel' };
    }
    
    // Content input
    return { action: 'input', content: command };
  }, []);

  // Voice-guided form filling
  const voiceFormFill = useCallback((fields, onComplete) => {
    let currentFieldIndex = 0;
    const formData = {};

    const processNextField = () => {
      if (currentFieldIndex >= fields.length) {
        onComplete(formData);
        return;
      }

      const field = fields[currentFieldIndex];
      speak(field.prompt, {
        onEnd: () => {
          startListening(
            (result) => {
              formData[field.name] = result;
              speak(`You said: ${result}. Is this correct?`, {
                onEnd: () => {
                  startListening(
                    (confirmation) => {
                      const command = processVoiceCommand(confirmation);
                      if (command.action === 'confirm') {
                        currentFieldIndex++;
                        processNextField();
                      } else {
                        speak('Please repeat your answer.');
                        setTimeout(processNextField, 1000);
                      }
                    },
                    (error) => console.error('Confirmation error:', error)
                  );
                }
              });
            },
            (error) => console.error('Field input error:', error)
          );
        }
      });
    };

    processNextField();
  }, [speak, startListening, processVoiceCommand]);

  const value = {
    isListening,
    isReading,
    voiceMode,
    setVoiceMode,
    speak,
    stopSpeaking,
    startListening,
    stopListening,
    processVoiceCommand,
    voiceFormFill,
    isSupported,
    isSpeechSupported
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
};