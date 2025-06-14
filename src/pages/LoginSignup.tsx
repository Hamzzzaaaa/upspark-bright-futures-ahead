
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-2xl">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
            Welcome to UpSpark!
          </h1>
          <p className="text-xl text-gray-200 font-bold">
            Supporting every child's journey ✨
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-2 border-gray-600 shadow-2xl bg-gray-800 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-black text-white mb-4">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <div className="flex justify-center space-x-3 mt-3">
              <Heart className="w-6 h-6 text-pink-400" />
              <Star className="w-6 h-6 text-yellow-400" />
              <Heart className="w-6 h-6 text-purple-400" />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div className="space-y-3">
                    <Label htmlFor="parentName" className="text-white font-bold text-lg">
                      Parent/Guardian Name
                    </Label>
                    <Input
                      id="parentName"
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="childName" className="text-white font-bold text-lg">
                      Child's Name
                    </Label>
                    <Input
                      id="childName"
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                      placeholder="Enter child's name"
                      required
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-white font-bold text-lg">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="password" className="text-white font-bold text-lg">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              {!isLogin && (
                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-white font-bold text-lg">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black py-4 rounded-lg h-16 text-xl shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {isLogin ? 'Sign In 🚀' : 'Create Account 🌟'}
              </Button>
            </form>
            
            {/* Toggle between login/signup */}
            <div className="text-center pt-6 border-t-2 border-gray-600">
              <p className="text-gray-200 mb-4 font-bold text-lg">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 hover:text-blue-300 font-bold text-lg hover:bg-gray-700 px-6 py-3"
              >
                {isLogin ? 'Sign Up Here!' : 'Sign In Here!'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-8 text-gray-300 text-lg">
          <p className="font-bold">Made with 💜 for amazing families</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
