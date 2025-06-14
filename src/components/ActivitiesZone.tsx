
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'cognitive' | 'motor' | 'speech' | 'creative' | 'sensory';
  completed: boolean;
  emoji: string;
  interactive?: boolean;
  day: number;
}

interface ActivitiesZoneProps {
  childName: string;
  selectedPlan?: number; // days from therapist booking
}

const ActivitiesZone = ({ childName, selectedPlan = 30 }: ActivitiesZoneProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [activeActivity, setActiveActivity] = useState<Activity | null>(null);

  // Generate activities based on selected plan
  useEffect(() => {
    const generateActivities = (days: number) => {
      const baseActivities = [
        {
          title: 'Color Sorting Game',
          description: 'Sort colored balls into matching jars',
          duration: 15,
          category: 'cognitive' as const,
          emoji: '🔴',
          interactive: true
        },
        {
          title: 'Shape Recognition',
          description: 'Match shapes with their outlines',
          duration: 12,
          category: 'cognitive' as const,
          emoji: '🔷'
        },
        {
          title: 'Finger Painting',
          description: 'Create art with finger paints',
          duration: 20,
          category: 'creative' as const,
          emoji: '🎨'
        },
        {
          title: 'Sound Identification',
          description: 'Listen and identify animal sounds',
          duration: 10,
          category: 'speech' as const,
          emoji: '🐶'
        },
        {
          title: 'Texture Exploration',
          description: 'Feel different textures and materials',
          duration: 15,
          category: 'sensory' as const,
          emoji: '🤚'
        },
        {
          title: 'Balance Walk',
          description: 'Walk on a line maintaining balance',
          duration: 8,
          category: 'motor' as const,
          emoji: '🚶‍♀️'
        },
        {
          title: 'Number Counting',
          description: 'Count objects and match numbers',
          duration: 12,
          category: 'cognitive' as const,
          emoji: '🔢'
        },
        {
          title: 'Singing Time',
          description: 'Sing simple songs and rhymes',
          duration: 10,
          category: 'speech' as const,
          emoji: '🎵'
        }
      ];

      const generatedActivities: Activity[] = [];
      for (let day = 1; day <= days; day++) {
        const activityIndex = (day - 1) % baseActivities.length;
        const baseActivity = baseActivities[activityIndex];
        generatedActivities.push({
          id: `${day}-${activityIndex}`,
          ...baseActivity,
          completed: false,
          day: day
        });
      }
      return generatedActivities;
    };

    setActivities(generateActivities(selectedPlan));
  }, [selectedPlan]);

  const toggleActivity = (id: string) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === id 
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const openActivity = (activity: Activity) => {
    if (activity.interactive) {
      setActiveActivity(activity);
    } else {
      toggleActivity(activity.id);
    }
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

  const currentDayActivities = activities.filter(a => a.day === currentDay);
  const completedCount = currentDayActivities.filter(a => a.completed).length;

  // If interactive activity is active, show the interactive component
  if (activeActivity) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setActiveActivity(null)}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <h2 className="text-xl font-bold text-gray-800">
            {activeActivity.title}
          </h2>
        </div>
        
        {activeActivity.title === 'Color Sorting Game' && (
          <ColorSortingGame 
            onComplete={() => {
              toggleActivity(activeActivity.id);
              setActiveActivity(null);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {childName}'s {selectedPlan}-Day Program 🌟
        </h2>
        
        {/* Day Navigation */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-2 rounded-xl">
            <span className="text-lg font-semibold text-gray-800">
              Day {currentDay} of {selectedPlan}
            </span>
          </div>
          <Button
            onClick={() => setCurrentDay(Math.min(selectedPlan, currentDay + 1))}
            disabled={currentDay === selectedPlan}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>

        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-2xl">
          <p className="text-lg font-semibold text-gray-700">
            {completedCount} of {currentDayActivities.length} activities completed today!
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${currentDayActivities.length > 0 ? (completedCount / currentDayActivities.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Activities for Current Day */}
      <div className="space-y-4">
        {currentDayActivities.map((activity) => (
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
                  onClick={() => openActivity(activity)}
                  className={`w-full py-3 text-lg font-semibold rounded-xl transition-all duration-200 ${
                    activity.completed
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : activity.interactive
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                  }`}
                >
                  {activity.completed 
                    ? '🎉 Great Job!' 
                    : activity.interactive 
                    ? '🎮 Play Activity'
                    : '🚀 Start Activity'
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Interactive Color Sorting Game Component
const ColorSortingGame = ({ onComplete }: { onComplete: () => void }) => {
  const [balls] = useState([
    { id: 1, color: 'red', name: 'Red' },
    { id: 2, color: 'blue', name: 'Blue' },
    { id: 3, color: 'green', name: 'Green' },
    { id: 4, color: 'yellow', name: 'Yellow' },
    { id: 5, color: 'purple', name: 'Purple' }
  ]);
  
  const [jarBalls, setJarBalls] = useState<typeof balls>([]);
  const [score, setScore] = useState(0);
  const [currentBall, setCurrentBall] = useState<typeof balls[0] | null>(null);

  const addBallToJar = (ball: typeof balls[0]) => {
    setJarBalls(prev => [...prev, ball]);
    setScore(prev => prev + 1);
    setCurrentBall(null);
    
    // Speak the color name
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Great job! You picked ${ball.name}. Count: ${score + 1}`);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }

    if (score + 1 === balls.length) {
      setTimeout(() => {
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance('Excellent! You sorted all the colors!');
          speechSynthesis.speak(utterance);
        }
        onComplete();
      }, 2000);
    }
  };

  const getBallColor = (color: string) => {
    const colors = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-500'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Color Sorting Game 🎯</h3>
        <p className="text-gray-600">Pick up the colored balls and put them in the jar!</p>
        <div className="text-3xl font-bold text-purple-600 mt-4">
          Count: {score} / {balls.length}
        </div>
      </div>

      {/* Available Balls */}
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">Pick a Ball</h4>
        <div className="flex flex-wrap justify-center gap-4">
          {balls.map((ball) => {
            const isUsed = jarBalls.some(jb => jb.id === ball.id);
            return (
              <button
                key={ball.id}
                onClick={() => !isUsed && setCurrentBall(ball)}
                disabled={isUsed}
                className={`w-16 h-16 rounded-full ${getBallColor(ball.color)} 
                  ${isUsed ? 'opacity-30' : 'hover:scale-110 active:scale-95'} 
                  transition-all duration-200 shadow-lg
                  ${currentBall?.id === ball.id ? 'ring-4 ring-white scale-110' : ''}
                `}
              />
            );
          })}
        </div>
      </div>

      {/* Selected Ball */}
      {currentBall && (
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            You picked: <span className="text-2xl font-bold" style={{ color: currentBall.color }}>
              {currentBall.name}
            </span>
          </p>
          <div className={`w-20 h-20 rounded-full ${getBallColor(currentBall.color)} mx-auto shadow-lg animate-bounce`} />
        </div>
      )}

      {/* Empty Jar */}
      <div className="bg-gradient-to-b from-transparent to-gray-200 p-8 rounded-2xl border-4 border-dashed border-gray-400 min-h-32">
        <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">Empty Jar</h4>
        <div className="flex flex-wrap justify-center gap-2 min-h-16">
          {jarBalls.map((ball, index) => (
            <div
              key={`${ball.id}-${index}`}
              className={`w-12 h-12 rounded-full ${getBallColor(ball.color)} shadow-md animate-pulse`}
            />
          ))}
        </div>
        
        {currentBall && (
          <div className="text-center mt-4">
            <Button
              onClick={() => addBallToJar(currentBall)}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-lg"
            >
              Put Ball in Jar! 🫙
            </Button>
          </div>
        )}
      </div>

      {score === balls.length && (
        <div className="text-center p-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl">
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="text-2xl font-bold text-white">Amazing Job!</h3>
          <p className="text-white text-lg">You sorted all {balls.length} colors!</p>
        </div>
      )}
    </div>
  );
};

export default ActivitiesZone;
