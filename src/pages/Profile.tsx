
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Edit, Save, LogOut, Home, Activity, TrendingUp, UserCheck, Pill, Camera, Star, Calendar } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
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

  const handleNavigation = (path: string) => {
    if (path === 'dashboard') {
      navigate('/');
    } else {
      navigate(`/?tab=${path}`);
    }
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

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="pb-20">
        <div className="p-4 max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black mb-2 bold-text">Profile Settings</h1>
            <p className="bold-text opacity-90">Manage your account information</p>
          </div>

          {/* Profile Picture Section */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24 mx-auto border-4 border-primary/20">
                <AvatarImage src={profileImage} alt="Profile" />
                <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white text-2xl font-black">
                  {parentName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-white p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-105">
                <Camera className="w-4 h-4" />
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
            <Card className="bold-card mb-6 bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/30">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl card-text flex items-center justify-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Therapist:</span>
                  <span className="text-white font-black">{currentPlan.therapistName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Plan:</span>
                  <span className="text-green-400 font-black">{currentPlan.planName}</span>
                </div>
                {currentPlan.planPrice && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Price:</span>
                    <span className="text-yellow-400 font-black">₹{currentPlan.planPrice}</span>
                  </div>
                )}
                {currentPlan.startDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Started:</span>
                    <span className="text-blue-400 font-black flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {currentPlan.startDate}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Profile Details Card */}
          <Card className="bold-card mb-6">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl card-text">
                  Account Details
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-primary hover:text-primary/80 hover:bg-primary/10"
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentName" className="card-text flex items-center">
                  <User className="w-4 h-4 mr-2 text-primary" />
                  Parent/Guardian Name
                </Label>
                <Input
                  id="parentName"
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="bg-background/50 border-2 border-primary/20 focus:border-primary text-white font-black"
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="childName" className="card-text flex items-center">
                  <User className="w-4 h-4 mr-2 text-secondary" />
                  Child's Name
                </Label>
                <Input
                  id="childName"
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="bg-background/50 border-2 border-primary/20 focus:border-primary text-white font-black"
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="card-text flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-accent" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-2 border-primary/20 focus:border-primary text-white font-black"
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="card-text flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-secondary" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-background/50 border-2 border-primary/20 focus:border-primary text-white font-black"
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="card-text flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-accent" />
                  Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-background/50 border-2 border-primary/20 focus:border-primary text-white font-black"
                  disabled={!isEditing}
                />
              </div>
              
              {isEditing && (
                <Button
                  onClick={handleSave}
                  className="w-full bold-button py-3 rounded-xl"
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
            className="w-full border-2 border-destructive/50 text-destructive hover:bg-destructive/10 font-black py-3 rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          
          {/* Footer */}
          <div className="text-center mt-6">
            <p className="bold-text opacity-80 text-sm">Made with 💜 for amazing families</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm shadow-lg border-t border-primary/20">
        <div className="max-w-md mx-auto px-4 py-2">
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
                onClick={() => handleNavigation(tab.id)}
                className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <tab.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-black">{tab.label}</span>
              </button>
            ))}
            <button className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105">
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs font-black">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
