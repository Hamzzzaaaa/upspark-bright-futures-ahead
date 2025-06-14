
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calendar } from 'lucide-react';

interface ProgressTrackerProps {
  childName: string;
}

const ProgressTracker = ({ childName }: ProgressTrackerProps) => {
  const progressData = [
    { category: 'Cognitive', progress: 78, color: 'from-blue-400 to-purple-500', emoji: '🧠' },
    { category: 'Motor Skills', progress: 65, color: 'from-green-400 to-teal-500', emoji: '🤸' },
    { category: 'Speech', progress: 82, color: 'from-yellow-400 to-orange-500', emoji: '🗣️' },
    { category: 'Behavior', progress: 71, color: 'from-pink-400 to-red-500', emoji: '😊' },
    { category: 'Emotional', progress: 88, color: 'from-indigo-400 to-blue-500', emoji: '💚' }
  ];

  const weeklyActivities = [
    { day: 'Mon', completed: 6, total: 8 },
    { day: 'Tue', completed: 7, total: 8 },
    { day: 'Wed', completed: 5, total: 8 },
    { day: 'Thu', completed: 8, total: 8 },
    { day: 'Fri', completed: 6, total: 8 },
    { day: 'Sat', completed: 4, total: 6 },
    { day: 'Sun', completed: 3, total: 6 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {childName}'s Progress 📈
        </h2>
        <p className="text-gray-600">Track development across different areas</p>
      </div>

      {/* Overall Progress */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-100 to-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <TrendingUp className="w-6 h-6 mr-2" />
            Overall Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">77%</div>
            <p className="text-purple-700">Average Progress This Month</p>
          </div>
        </CardContent>
      </Card>

      {/* Category Progress */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Development Areas</h3>
        {progressData.map((item) => (
          <Card key={item.category} className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.category}</h4>
                    <p className="text-sm text-gray-600">{item.progress}% complete</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-700">{item.progress}%</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Activity Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-800">
            <Calendar className="w-6 h-6 mr-2" />
            This Week's Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyActivities.map((day) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-10 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">
                      {day.completed}/{day.total} activities
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {Math.round((day.completed / day.total) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                      style={{ width: `${(day.completed / day.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
