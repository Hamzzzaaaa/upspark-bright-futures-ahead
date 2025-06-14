
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Activity, TrendingUp, CheckCircle, Target, Clock, Home, User, UserCheck, Pill } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UpSparkLogo from '@/components/UpSparkLogo';

const Index = () => {
  const navigate = useNavigate();
  const [childName, setChildName] = useState('Emma'); // Default fallback
  const [activeTab, setActiveTab] = useState('home');

  // Load child name from localStorage on component mount
  useEffect(() => {
    const storedChildName = localStorage.getItem('childName');
    if (storedChildName) {
      setChildName(storedChildName);
    }
  }, []);

  // Mock progress data - in a real app, this would come from your backend
  const therapyData = {
    totalDays: 30,
    completedDays: 18,
    activitiesCompleted: 85,
    totalActivities: 120,
    weeklyProgress: [
      { week: 'Week 1', completed: 95 },
      { week: 'Week 2', completed: 88 },
      { week: 'Week 3', completed: 92 },
      { week: 'Current', completed: 73 }
    ]
  };

  const completionPercentage = Math.round((therapyData.activitiesCompleted / therapyData.totalActivities) * 100);
  const daysPercentage = Math.round((therapyData.completedDays / therapyData.totalDays) * 100);

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'profile') {
      navigate('/profile');
    }
    // For other tabs, we'll just update the active state for now
    // In a real app, you would implement the actual navigation/content switching
  };

  const renderContent = () => {
    if (activeTab === 'activities') {
      return (
        <div className="space-y-6">
          <Card className="bold-card">
            <CardHeader>
              <CardTitle className="text-white text-xl font-black flex items-center">
                <Activity className="w-6 h-6 mr-2" />
                Today's Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg">
                  <span className="text-white font-bold">Speech Therapy</span>
                  <span className="text-green-400 font-bold">Completed ✓</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg">
                  <span className="text-white font-bold">Motor Skills Exercise</span>
                  <span className="text-yellow-400 font-bold">In Progress</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg">
                  <span className="text-white font-bold">Reading Practice</span>
                  <span className="text-gray-400 font-bold">Pending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (activeTab === 'therapist') {
      return (
        <div className="space-y-6">
          <Card className="bold-card">
            <CardHeader>
              <CardTitle className="text-white text-xl font-black flex items-center">
                <UserCheck className="w-6 h-6 mr-2" />
                Your Therapist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-purple-400 rounded-full mx-auto flex items-center justify-center">
                  <UserCheck className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Dr. Sarah Wilson</h3>
                  <p className="text-white/80">Speech & Language Therapist</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-white/20 rounded-lg">
                    <span className="text-white font-bold">Next Appointment</span>
                    <span className="text-white">Tomorrow 2:00 PM</span>
                  </div>
                  <div className="flex justify-between p-3 bg-white/20 rounded-lg">
                    <span className="text-white font-bold">Session Type</span>
                    <span className="text-white">Virtual</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (activeTab === 'medicine') {
      return (
        <div className="space-y-6">
          <Card className="bold-card">
            <CardHeader>
              <CardTitle className="text-white text-xl font-black flex items-center">
                <Pill className="w-6 h-6 mr-2" />
                Medication Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg">
                  <div>
                    <span className="text-white font-bold block">Vitamin D3</span>
                    <span className="text-white/80 text-sm">Morning - 8:00 AM</span>
                  </div>
                  <span className="text-green-400 font-bold">Taken ✓</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg">
                  <div>
                    <span className="text-white font-bold block">Omega-3</span>
                    <span className="text-white/80 text-sm">Afternoon - 2:00 PM</span>
                  </div>
                  <span className="text-yellow-400 font-bold">Pending</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/20 rounded-lg">
                  <div>
                    <span className="text-white font-bold block">Melatonin</span>
                    <span className="text-white/80 text-sm">Evening - 8:00 PM</span>
                  </div>
                  <span className="text-gray-400 font-bold">Scheduled</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Default home content (progress dashboard)
    return (
      <>
        {/* Welcome Header with Logo */}
        <div className="bold-card p-6 sm:p-8 rounded-3xl text-center">
          <UpSparkLogo size="medium" className="mb-4 sm:mb-6" />
          <h1 className="text-3xl sm:text-5xl mb-3 sm:mb-4 font-black text-white">Progress Dashboard</h1>
          <p className="text-xl sm:text-3xl font-black text-white">{childName}'s Therapy Journey ✨</p>
        </div>

        {/* Days of Therapy Progress */}
        <Card className="bold-card">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center text-white text-xl sm:text-2xl font-black">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
              Therapy Days Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-center mb-4">
              <div className="text-4xl sm:text-5xl font-black text-primary mb-2">
                {therapyData.completedDays}/{therapyData.totalDays}
              </div>
              <p className="text-lg sm:text-xl font-bold text-white">Days Completed</p>
              <div className="text-2xl sm:text-3xl font-black text-secondary mt-2">{daysPercentage}%</div>
            </div>
            
            <div className="w-full bg-gray-600 rounded-full h-4 sm:h-6">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-4 sm:h-6 rounded-full transition-all duration-1000"
                style={{ width: `${daysPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Activities Completion Progress */}
        <Card className="bold-card">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center text-white text-xl sm:text-2xl font-black">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
              Activities Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-center mb-4">
              <div className="text-4xl sm:text-5xl font-black text-primary mb-2">
                {therapyData.activitiesCompleted}/{therapyData.totalActivities}
              </div>
              <p className="text-lg sm:text-xl font-bold text-white">Activities Done</p>
              <div className="text-2xl sm:text-3xl font-black text-secondary mt-2">{completionPercentage}%</div>
            </div>
            
            <div className="w-full bg-gray-600 rounded-full h-4 sm:h-6">
              <div 
                className="bg-gradient-to-r from-green-400 to-teal-500 h-4 sm:h-6 rounded-full transition-all duration-1000"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress Breakdown */}
        <Card className="bold-card">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center text-white text-xl sm:text-2xl font-black">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {therapyData.weeklyProgress.map((week, index) => (
                <div key={week.week} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${index === therapyData.weeklyProgress.length - 1 ? 'bg-yellow-400' : 'bg-green-400'}`} />
                    <span className="text-lg font-black text-white">{week.week}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-black text-white">{week.completed}%</span>
                    {week.completed >= 90 && <CheckCircle className="w-5 h-5 text-green-400" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bold-card">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-black text-white">12</div>
              <div className="text-sm font-bold text-white">Days Remaining</div>
            </CardContent>
          </Card>
          
          <Card className="bold-card">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-black text-white">35</div>
              <div className="text-sm font-bold text-white">Activities Left</div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="pb-20">
        <div className="p-4 sm:p-6 max-w-md mx-auto space-y-6">
          {renderContent()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'activities', icon: Activity, label: 'Activities' },
              { id: 'profile', icon: User, label: 'Profile' },
              { id: 'therapist', icon: UserCheck, label: 'Therapist' },
              { id: 'medicine', icon: Pill, label: 'Medicine' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleNavigation(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg scale-105'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
