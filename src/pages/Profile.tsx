import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Edit, Save, LogOut, Home, Activity, TrendingUp, UserCheck, Pill, Camera, Star, Calendar } from 'lucide-react';
import ActivitiesZone from '@/components/ActivitiesZone';
import TherapistList from '@/components/TherapistList';
import MedicineDelivery from '@/components/MedicineDelivery';
import DocumentVerification from '@/components/DocumentVerification';
import ProgressTracker from '@/components/ProgressTracker';
import UpSparkLogo from '@/components/UpSparkLogo';
import { type Therapist } from '@/data/therapistData';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPlan, setSelectedPlan] = useState(30);
  
  // Load data from localStorage (application form and any saved profile data)
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');
  
  // Current plan information
  const [currentPlan, setCurrentPlan] = useState({
    therapistName: '',
    planName: '',
    planPrice: '',
    startDate: ''
  });

  // Progress tracking state
  const [progressData, setProgressData] = useState({
    completedSessions: 0,
    totalSessions: 0,
    completedActivities: 0,
    totalActivities: 0,
    therapistProgress: 0,
    activitiesProgress: 0,
    overallDevelopment: 0
  });

  useEffect(() => {
    // Load application data from localStorage
    const savedChildName = localStorage.getItem('childName') || '';
    const savedParentName = localStorage.getItem('parentName') || 'Sarah Johnson';
    const savedEmail = localStorage.getItem('parentEmail') || 'sarah.johnson@email.com';
    const savedPhone = localStorage.getItem('parentPhone') || '+1 (555) 123-4567';
    const savedAddress = localStorage.getItem('address') || '123 Main St, Anytown, USA';
    const savedProfileImage = localStorage.getItem('profileImage') || '';
    
    // Load current booking information
    const savedTherapistName = localStorage.getItem('bookedTherapistName') || '';
    const savedPlanName = localStorage.getItem('bookedPlanName') || '';
    const savedPlanPrice = localStorage.getItem('bookedPlanPrice') || '';
    const savedStartDate = localStorage.getItem('bookingDate') || '';
    
    // Load progress data
    const savedCompletedSessions = parseInt(localStorage.getItem('completedSessions') || '0');
    const savedCompletedActivities = parseInt(localStorage.getItem('completedActivities') || '0');
    
    // Calculate progress based on plan
    let totalSessions = 0;
    if (savedPlanName.includes('Basic')) totalSessions = 4;
    else if (savedPlanName.includes('Standard')) totalSessions = 10;
    else if (savedPlanName.includes('Premium')) totalSessions = 18;
    else if (savedTherapistName && !savedPlanName.includes('Plan')) totalSessions = 16; // Default for therapist bookings
    
    // If newly booked (no start date or today's date), start with 0 sessions
    const isNewlyBooked = !savedStartDate || savedStartDate === new Date().toLocaleDateString();
    const actualCompletedSessions = isNewlyBooked ? 0 : savedCompletedSessions;
    
    // Activities calculation (assuming 50 total activities for a complete program)
    const totalActivities = 50;
    const actualCompletedActivities = isNewlyBooked ? 0 : savedCompletedActivities;
    
    // Calculate percentages
    const therapistProgress = totalSessions > 0 ? Math.round((actualCompletedSessions / totalSessions) * 100) : 0;
    const activitiesProgress = Math.round((actualCompletedActivities / totalActivities) * 100);
    const overallDevelopment = Math.round((therapistProgress + activitiesProgress) / 2);
    
    setChildName(savedChildName);
    setParentName(savedParentName);
    setEmail(savedEmail);
    setPhone(savedPhone);
    setAddress(savedAddress);
    setProfileImage(savedProfileImage);
    
    setCurrentPlan({
      therapistName: savedTherapistName,
      planName: savedPlanName,
      planPrice: savedPlanPrice,
      startDate: savedStartDate
    });

    setProgressData({
      completedSessions: actualCompletedSessions,
      totalSessions,
      completedActivities: actualCompletedActivities,
      totalActivities,
      therapistProgress,
      activitiesProgress,
      overallDevelopment
    });
  }, []);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('parentName', parentName);
    localStorage.setItem('childName', childName);
    localStorage.setItem('parentEmail', email);
    localStorage.setItem('parentPhone', phone);
    localStorage.setItem('address', address);
    localStorage.setItem('profileImage', profileImage);
    
    setIsEditing(false);
    console.log('Profile updated');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handlePlanSelected = (planDays: number) => {
    setSelectedPlan(planDays);
    setActiveTab('activities'); // Switch to activities after booking
  };

  const handleTherapistSelected = (therapist: Therapist) => {
    // Save therapist selection to localStorage
    localStorage.setItem('selectedTherapist', JSON.stringify(therapist));
    localStorage.setItem('bookedTherapistName', therapist.name);
    localStorage.setItem('bookedPlanName', `${therapist.specialty} Sessions`);
    localStorage.setItem('bookedPlanPrice', therapist.consultationFee.toString());
    localStorage.setItem('bookingDate', new Date().toLocaleDateString());
    
    // Reset progress for new booking
    localStorage.setItem('completedSessions', '0');
    localStorage.setItem('completedActivities', '0');
    
    // Update current plan state
    setCurrentPlan({
      therapistName: therapist.name,
      planName: `${therapist.specialty} Sessions`,
      planPrice: therapist.consultationFee.toString(),
      startDate: new Date().toLocaleDateString()
    });
    
    // Reset progress data for new booking
    setProgressData(prev => ({
      ...prev,
      completedSessions: 0,
      therapistProgress: 0,
      overallDevelopment: Math.round(prev.activitiesProgress / 2)
    }));
    
    console.log('Therapist selected:', therapist.name);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setProfileImage(imageUrl);
        if (!isEditing) {
          localStorage.setItem('profileImage', imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerificationComplete = () => {
    setActiveTab('medicine');
  };

  const handleUploadRequest = () => {
    setActiveTab('profile');
    // Scroll to document verification if needed
  };

  const handleActivityComplete = () => {
    const newCompletedActivities = progressData.completedActivities + 1;
    const newActivitiesProgress = Math.round((newCompletedActivities / progressData.totalActivities) * 100);
    const newOverallDevelopment = Math.round((progressData.therapistProgress + newActivitiesProgress) / 2);
    
    // Save to localStorage
    localStorage.setItem('completedActivities', newCompletedActivities.toString());
    
    // Update state
    setProgressData(prev => ({
      ...prev,
      completedActivities: newCompletedActivities,
      activitiesProgress: newActivitiesProgress,
      overallDevelopment: newOverallDevelopment
    }));
  };

  const handleSessionComplete = () => {
    const newCompletedSessions = progressData.completedSessions + 1;
    const newTherapistProgress = progressData.totalSessions > 0 ? 
      Math.round((newCompletedSessions / progressData.totalSessions) * 100) : 0;
    const newOverallDevelopment = Math.round((newTherapistProgress + progressData.activitiesProgress) / 2);
    
    // Save to localStorage
    localStorage.setItem('completedSessions', newCompletedSessions.toString());
    
    // Update state
    setProgressData(prev => ({
      ...prev,
      completedSessions: newCompletedSessions,
      therapistProgress: newTherapistProgress,
      overallDevelopment: newOverallDevelopment
    }));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Welcome Header with Logo */}
            <div className="bold-card p-8 rounded-3xl text-center">
              <UpSparkLogo size="medium" className="mb-6" />
              <h1 className="text-5xl mb-4 font-black text-white">Welcome to UpSpark!</h1>
              <p className="text-3xl font-black text-white">Let's make today amazing for {childName} ✨</p>
            </div>

            {/* Progress Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Therapist Sessions - Clickable */}
              <Card 
                className="bold-card cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => setActiveTab('therapist')}
              >
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <div className="text-4xl font-black text-white mb-2">
                    {progressData.completedSessions}/{progressData.totalSessions || 'N/A'}
                  </div>
                  <div className="text-xl font-black text-white mb-1">Therapist Sessions</div>
                  <div className="text-lg font-bold text-purple-300">
                    {progressData.totalSessions > 0 ? `${progressData.therapistProgress}% Complete` : 'Book a therapist to start'}
                  </div>
                  {progressData.totalSessions > 0 && (
                    <Button 
                      onClick={(e) => { e.stopPropagation(); handleSessionComplete(); }}
                      className="mt-3 text-xs bg-purple-500 hover:bg-purple-600"
                      size="sm"
                    >
                      Mark Session Complete
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Activities Completed - Clickable */}
              <Card 
                className="bold-card cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => setActiveTab('activities')}
              >
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <div className="text-4xl font-black text-white mb-2">
                    {progressData.completedActivities}/{progressData.totalActivities}
                  </div>
                  <div className="text-xl font-black text-white mb-1">Activities Done</div>
                  <div className="text-lg font-bold text-green-300">{progressData.activitiesProgress}% Complete</div>
                  <Button 
                    onClick={(e) => { e.stopPropagation(); handleActivityComplete(); }}
                    className="mt-3 text-xs bg-green-500 hover:bg-green-600"
                    size="sm"
                  >
                    Mark Activity Complete
                  </Button>
                </CardContent>
              </Card>

              {/* Development Progress - Calculated from above */}
              <Card className="bold-card sm:col-span-2">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <div className="text-4xl font-black text-white mb-2">{progressData.overallDevelopment}%</div>
                  <div className="text-xl font-black text-white mb-1">Overall Development</div>
                  <div className="text-lg font-bold text-yellow-300">
                    {progressData.overallDevelopment >= 80 ? 'Excellent Progress!' :
                     progressData.overallDevelopment >= 50 ? 'Great Progress!' :
                     progressData.overallDevelopment >= 20 ? 'Good Start!' : 
                     'Just Getting Started'}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Tracker Component */}
            <ProgressTracker childName={childName} />
          </div>
        );
      case 'activities':
        return <ActivitiesZone childName={childName} selectedPlan={selectedPlan} onActivityComplete={handleActivityComplete} />;
      case 'therapist':
        return <TherapistList onTherapistSelect={handleTherapistSelected} />;
      case 'medicine':
        return <MedicineDelivery onUploadRequest={handleUploadRequest} />;
      default:
        return (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black mb-3 text-white">Profile Settings</h1>
              <p className="text-xl font-black text-white opacity-90">Manage your account information</p>
            </div>

            {/* Profile Picture Section */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20">
                  <AvatarImage src={profileImage} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-3xl font-black">
                    {parentName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <label className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-white p-3 rounded-full cursor-pointer transition-all duration-200 hover:scale-105">
                  <Camera className="w-5 h-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Current Plan Card */}
            {currentPlan.therapistName && (
              <Card className="bold-card mb-8 bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/30">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-black text-white flex items-center justify-center">
                    <Star className="w-6 h-6 mr-3 text-yellow-400" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-gray-300">Therapist:</span>
                    <span className="text-lg font-black text-white">{currentPlan.therapistName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-gray-300">Plan:</span>
                    <span className="text-lg font-black text-green-400">{currentPlan.planName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-gray-300">Progress:</span>
                    <span className="text-lg font-black text-blue-400">
                      {progressData.completedSessions}/{progressData.totalSessions} sessions
                    </span>
                  </div>
                  {currentPlan.planPrice && (
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-gray-300">Price:</span>
                      <span className="text-lg font-black text-yellow-400">₹{currentPlan.planPrice}</span>
                    </div>
                  )}
                  {currentPlan.startDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-gray-300">Started:</span>
                      <span className="text-lg font-black text-blue-400 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        {currentPlan.startDate}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Profile Details Card */}
            <Card className="bold-card mb-8">
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-black text-white">
                    Account Details
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-primary hover:text-primary/80 hover:bg-primary/10"
                  >
                    {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="parentName" className="text-lg font-black text-white flex items-center">
                    <User className="w-5 h-5 mr-3 text-primary" />
                    Parent/Guardian Name
                  </Label>
                  <Input
                    id="parentName"
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="bg-background/50 border-2 border-primary/20 focus:border-primary text-white font-black text-lg h-12"
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="childName" className="text-lg font-black text-white flex items-center">
                    <User className="w-5 h-5 mr-3 text-secondary" />
                    Child's Name
                  </Label>
                  <Input
                    id="childName"
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="bg-background/50 border-2 border-primary/20 focus:border-primary text-white font-black text-lg h-12"
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-lg font-black text-white flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-accent" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50 border-2 border-primary/20 focus:border-primary text-white font-black text-lg h-12"
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-lg font-black text-white flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-secondary" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-background/50 border-2 border-primary/20 focus:border-primary text-white font-black text-lg h-12"
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-lg font-black text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-accent" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-background/50 border-2 border-primary/20 focus:border-primary text-white font-black text-lg h-12"
                    disabled={!isEditing}
                  />
                </div>
                
                {isEditing && (
                  <Button
                    onClick={handleSave}
                    className="w-full bold-button py-4 rounded-xl text-lg font-black"
                  >
                    Save Changes ✨
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Document Verification Section - Now positioned after profile details */}
            <DocumentVerification onVerificationComplete={handleVerificationComplete} />

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-2 border-destructive/50 text-destructive hover:bg-destructive/10 font-black py-4 rounded-xl text-lg"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
            
            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-lg font-black text-white opacity-80">Made with 💜 for amazing families</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="pb-32">
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
              { id: 'therapist', icon: UserCheck, label: 'Therapist' },
              { id: 'medicine', icon: Pill, label: 'Medicine' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 font-black ${
                  activeTab === tab.id
                    ? 'bold-button shadow-2xl scale-110'
                    : 'text-white hover:text-white hover:scale-105'
                }`}
              >
                <tab.icon className="w-8 h-8 mb-2" />
                <span className="text-base font-black tracking-wide">{tab.label}</span>
              </button>
            ))}
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 font-black ${
                activeTab === 'profile'
                  ? 'bold-button shadow-2xl scale-110'
                  : 'text-white hover:text-white hover:scale-105'
              }`}
            >
              <User className="w-8 h-8 mb-2" />
              <span className="text-base font-black tracking-wide">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
