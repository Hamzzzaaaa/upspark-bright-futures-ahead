
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'cognitive' | 'motor' | 'speech' | 'creative' | 'sensory';
  completed: boolean;
  emoji: string;
}

interface ActivitiesZoneProps {
  childName: string;
}

const ActivitiesZone = ({ childName }: ActivitiesZoneProps) => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Color Matching Game',
      description: 'Match colors with everyday objects',
      duration: 15,
      category: 'cognitive',
      completed: false,
      emoji: '🎨'
    },
    {
      id: '2',
      title: 'Finger Tracing Shapes',
      description: 'Trace circles, squares, and triangles',
      duration: 10,
      category: 'motor',
      completed: true,
      emoji: '✋'
    },
    {
      id: '3',
      title: 'Musical Sounds',
      description: 'Listen and identify different sounds',
      duration: 20,
      category: 'speech',
      completed: false,
      emoji: '🎵'
    },
    {
      id: '4',
      title: 'Texture Exploration',
      description: 'Feel different textures and materials',
      duration: 15,
      category: 'sensory',
      completed: false,
      emoji: '🤚'
    },
    {
      id: '5',
      title: 'Scribble Art',
      description: 'Free drawing and creative expression',
      duration: 25,
      category: 'creative',
      completed: false,
      emoji: '🖍️'
    },
    {
      id: '6',
      title: 'Emotion Cards',
      description: 'Learn about different feelings',
      duration: 15,
      category: 'cognitive',
      completed: false,
      emoji: '😊'
    }
  ]);

  const toggleActivity = (id: string) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === id 
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      cognitive: 'from-blue-400 to-purple-500',
      motor: 'from-green-400 to-teal-500',
      speech: 'from-yellow-400 to-orange-500',
      creative: 'from-pink-400 to-red-500',
      sensory: 'from-indigo-400 to-blue-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const completedCount = activities.filter(a => a.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {childName}'s Daily Activities 🌟
        </h2>
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-2xl">
          <p className="text-lg font-semibold text-gray-700">
            {completedCount} of {activities.length} activities completed!
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / activities.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <Card 
            key={activity.id} 
            className={`border-0 shadow-lg transition-all duration-300 ${
              activity.completed ? 'opacity-75 scale-95' : 'hover:shadow-xl'
            }`}
          >
            <CardContent className="p-0">
              <div className={`bg-gradient-to-r ${getCategoryColor(activity.category)} p-4 rounded-t-xl`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{activity.emoji}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{activity.title}</h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {activity.duration} min
                      </div>
                    </div>
                  </div>
                  {activity.completed && (
                    <div className="text-3xl animate-bounce">✅</div>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-white rounded-b-xl">
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <Button
                  onClick={() => toggleActivity(activity.id)}
                  className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                    activity.completed
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                  }`}
                >
                  {activity.completed ? '🎉 Great Job!' : '🚀 Start Activity'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActivitiesZone;
