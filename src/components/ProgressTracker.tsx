
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
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          {childName}'s Progress 📈
        </h2>
        <p className="text-sm sm:text-base text-gray-200">Track development across different areas</p>
      </div>

      {/* Overall Progress */}
      <Card className="bold-card">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center text-white text-lg sm:text-xl">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Overall Development
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">77%</div>
            <p className="text-sm sm:text-base text-gray-200">Average Progress This Month</p>
          </div>
        </CardContent>
      </Card>

      {/* Category Progress */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">Development Areas</h3>
        {progressData.map((item) => (
          <Card key={item.category} className="bold-card">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xl sm:text-2xl">{item.emoji}</span>
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">{item.category}</h4>
                    <p className="text-xs sm:text-sm text-gray-200">{item.progress}% complete</p>
                  </div>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-white">{item.progress}%</div>
              </div>
              
              <div className="w-full bg-gray-600 rounded-full h-2 sm:h-3">
                <div 
                  className={`bg-gradient-to-r ${item.color} h-2 sm:h-3 rounded-full transition-all duration-1000`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Activity Chart */}
      <Card className="bold-card">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center text-white text-lg sm:text-xl">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            This Week's Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {weeklyActivities.map((day) => (
              <div key={day.day} className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-8 sm:w-10 text-xs sm:text-sm font-medium text-gray-200">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm text-gray-200">
                      {day.completed}/{day.total} activities
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-gray-200">
                      {Math.round((day.completed / day.total) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 sm:h-2 rounded-full"
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
