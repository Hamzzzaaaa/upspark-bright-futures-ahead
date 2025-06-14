
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation, MapPin, Clock, TrendingUp } from 'lucide-react';

interface NavigationPattern {
  mostUsedSections: string[];
  averageSessionTime: number;
  preferredNavigationTime: string;
  frequentPaths: string[];
  navigationEfficiency: number;
}

interface AINavigatorProps {
  currentSection: string;
  onNavigationSuggestion: (suggestion: string) => void;
  childName: string;
}

const AINavigator = ({ currentSection, onNavigationSuggestion, childName }: AINavigatorProps) => {
  const [navigationPattern, setNavigationPattern] = useState<NavigationPattern>({
    mostUsedSections: ['activities', 'story', 'progress'],
    averageSessionTime: 25,
    preferredNavigationTime: 'Morning (10-11 AM)',
    frequentPaths: ['dashboard → activities', 'activities → story', 'story → progress'],
    navigationEfficiency: 85
  });

  const [isLearning, setIsLearning] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    // Simulate AI learning navigation patterns
    const learnNavigationPattern = () => {
      setIsLearning(true);
      setTimeout(() => {
        // Generate intelligent navigation suggestions based on current context
        const suggestions = [
          'Based on usage patterns, try Activities next',
          'Perfect time for Story Therapy session',
          'Consider checking Progress - you haven\'t visited in a while',
          'AI Insights might help optimize today\'s session'
        ];
        
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        setSuggestion(randomSuggestion);
        
        // Update navigation efficiency
        setNavigationPattern(prev => ({
          ...prev,
          navigationEfficiency: Math.min(100, prev.navigationEfficiency + Math.random() * 5)
        }));
        
        setIsLearning(false);
      }, 2000);
    };

    const interval = setInterval(learnNavigationPattern, 15000); // Learn every 15 seconds
    learnNavigationPattern(); // Initial learning

    return () => clearInterval(interval);
  }, [currentSection]);

  const handleSuggestionClick = () => {
    if (suggestion.includes('Activities')) {
      onNavigationSuggestion('activities');
    } else if (suggestion.includes('Story')) {
      onNavigationSuggestion('story');
    } else if (suggestion.includes('Progress')) {
      onNavigationSuggestion('progress');
    } else if (suggestion.includes('AI Insights')) {
      onNavigationSuggestion('ai-insights');
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-cyan-100 to-blue-100">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-800">
          <Navigation className="w-6 h-6 mr-2" />
          AI Navigator for {childName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLearning ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-blue-600">Learning navigation patterns...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-800">Current Section</p>
                <p className="text-sm text-gray-600 capitalize">{currentSection}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-800">Navigation Efficiency</p>
                <p className="text-sm text-gray-600">{Math.round(navigationPattern.navigationEfficiency)}%</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-gray-800">Average Session</p>
                <p className="text-sm text-gray-600">{navigationPattern.averageSessionTime} minutes</p>
              </div>
            </div>

            {suggestion && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>AI Suggestion:</strong> {suggestion}
                </p>
                <button
                  onClick={handleSuggestionClick}
                  className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Go There
                </button>
              </div>
            )}

            <div>
              <p className="font-medium text-gray-800 mb-2">Frequent Paths</p>
              <div className="space-y-1">
                {navigationPattern.frequentPaths.map((path, index) => (
                  <span key={index} className="block text-xs bg-cyan-200 text-cyan-800 px-2 py-1 rounded">
                    {path}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AINavigator;
