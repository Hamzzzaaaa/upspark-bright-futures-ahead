import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Edit, Save, LogOut, Home, Activity, TrendingUp, UserCheck, Pill, Camera, Star, Calendar } from 'lucide-react';
import ActivitiesZone from '@/components/ActivitiesZone';
import TherapistBooking from '@/components/TherapistBooking';
import MedicineDelivery from '@/components/MedicineDelivery';
import DocumentVerification from '@/components/DocumentVerification';
import UpSparkLogo from '@/components/UpSparkLogo';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedPlan, setSelectedPlan] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  
  // User data from database
  const [userData, setUserData] = useState({
    parentName: '',
    childName: '',
    email: '',
    phone: '',
    address: '',
    profileImage: ''
  });
  
  // Current plan information from database
  const [currentPlan, setCurrentPlan] = useState({
    therapistName: '',
    planName: '',
    planPrice: '',
    startDate: ''
  });

  // Progress data
  const therapistProgress = 75; // 12/16 sessions = 75%
  const activitiesProgress = 85; // 85% activities done
  const overallDevelopment = Math.round((therapistProgress + activitiesProgress) / 2); // Average of both

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);

      // Load application data
      const { data: applicationData, error: appError } = await supabase
        .from('user_applications')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (applicationData && !appError) {
        setUserData({
          parentName: applicationData.parent_name || '',
          childName: applicationData.child_name || '',
          email: applicationData.parent_email || user.email || '',
          phone: applicationData.parent_phone || '',
          address: applicationData.address || '',
          profileImage: '' // Will be handled separately if needed
        });
      } else {
        // Fallback to user metadata if no application data
        setUserData({
          parentName: user.user_metadata?.parent_name || '',
          childName: user.user_metadata?.child_name || '',
          email: user.email || '',
          phone: '',
          address: '',
          profileImage: ''
        });
      }

      // Load booking data
      const { data: bookingData, error: bookingError } = await supabase
        .from('user_bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (bookingData && !bookingError) {
        setCurrentPlan({
          therapistName: bookingData.therapist_name || '',
          planName: bookingData.plan_name || '',
          planPrice: bookingData.plan_price || '',
          startDate: bookingData.booking_date || ''
        });
      }

      console.log('Loaded user data from database');
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      // Update application data
      const { error } = await supabase
        .from('user_applications')
        .upsert({
          user_id: user.id,
          parent_name: userData.parentName,
          child_name: userData.childName,
          parent_email: userData.email,
          parent_phone: userData.phone,
          address: userData.address
        }, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error saving profile:', error);
        toast.error('Failed to save profile changes');
        return;
      }

      setIsEditing(false);
      toast.success('Profile updated successfully!');
      console.log('Profile updated in database');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile changes');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out!');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out. Please try again.');
    }
  };

  const handlePlanSelected = (planDays: number) => {
    setSelectedPlan(planDays);
    setActiveTab('activities'); // Switch to activities after booking
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUserData(prev => ({ ...prev, profileImage: imageUrl }));
        if (!isEditing) {
          // Save immediately if not in editing mode
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
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl font-bold">Loading your profile...</div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Welcome Header with Logo */}
            <div className="bold-card p-8 rounded-3xl text-center">
              <UpSparkLogo size="medium" className="mb-6" />
              <h1 className="text-5xl mb-4 font-black text-white">Welcome to UpSpark!</h1>
              <p className="text-3xl font-black text-white">Let's make today amazing for {userData.childName} ✨</p>
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
                  <div className="text-4xl font-black text-white mb-2">12/16</div>
                  <div className="text-xl font-black text-white mb-1">Therapist Sessions</div>
                  <div className="text-lg font-bold text-purple-300">{therapistProgress}% Complete</div>
                </CardContent>
              </Card>

              {/* Activities Completed - Clickable */}
              <Card 
                className="bold-card cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => setActiveTab('activities')}
              >
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <div className="text-4xl font-black text-white mb-2">{activitiesProgress}%</div>
                  <div className="text-xl font-black text-white mb-1">Activities Done</div>
                  <div className="text-lg font-bold text-green-300">Great Progress!</div>
                </CardContent>
              </Card>

              {/* Development Progress - Calculated from above */}
              <Card className="bold-card sm:col-span-2">
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <div className="text-4xl font-black text-white mb-2">{overallDevelopment}%</div>
                  <div className="text-xl font-black text-white mb-1">Overall Development</div>
                  <div className="text-lg font-bold text-yellow-300">Excellent Progress This Month</div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'activities':
        return <ActivitiesZone childName={userData.childName} selectedPlan={selectedPlan} />;
      case 'therapist':
        return <TherapistBooking onPlanSelected={handlePlanSelected} />;
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
                  <AvatarImage src={userData.profileImage} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-3xl font-black">
                    {userData.parentName.split(' ').map(n => n[0]).join('')}
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
                    value={userData.parentName}
                    onChange={(e) => setUserData(prev => ({ ...prev, parentName: e.target.value }))}
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
                    value={userData.childName}
                    onChange={(e) => setUserData(prev => ({ ...prev, childName: e.target.value }))}
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
                    value={userData.email}
                    onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
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
                    value={userData.phone}
                    onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
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
                    value={userData.address}
                    onChange={(e) => setUserData(prev => ({ ...prev, address: e.target.value }))}
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

            {/* Document Verification Section */}
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
      <div className="pb-24 sm:pb-28 md:pb-32">
        <div className="p-4 sm:p-6 max-w-md mx-auto">
          {renderActiveTab()}
        </div>
      </div>

      {/* Bottom Navigation - Responsive */}
      <div className="fixed bottom-0 left-0 right-0 bold-card border-t-4 border-primary safe-area-pb">
        <div className="max-w-md mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
          <div className="flex justify-around items-center">
            {[
              { id: 'dashboard', icon: Home, label: 'Home' },
              { id: 'activities', icon: Activity, label: 'Activities' },
              { id: 'therapist', icon: UserCheck, label: 'Therapist' },
              { id: 'medicine', icon: Pill, label: 'Medicine' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 sm:py-3 px-2 sm:px-3 md:px-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-black min-w-0 ${
                  activeTab === tab.id
                    ? 'bold-button shadow-2xl scale-105 sm:scale-110'
                    : 'text-white hover:text-white hover:scale-105'
                }`}
              >
                <tab.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm md:text-base font-black tracking-wide truncate">{tab.label}</span>
              </button>
            ))}
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center py-2 sm:py-3 px-2 sm:px-3 md:px-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-black min-w-0 ${
                activeTab === 'profile'
                  ? 'bold-button shadow-2xl scale-105 sm:scale-110'
                  : 'text-white hover:text-white hover:scale-105'
              }`}
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm md:text-base font-black tracking-wide truncate">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
