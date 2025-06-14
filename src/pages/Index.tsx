
import { useState, useEffect } from 'react';
import { Activity, UserCheck, Pill, Home, User, Calendar, TrendingUp, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/components/DashboardCard';
import ActivitiesZone from '@/components/ActivitiesZone';
import TherapistBooking from '@/components/TherapistBooking';
import MedicineDelivery from '@/components/MedicineDelivery';
import UpSparkLogo from '@/components/UpSparkLogo';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [childName, setChildName] = useState('Emma'); // Default fallback
  const [selectedPlan, setSelectedPlan] = useState(30); // Default 30-day plan
  const navigate = useNavigate();

  // Progress data
  const therapistProgress = 75; // 12/16 sessions = 75%
  const activitiesProgress = 85; // 85% activities done
  const overallDevelopment = Math.round((therapistProgress + activitiesProgress) / 2); // Average of both

  // Load child name from localStorage on component mount
  useEffect(() => {
    const storedChildName = localStorage.getItem('childName');
    if (storedChildName) {
      setChildName(storedChildName);
    }
  }, []);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handlePlanSelected = (planDays: number) => {
    setSelectedPlan(planDays);
    setActiveTab('activities'); // Switch to activities after booking
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'activities':
        return <ActivitiesZone childName={childName} selectedPlan={selectedPlan} />;
      case 'therapist':
        return <TherapistBooking onPlanSelected={handlePlanSelected} />;
      case 'medicine':
        return <MedicineDelivery />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Header with Logo */}
            <div className="bold-card p-6 sm:p-8 rounded-3xl text-center">
              <UpSparkLogo size="medium" className="mb-4 sm:mb-6" />
              <h1 className="text-3xl sm:text-5xl mb-3 sm:mb-4 font-black text-white">Welcome to UpSpark!</h1>
              <p className="text-xl sm:text-3xl font-black text-white">Let's make today amazing for {childName} ✨</p>
            </div>

            {/* Progress Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Therapist Sessions - Clickable */}
              <Card 
                className="bold-card cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => setActiveTab('therapist')}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-black text-white">12/16</div>
                  <div className="text-base sm:text-lg font-black text-white">Therapist Sessions</div>
                  <div className="text-sm sm:text-base font-bold text-purple-300">{therapistProgress}% Complete</div>
                </CardContent>
              </Card>

              {/* Activities Completed - Clickable */}
              <Card 
                className="bold-card cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => setActiveTab('activities')}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <Target className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-black text-white">{activitiesProgress}%</div>
                  <div className="text-base sm:text-lg font-black text-white">Activities Done</div>
                  <div className="text-sm sm:text-base font-bold text-green-300">Great Progress!</div>
                </CardContent>
              </Card>

              {/* Development Progress - Calculated from above */}
              <Card className="bold-card sm:col-span-2">
                <CardContent className="p-4 sm:p-6 text-center">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-black text-white">{overallDevelopment}%</div>
                  <div className="text-base sm:text-lg font-black text-white">Overall Development</div>
                  <div className="text-sm sm:text-base font-bold text-yellow-300">Excellent Progress This Month</div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="pb-24">
        <div className="p-4 sm:p-6 max-w-md mx-auto">
          {renderActiveTab()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bold-card border-t-4 border-primary">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-around">
            {[
              { id: 'dashboard', icon: Home, label: 'Home' },
              { id: 'activities', icon: Activity, label: 'Activities' },
              { id: 'therapist', icon: UserCheck, label: 'Therapist' },
              { id: 'medicine', icon: Pill, label: 'Medicine' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 sm:py-3 px-2 sm:px-4 rounded-2xl transition-all duration-300 font-black ${
                  activeTab === tab.id
                    ? 'bold-button shadow-2xl scale-110'
                    : 'text-white hover:text-white hover:scale-105'
                }`}
              >
                <tab.icon className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" />
                <span className="text-sm sm:text-base font-black tracking-wide">{tab.label}</span>
              </button>
            ))}
            <button
              onClick={handleProfileClick}
              className="flex flex-col items-center py-2 sm:py-3 px-2 sm:px-4 rounded-2xl transition-all duration-300 font-black text-white hover:text-white hover:scale-105"
            >
              <User className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" />
              <span className="text-sm sm:text-base font-black tracking-wide">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
