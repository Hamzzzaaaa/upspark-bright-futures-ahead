import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Smile, Frown, Meh, Zap, Camera } from 'lucide-react';

interface MoodState {
  mood: 'happy' | 'sad' | 'neutral' | 'excited' | 'frustrated' | 'calm';
  confidence: number;
  timestamp: Date;
  energyLevel: number;
  focusLevel: number;
}

interface MoodDetectorProps {
  childName: string;
  onMoodChange: (mood: MoodState) => void;
  isActive: boolean;
}

const MoodDetector = ({ childName, onMoodChange, isActive }: MoodDetectorProps) => {
  const [currentMood, setCurrentMood] = useState<MoodState>({
    mood: 'neutral',
    confidence: 0.8,
    timestamp: new Date(),
    energyLevel: 50,
    focusLevel: 70
  });

  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionHistory, setDetectionHistory] = useState<MoodState[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const detectMood = () => {
      setIsDetecting(true);
      setTimeout(() => {
        const moods: MoodState['mood'][] = ['happy', 'sad', 'neutral', 'excited', 'frustrated', 'calm'];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        
        const newMood: MoodState = {
          mood: randomMood,
          confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
          timestamp: new Date(),
          energyLevel: Math.floor(Math.random() * 100),
          focusLevel: Math.floor(Math.random() * 100)
        };
        
        setCurrentMood(newMood);
        onMoodChange(newMood);
        
        // Keep history of last 5 detections
        setDetectionHistory(prev => [newMood, ...prev.slice(0, 4)]);
        setIsDetecting(false);
      }, 3000);
    };

    const interval = setInterval(detectMood, 12000); // Check every 12 seconds
    detectMood(); // Initial detection

    return () => clearInterval(interval);
  }, [onMoodChange, isActive]);

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-8 h-8 text-yellow-500" />;
      case 'sad': return <Frown className="w-8 h-8 text-blue-500" />;
      case 'excited': return <Zap className="w-8 h-8 text-orange-500" />;
      case 'frustrated': return <Frown className="w-8 h-8 text-red-500" />;
      case 'calm': return <Heart className="w-8 h-8 text-green-500" />;
      default: return <Meh className="w-8 h-8 text-gray-500" />;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'from-yellow-100 to-orange-100';
      case 'sad': return 'from-blue-100 to-indigo-100';
      case 'excited': return 'from-orange-100 to-red-100';
      case 'frustrated': return 'from-red-100 to-pink-100';
      case 'calm': return 'from-green-100 to-teal-100';
      default: return 'from-gray-100 to-slate-100';
    }
  };

  const getRecommendation = (mood: string, energyLevel: number, focusLevel: number) => {
    if (mood === 'happy' && energyLevel > 70) return 'Perfect time for challenging activities!';
    if (mood === 'sad') return 'Let\'s try some calming, favorite activities.';
    if (mood === 'excited' && focusLevel < 50) return 'High energy! Try physical activities first.';
    if (mood === 'frustrated') return 'Take a break with some sensory activities.';
    if (mood === 'calm' && focusLevel > 70) return 'Great focus time for learning activities.';
    return 'Continue with current activities at a comfortable pace.';
  };

  if (!isActive) {
    return (
      <Card className="border-0 shadow-lg bg-gray-100">
        <CardContent className="p-4 text-center">
          <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Mood detection is paused</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-0 shadow-lg bg-gradient-to-r ${getMoodColor(currentMood.mood)}`}>
      <CardHeader>
        <CardTitle className="flex items-center text-gray-800">
          <Heart className="w-6 h-6 mr-2" />
          Mood Detector - {childName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isDetecting ? (
          <div className="text-center py-4">
            <div className="animate-pulse rounded-full h-12 w-12 bg-gray-300 mx-auto mb-2"></div>
            <p className="text-gray-600">Analyzing mood...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              {getMoodIcon(currentMood.mood)}
              <div>
                <p className="text-2xl font-bold text-gray-800 capitalize">
                  {currentMood.mood}
                </p>
                <p className="text-sm text-gray-600">
                  {Math.round(currentMood.confidence * 100)}% confidence
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white bg-opacity-50 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-600">Energy</p>
                <p className="text-lg font-bold text-gray-800">{currentMood.energyLevel}%</p>
              </div>
              <div className="bg-white bg-opacity-50 p-2 rounded-lg text-center">
                <p className="text-xs text-gray-600">Focus</p>
                <p className="text-lg font-bold text-gray-800">{currentMood.focusLevel}%</p>
              </div>
            </div>

            <div className="bg-white bg-opacity-70 p-3 rounded-lg">
              <p className="text-sm text-gray-800">
                <strong>Recommendation:</strong> {getRecommendation(currentMood.mood, currentMood.energyLevel, currentMood.focusLevel)}
              </p>
            </div>

            {detectionHistory.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">Recent Moods</p>
                <div className="flex space-x-2">
                  {detectionHistory.map((mood, index) => (
                    <div key={index} className="text-center">
                      <div className="w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center">
                        {getMoodIcon(mood.mood)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500">
              Last updated: {currentMood.timestamp.toLocaleTimeString()}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodDetector;
