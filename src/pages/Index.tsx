
import { useState } from 'react';
import { Calendar, Activity, TrendingUp, UserCheck, Pill, Home, Sparkles, User, Brain, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/components/DashboardCard';
import ActivitiesZone from '@/components/ActivitiesZone';
import ProgressTracker from '@/components/ProgressTracker';
import TherapistBooking from '@/components/TherapistBooking';
import MedicineDelivery from '@/components/MedicineDelivery';
import UpSparkLogo from '@/components/UpSparkLogo';
import AILearningSystem from '@/components/AILearningSystem';
import VoiceController from '@/components/VoiceController';
import EmotionDetector from '@/components/EmotionDetector';
import StoryTherapy from '@/components/StoryTherapy';
import AdvancedAnalytics from '@/components/AdvancedAnalytics';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [childName] = useState('Emma');
  const [selectedPlan, setSelectedPlan] = useState(30); // Default 30-day plan
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [activitiesCompleted, setActivitiesCompleted] = useState(7);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handlePlanSelected = (planDays: number) => {
    setSelectedPlan(planDays);
    setActiveTab('activities'); // Switch to activities after booking
  };

  const handleVoiceCommand = (command: string) => {
    console.log('Voice command received:', command);
    switch (command) {
      case 'home':
        setActiveTab('dashboard');
        break;
      case 'play':
        setActiveTab('activities');
        break;
      case 'next':
        // Navigate to next logical tab
        const tabs = ['dashboard', 'activities', 'progress', 'therapist', 'medicine'];
        const currentIndex = tabs.indexOf(activeTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        setActiveTab(tabs[nextIndex]);
        break;
      default:
        break;
    }
  };

  const handleLearningPatternUpdate = (pattern: any) => {
    console.log('Learning pattern updated:', pattern);
    // Here you would typically save to backend or local storage
  };

  const handleEmotionChange = (emotion: any) => {
    console.log('Emotion detected:', emotion);
    // Here you would typically adjust activities based on emotion
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
      case 'ai-insights':
        return <AILearningSystem childName={childName} onPatternUpdate={handleLearningPatternUpdate} />;
      case 'story':
        return <StoryTherapy childName={childName} activitiesCompleted={activitiesCompleted} />;
      case 'analytics':
        return <AdvancedAnalytics childName={childName} />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Header with Logo */}
            <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 p-6 rounded-3xl text-white text-center">
              <UpSparkLogo size="medium" className="mb-4" />
              <h1 className="text-2xl font-bold mb-2">Welcome to UpSpark!</h1>
              <p className="text-lg opacity-90">Let's make today amazing for {childName} ✨</p>
            </div>

            {/* Voice Controller */}
            <VoiceController onVoiceCommand={handleVoiceCommand} isEnabled={voiceEnabled} />

            {/* Emotion Detector */}
            <EmotionDetector childName={childName} onEmotionChange={handleEmotionChange} />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-green-100 to-green-200 border-0">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">{activitiesCompleted}</div>
                  <div className="text-sm text-green-600">Activities Done Today</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-0">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">{selectedPlan}</div>
                  <div className="text-sm text-blue-600">Day Program Active</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Dashboard Cards */}
            <div className="space-y-4">
              <DashboardCard
                title="Daily Activities"
                description={`Fun learning games for ${selectedPlan}-day program`}
                icon={Activity}
                gradient="from-yellow-400 to-orange-500"
                onClick={() => setActiveTab('activities')}
              />
              
              <DashboardCard
                title="AI Learning Insights"
                description="Personalized patterns and recommendations"
                icon={Brain}
                gradient="from-blue-400 to-purple-500"
                onClick={() => setActiveTab('ai-insights')}
              />
              
              <DashboardCard
                title="Adventure Story"
                description={`Follow ${childName}'s magical journey`}
                icon={Sparkles}
                gradient="from-purple-400 to-pink-500"
                onClick={() => setActiveTab('story')}
              />
              
              <DashboardCard
                title="Advanced Analytics"
                description="Detailed progress and behavior insights"
                icon={TrendingUp}
                gradient="from-green-400 to-blue-500"
                onClick={() => setActiveTab('analytics')}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Main Content */}
      <div className="pb-20">
        <div className="p-4 max-w-md mx-auto">
          {renderActiveTab()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex justify-around">
            {[
              { id: 'dashboard', icon: Home, label: 'Home' },
              { id: 'activities', icon: Activity, label: 'Activities' },
              { id: 'ai-insights', icon: Brain, label: 'AI Insights' },
              { id: 'story', icon: Sparkles, label: 'Story' },
              { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg scale-105'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
            <button
              onClick={handleProfileClick}
              className="flex flex-col items-center py-2 px-2 rounded-xl transition-all duration-200 text-gray-500 hover:text-gray-700"
            >
              <User className="w-4 h-4 mb-1" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
