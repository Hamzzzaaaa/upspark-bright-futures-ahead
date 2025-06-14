
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Clock, TrendingUp } from 'lucide-react';

interface LearningPattern {
  optimalTime: string;
  preferredActivities: string[];
  averageAttentionSpan: number;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  moodPattern: string;
}

interface AILearningSystemProps {
  childName: string;
  onPatternUpdate: (pattern: LearningPattern) => void;
}

const AILearningSystem = ({ childName, onPatternUpdate }: AILearningSystemProps) => {
  const [learningPattern, setLearningPattern] = useState<LearningPattern>({
    optimalTime: 'Morning (9-11 AM)',
    preferredActivities: ['Puzzle Games', 'Color Recognition', 'Story Time'],
    averageAttentionSpan: 15,
    difficultyLevel: 'medium',
    moodPattern: 'More focused after breakfast'
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Simulate AI analysis
    const analyzePatterns = () => {
      setIsAnalyzing(true);
      setTimeout(() => {
        // Simulate pattern updates based on activity data
        const updatedPattern = {
          ...learningPattern,
          averageAttentionSpan: Math.floor(Math.random() * 10) + 10,
          optimalTime: Math.random() > 0.5 ? 'Morning (9-11 AM)' : 'Afternoon (2-4 PM)'
        };
        setLearningPattern(updatedPattern);
        onPatternUpdate(updatedPattern);
        setIsAnalyzing(false);
      }, 2000);
    };

    analyzePatterns();
  }, []);

  return (
    <div className="space-y-4">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-100 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Brain className="w-6 h-6 mr-2" />
            AI Learning Insights for {childName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isAnalyzing ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
              <p className="text-purple-600">Analyzing learning patterns...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Optimal Learning Time</p>
                  <p className="text-sm text-gray-600">{learningPattern.optimalTime}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-800">Attention Span</p>
                  <p className="text-sm text-gray-600">{learningPattern.averageAttentionSpan} minutes average</p>
                </div>
              </div>

              <div>
                <p className="font-medium text-gray-800 mb-2">Preferred Activities</p>
                <div className="flex flex-wrap gap-2">
                  {learningPattern.preferredActivities.map((activity, index) => (
                    <span key={index} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>AI Insight:</strong> {learningPattern.moodPattern}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AILearningSystem;
