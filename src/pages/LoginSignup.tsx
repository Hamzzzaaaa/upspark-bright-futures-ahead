
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Heart, Star } from 'lucide-react';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [childName, setChildName] = useState('');
  const [parentName, setParentName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!isLogin && (!childName || !parentName)) {
      alert('Please fill in all fields for signup');
      return;
    }
    
    // For now, just navigate to the main app
    // In a real app, this would handle authentication
    console.log(isLogin ? 'Logging in...' : 'Creating account...', { email, parentName, childName });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-full">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to UpSpark!
          </h1>
          <p className="text-gray-600">
            Supporting every child's journey ✨
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold text-gray-800">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <div className="flex justify-center space-x-2 mt-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <Star className="w-4 h-4 text-yellow-400" />
              <Heart className="w-4 h-4 text-purple-400" />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="parentName" className="text-gray-700 font-medium">
                      Parent/Guardian Name
                    </Label>
                    <Input
                      id="parentName"
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="border-2 border-gray-200 focus:border-purple-400"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="childName" className="text-gray-700 font-medium">
                      Child's Name
                    </Label>
                    <Input
                      id="childName"
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="border-2 border-gray-200 focus:border-purple-400"
                      placeholder="Enter child's name"
                      required
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-2 border-gray-200 focus:border-purple-400"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLogin ? 'Sign In 🚀' : 'Create Account 🌟'}
              </Button>
            </form>
            
            {/* Toggle between login/signup */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 mb-2">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                {isLogin ? 'Sign Up Here!' : 'Sign In Here!'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Made with 💜 for amazing families</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
