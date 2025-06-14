import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Heart, Edit, Save, LogOut, Home, Activity, TrendingUp, UserCheck, Pill } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [parentName, setParentName] = useState('Sarah Johnson');
  const [childName, setChildName] = useState('Emma');
  const [email, setEmail] = useState('sarah.johnson@email.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [address, setAddress] = useState('123 Main St, Anytown, USA');

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a database
    console.log('Profile updated');
  };

  const handleLogout = () => {
    // Here you would clear any stored authentication
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    if (path === 'dashboard') {
      navigate('/');
    } else {
      // For now, navigate to home and let the tab switching handle it
      navigate(`/?tab=${path}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Main Content */}
      <div className="pb-20">
        <div className="p-4 max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile</h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur mb-6">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-800">
                  Account Details
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </Button>
              </div>
              <div className="flex justify-center space-x-2 mt-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <Heart className="w-4 h-4 text-purple-400" />
                <Heart className="w-4 h-4 text-yellow-400" />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentName" className="text-gray-700 font-medium flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-500" />
                  Parent/Guardian Name
                </Label>
                <Input
                  id="parentName"
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400"
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="childName" className="text-gray-700 font-medium flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-pink-500" />
                  Child's Name
                </Label>
                <Input
                  id="childName"
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400"
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400"
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-green-500" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400"
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-700 font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                  Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400"
                  disabled={!isEditing}
                />
              </div>
              
              {isEditing && (
                <Button
                  onClick={handleSave}
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
            className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 font-semibold py-3 rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          
          {/* Footer */}
          <div className="text-center mt-6 text-gray-500 text-sm">
            <p>Made with 💜 for amazing families</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
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
                className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 text-gray-500 hover:text-gray-700"
              >
                <tab.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
            <button
              className="flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-200 bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg scale-105"
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
