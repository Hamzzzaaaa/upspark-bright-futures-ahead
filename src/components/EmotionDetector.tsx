
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Smile, Frown, Meh, Zap } from 'lucide-react';

interface EmotionState {
  emotion: 'happy' | 'sad' | 'neutral' | 'excited' | 'frustrated';
  confidence: number;
  timestamp: Date;
}

interface EmotionDetectorProps {
  childName: string;
  onEmotionChange: (emotion: EmotionState) => void;
}

const EmotionDetector = ({ childName, onEmotionChange }: EmotionDetectorProps) => {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionState>({
    emotion: 'neutral',
    confidence: 0.8,
    timestamp: new Date()
  });

  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    // Simulate emotion detection (in real app, this would use camera/ML)
    const detectEmotion = () => {
      setIsDetecting(true);
      setTimeout(() => {
        const emotions: EmotionState['emotion'][] = ['happy', 'sad', 'neutral', 'excited', 'frustrated'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const newEmotion: EmotionState = {
          emotion: randomEmotion,
          confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
          timestamp: new Date()
        };
        
        setCurrentEmotion(newEmotion);
        onEmotionChange(newEmotion);
        setIsDetecting(false);
      }, 2000);
    };

    const interval = setInterval(detectEmotion, 10000); // Check every 10 seconds
    detectEmotion(); // Initial detection

    return () => clearInterval(interval);
  }, [onEmotionChange]);

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy': return <Smile className="w-8 h-8 text-yellow-500" />;
      case 'sad': return <Frown className="w-8 h-8 text-blue-500" />;
      case 'excited': return <Zap className="w-8 h-8 text-orange-500" />;
      case 'frustrated': return <Frown className="w-8 h-8 text-red-500" />;
      default: return <Meh className="w-8 h-8 text-gray-500" />;
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return 'from-yellow-100 to-orange-100';
      case 'sad': return 'from-blue-100 to-indigo-100';
      case 'excited': return 'from-orange-100 to-red-100';
      case 'frustrated': return 'from-red-100 to-pink-100';
      default: return 'from-gray-100 to-slate-100';
    }
  };

  const getActivitySuggestion = (emotion: string) => {
    switch (emotion) {
      case 'happy': return 'Perfect time for challenging activities!';
      case 'sad': return 'Let\'s try some calming, favorite activities.';
      case 'excited': return 'Great energy! Try interactive games.';
      case 'frustrated': return 'Let\'s take a break and try easier tasks.';
      default: return 'Continue with current activities.';
    }
  };

  return (
    <Card className={`border-0 shadow-lg bg-gradient-to-r ${getEmotionColor(currentEmotion.emotion)}`}>
      <CardHeader>
        <CardTitle className="flex items-center text-gray-800">
          <Heart className="w-6 h-6 mr-2" />
          {childName}'s Mood Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isDetecting ? (
          <div className="text-center py-4">
            <div className="animate-pulse rounded-full h-12 w-12 bg-gray-300 mx-auto mb-2"></div>
            <p className="text-gray-600">Detecting mood...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              {getEmotionIcon(currentEmotion.emotion)}
              <div>
                <p className="text-2xl font-bold text-gray-800 capitalize">
                  {currentEmotion.emotion}
                </p>
                <p className="text-sm text-gray-600">
                  {Math.round(currentEmotion.confidence * 100)}% confidence
                </p>
              </div>
            </div>

            <div className="bg-white bg-opacity-70 p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                <strong>Suggestion:</strong> {getActivitySuggestion(currentEmotion.emotion)}
              </p>
            </div>

            <div className="text-xs text-gray-500">
              Last updated: {currentEmotion.timestamp.toLocaleTimeString()}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EmotionDetector;
