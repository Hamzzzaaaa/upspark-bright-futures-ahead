
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
    
    // For login, navigate to application form
    if (isLogin) {
      console.log('Logging in...', { email });
      navigate('/application');
    } else {
      // For signup, navigate to main app
      console.log('Creating account...', { email, parentName, childName });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="flex items-center justify-center mb-2 sm:mb-4">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 sm:p-3 rounded-full">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-2">
            Welcome to UpSpark!
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-bold">
            Supporting every child's journey ✨
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
          <CardHeader className="text-center pb-2 sm:pb-4 p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl font-black text-gray-800">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <div className="flex justify-center space-x-2 mt-2">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400" />
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="parentName" className="text-gray-700 font-black text-sm sm:text-base">
                      Parent/Guardian Name
                    </Label>
                    <Input
                      id="parentName"
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="childName" className="text-gray-700 font-black text-sm sm:text-base">
                      Child's Name
                    </Label>
                    <Input
                      id="childName"
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                      placeholder="Enter child's name"
                      required
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-black text-sm sm:text-base">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-black text-sm sm:text-base">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {!isLogin && (
                <div className="space-y-1 sm:space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-black text-sm sm:text-base">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-black py-2 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 h-10 sm:h-12 text-sm sm:text-base"
              >
                {isLogin ? 'Sign In 🚀' : 'Create Account 🌟'}
              </Button>
            </form>
            
            {/* Toggle between login/signup */}
            <div className="text-center pt-3 sm:pt-4 border-t border-gray-200">
              <p className="text-gray-600 mb-2 font-bold text-sm sm:text-base">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 hover:text-purple-700 font-black text-sm sm:text-base"
              >
                {isLogin ? 'Sign Up Here!' : 'Sign In Here!'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-4 sm:mt-6 text-gray-500 text-xs sm:text-sm">
          <p className="font-bold">Made with 💜 for amazing families</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
