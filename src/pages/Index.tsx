
import { useState } from 'react';
import { Calendar, Activity, TrendingUp, UserCheck, Pill, Home, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/components/DashboardCard';
import ActivitiesZone from '@/components/ActivitiesZone';
import ProgressTracker from '@/components/ProgressTracker';
import TherapistBooking from '@/components/TherapistBooking';
import MedicineDelivery from '@/components/MedicineDelivery';
import UpSparkLogo from '@/components/UpSparkLogo';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [childName] = useState('Emma');
  const [selectedPlan, setSelectedPlan] = useState(30); // Default 30-day plan
  const navigate = useNavigate();

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
      case 'progress':
        return <ProgressTracker childName={childName} />;
      case 'therapist':
        return <TherapistBooking onPlanSelected={handlePlanSelected} />;
      case 'medicine':
        return <MedicineDelivery />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Header with Logo */}
            <div className="bold-card p-8 rounded-3xl text-center">
              <UpSparkLogo size="medium" className="mb-6" />
              <h1 className="text-4xl mb-4 font-black text-white">Welcome to UpSpark!</h1>
              <p className="text-2xl text-gray-200 font-bold">Let's make today amazing for {childName} ✨</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <Card className="bold-card">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-black text-primary">7</div>
                  <div className="text-lg font-bold text-gray-200">Activities Done Today</div>
                </CardContent>
              </Card>
              <Card className="bold-card">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-black text-secondary">{selectedPlan}</div>
                  <div className="text-lg font-bold text-gray-200">Day Program Active</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Cards */}
            <div className="space-y-6">
              <DashboardCard
                title="Daily Activities"
                description={`Fun learning games for ${selectedPlan}-day program`}
                icon={Activity}
                gradient="from-yellow-400 to-orange-500"
                onClick={() => setActiveTab('activities')}
              />
              
              <DashboardCard
                title="Progress Tracking"
                description="View detailed progress reports"
                icon={TrendingUp}
                gradient="from-green-400 to-blue-500"
                onClick={() => setActiveTab('progress')}
              />
              
              <DashboardCard
                title="Book Therapist"
                description="Schedule therapy sessions & choose program"
                icon={UserCheck}
                gradient="from-purple-400 to-pink-500"
                onClick={() => setActiveTab('therapist')}
              />
              
              <DashboardCard
                title="Medicine Delivery"
                description="Order medication refills"
                icon={Pill}
                gradient="from-teal-400 to-cyan-500"
                onClick={() => setActiveTab('medicine')}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="pb-24">
        <div className="p-6 max-w-md mx-auto">
          {renderActiveTab()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bold-card border-t-4 border-primary">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex justify-around">
            {[
              { id: 'dashboard', icon: Home, label: 'Home' },
              { id: 'activities', icon: Activity, label: 'Activities' },
              { id: 'progress', icon: TrendingUp, label: 'Progress' },
              { id: 'therapist', icon: UserCheck, label: 'Therapist' },
              { id: 'medicine', icon: Pill, label: 'Medicine' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 font-bold ${
                  activeTab === tab.id
                    ? 'bold-button text-white shadow-2xl scale-110'
                    : 'text-gray-300 hover:text-white hover:scale-105'
                }`}
              >
                <tab.icon className="w-6 h-6 mb-2" />
                <span className="text-sm font-black tracking-wide">{tab.label}</span>
              </button>
            ))}
            <button
              onClick={handleProfileClick}
              className="flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 font-bold text-gray-300 hover:text-white hover:scale-105"
            >
              <User className="w-6 h-6 mb-2" />
              <span className="text-sm font-black tracking-wide">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
