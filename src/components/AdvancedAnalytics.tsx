
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Eye, Timer, Target, Brain, Zap } from 'lucide-react';

interface MicroBehavior {
  metric: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<any>;
  color: string;
}

interface AdvancedAnalyticsProps {
  childName: string;
}

const AdvancedAnalytics = ({ childName }: AdvancedAnalyticsProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const microBehaviors: MicroBehavior[] = [
    {
      metric: 'Eye Contact Duration',
      value: 3.2,
      unit: 'seconds avg',
      trend: 'up',
      icon: Eye,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      metric: 'Response Time',
      value: 2.8,
      unit: 'seconds',
      trend: 'down',
      icon: Timer,
      color: 'from-green-400 to-emerald-500'
    },
    {
      metric: 'Task Completion Rate',
      value: 78,
      unit: '%',
      trend: 'up',
      icon: Target,
      color: 'from-purple-400 to-violet-500'
    },
    {
      metric: 'Attention Span',
      value: 18,
      unit: 'minutes',
      trend: 'up',
      icon: Brain,
      color: 'from-orange-400 to-red-500'
    },
    {
      metric: 'Engagement Level',
      value: 85,
      unit: '%',
      trend: 'stable',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  const environmentalFactors = [
    { factor: 'Morning Sessions', performance: 92, count: 15 },
    { factor: 'After Snack Time', performance: 88, count: 12 },
    { factor: 'Quiet Environment', performance: 85, count: 20 },
    { factor: 'With Music', performance: 79, count: 8 },
    { factor: 'Afternoon Sessions', performance: 73, count: 10 }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Advanced Analytics for {childName}
        </h2>
        <div className="flex justify-center space-x-2">
          {['week', 'month', 'quarter'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTimeframe === timeframe
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Micro-Behaviors */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-800">
            <BarChart className="w-6 h-6 mr-2" />
            Micro-Behavior Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {microBehaviors.map((behavior, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${behavior.color}`}>
                      <behavior.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{behavior.metric}</p>
                      <p className="text-sm text-gray-600">{behavior.value} {behavior.unit}</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${getTrendColor(behavior.trend)}`}>
                    <span className="text-lg">{getTrendIcon(behavior.trend)}</span>
                    <span className="text-sm font-medium">
                      {behavior.trend === 'up' ? '+12%' : behavior.trend === 'down' ? '-8%' : '0%'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Factors */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">Environmental Performance Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {environmentalFactors.map((factor, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{factor.factor}</span>
                    <span className="text-sm text-gray-600">{factor.performance}% ({factor.count} sessions)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                      style={{ width: `${factor.performance}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Predictive Insights */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-100 to-purple-100">
        <CardHeader>
          <CardTitle className="text-purple-800">🔮 Predictive Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-white bg-opacity-70 p-3 rounded-lg">
            <p className="text-sm text-indigo-800">
              <strong>Optimal Session Prediction:</strong> Tomorrow morning (9:30 AM) shows 94% probability for high engagement based on historical patterns.
            </p>
          </div>
          <div className="bg-white bg-opacity-70 p-3 rounded-lg">
            <p className="text-sm text-indigo-800">
              <strong>Challenge Alert:</strong> Friday afternoons typically show 23% lower attention spans. Consider shorter, more interactive activities.
            </p>
          </div>
          <div className="bg-white bg-opacity-70 p-3 rounded-lg">
            <p className="text-sm text-indigo-800">
              <strong>Progress Forecast:</strong> At current rate, {childName} is projected to reach next milestone in 8-10 days.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;
