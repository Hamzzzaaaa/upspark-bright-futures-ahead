
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface VoiceControllerProps {
  onVoiceCommand: (command: string) => void;
  isEnabled: boolean;
}

const VoiceController = ({ onVoiceCommand, isEnabled }: VoiceControllerProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');

        setTranscript(transcript);
        
        // Process voice commands
        if (transcript.toLowerCase().includes('play')) {
          onVoiceCommand('play');
        } else if (transcript.toLowerCase().includes('stop')) {
          onVoiceCommand('stop');
        } else if (transcript.toLowerCase().includes('next')) {
          onVoiceCommand('next');
        } else if (transcript.toLowerCase().includes('home')) {
          onVoiceCommand('home');
        }
      };

      recognition.onerror = (event: any) => {
        console.log('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, [onVoiceCommand]);

  const startListening = () => {
    if (recognition && isEnabled) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isEnabled) {
    return null;
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-green-100 to-teal-100">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-full transition-all duration-200 ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isListening ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>
            
            <div>
              <p className="font-medium text-gray-800">
                {isListening ? 'Listening...' : 'Voice Control'}
              </p>
              <p className="text-sm text-gray-600">
                Say "play", "stop", "next", or "home"
              </p>
            </div>
          </div>

          <button
            onClick={() => speak('Hello! I can help you navigate with your voice.')}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {transcript && (
          <div className="mt-3 p-2 bg-white rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>You said:</strong> {transcript}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceController;
