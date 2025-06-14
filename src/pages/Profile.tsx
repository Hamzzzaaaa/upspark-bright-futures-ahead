import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Edit, Save, LogOut, Home, Activity, TrendingUp, UserCheck, Pill, Camera, Star, Calendar, Upload, CheckCircle } from 'lucide-react';
import ActivitiesZone from '@/components/ActivitiesZone';
import TherapistBooking from '@/components/TherapistBooking';
import MedicineDelivery from '@/components/MedicineDelivery';
import UpSparkLogo from '@/components/UpSparkLogo';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedPlan, setSelectedPlan] = useState(30);
  
  // Load data from localStorage (application form and any saved profile data)
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState<string>('');
  
  // Prescription verification state
  const [isVerified, setIsVerified] = useState(false);
  const [prescriptionImage, setPrescriptionImage] = useState<string>('');
  const [extractedMedicines, setExtractedMedicines] = useState<string[]>([]);
  
  // Current plan information
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
    // Load application data from localStorage
    const savedChildName = localStorage.getItem('childName') || '';
    const savedParentName = localStorage.getItem('parentName') || 'Sarah Johnson';
    const savedEmail = localStorage.getItem('parentEmail') || 'sarah.johnson@email.com';
    const savedPhone = localStorage.getItem('parentPhone') || '+1 (555) 123-4567';
    const savedAddress = localStorage.getItem('address') || '123 Main St, Anytown, USA';
    const savedProfileImage = localStorage.getItem('profileImage') || '';
    
    // Load verification status and prescription data
    const savedIsVerified = localStorage.getItem('isVerified') === 'true';
    const savedPrescriptionImage = localStorage.getItem('prescriptionImage') || '';
    const savedExtractedMedicines = JSON.parse(localStorage.getItem('extractedMedicines') || '[]');
    
    // Load current booking information
    const savedTherapistName = localStorage.getItem('bookedTherapistName') || '';
    const savedPlanName = localStorage.getItem('bookedPlanName') || '';
    const savedPlanPrice = localStorage.getItem('bookedPlanPrice') || '';
    const savedStartDate = localStorage.getItem('bookingDate') || '';
    
    setChildName(savedChildName);
    setParentName(savedParentName);
    setEmail(savedEmail);
    setPhone(savedPhone);
    setAddress(savedAddress);
    setProfileImage(savedProfileImage);
    setIsVerified(savedIsVerified);
    setPrescriptionImage(savedPrescriptionImage);
    setExtractedMedicines(savedExtractedMedicines);
    
    setCurrentPlan({
      therapistName: savedTherapistName,
      planName: savedPlanName,
      planPrice: savedPlanPrice,
      startDate: savedStartDate
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

  const handlePrescriptionUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setPrescriptionImage(imageUrl);
        
        // Mock prescription analysis - extract medicine names
        const mockMedicines = ['Vitamin D3', 'Omega-3 Supplements', 'Iron Tablets', 'Calcium Supplements'];
        setExtractedMedicines(mockMedicines);
        setIsVerified(true);
        
        // Save to localStorage
        localStorage.setItem('prescriptionImage', imageUrl);
        localStorage.setItem('extractedMedicines', JSON.stringify(mockMedicines));
        localStorage.setItem('isVerified', 'true');
        
        console.log('Prescription uploaded and verified');
      };
      reader.readAsDataURL(file);
    }
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
        return <ActivitiesZone childName={childName} selectedPlan={selectedPlan} />;
      case 'therapist':
        return <TherapistBooking onPlanSelected={handlePlanSelected} />;
      case 'medicine':
        return <MedicineDelivery isVerified={isVerified} extractedMedicines={extractedMedicines} />;
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
                {isVerified && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white font-black flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Verified
                    </Badge>
                  </div>
                )}
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

            {/* Prescription Verification Section */}
            <Card className="bold-card mb-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-black text-white flex items-center justify-center">
                  <Pill className="w-6 h-6 mr-3 text-blue-400" />
                  Medical Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isVerified ? (
                  <div className="text-center space-y-4">
                    <p className="text-lg font-bold text-gray-300">Upload your prescription to verify your profile</p>
                    <label className="cursor-pointer">
                      <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-blue-400 transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-bold text-gray-400">Click to upload prescription (JPEG)</p>
                        <p className="text-sm font-bold text-gray-500 mt-2">Supported formats: JPEG, JPG</p>
                      </div>
                      <input
                        type="file"
                        accept=".jpeg,.jpg"
                        onChange={handlePrescriptionUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <CheckCircle className="w-6 h-6" />
                      <span className="text-lg font-black">Profile Verified!</span>
                    </div>
                    {prescriptionImage && (
                      <div className="text-center">
                        <img 
                          src={prescriptionImage} 
                          alt="Uploaded prescription" 
                          className="max-w-xs mx-auto rounded-xl border-2 border-green-400"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <p className="text-lg font-black text-white">Extracted Medicines:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {extractedMedicines.map((medicine, index) => (
                          <Badge key={index} className="bg-blue-500 text-white font-bold">
                            {medicine}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

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
