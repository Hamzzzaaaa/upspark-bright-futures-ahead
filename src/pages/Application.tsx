
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Application = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    console.log('Application submitted with name:', name);
    
    toast({
      title: "Success!",
      description: "Your application has been submitted successfully.",
    });
    
    // Navigate to main app after submission
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-2 sm:p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center mb-2 sm:mb-4">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 sm:p-3 rounded-full">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-2">
            Quick Application
          </h1>
          <p className="text-sm sm:text-base text-gray-800 font-bold">
            Just enter your name to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Name Input Card */}
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-black text-gray-900">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-900 font-black text-sm sm:text-base">
                  Full Name *
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 border-gray-300 bg-white focus:border-purple-500 h-10 sm:h-12 text-sm sm:text-base font-bold text-gray-900 placeholder:text-gray-600"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-black py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-base"
            >
              Submit Application 🚀
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Application;
