
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Check, Star, Clock, Users, ArrowLeft } from 'lucide-react';

const PlanSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  
  const { therapistName, specialization, experience, therapistPhone, therapistImage } = location.state || {};

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 4999,
      duration: '1 Month',
      sessions: '4 Sessions',
      features: [
        '1 Session per week',
        'Basic progress tracking',
        'Email support',
        'Resource materials'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: 8999,
      duration: '2 Months',
      sessions: '10 Sessions',
      features: [
        '5 Sessions per month',
        'Advanced progress tracking',
        'Priority email support',
        'Video session recordings',
        'Personalized exercise plans'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 12999,
      duration: '3 Months',
      sessions: '18 Sessions',
      features: [
        '6 Sessions per month',
        'Comprehensive progress tracking',
        '24/7 chat support',
        'Video session recordings',
        'Personalized exercise plans',
        'Family counseling sessions',
        'Home exercise equipment'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleProceedToBooking = () => {
    if (!selectedPlan) return;
    
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    // Save booking information to localStorage
    localStorage.setItem('bookedTherapistName', therapistName || '');
    localStorage.setItem('bookedPlanName', plan.name);
    localStorage.setItem('bookedPlanPrice', plan.price.toString());
    localStorage.setItem('bookingDate', new Date().toLocaleDateString());
    
    navigate('/booking-confirmation', {
      state: {
        therapistName,
        specialization,
        planName: plan.name,
        price: plan.price,
        therapistPhone,
        therapistImage
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Therapist Details
        </Button>

        {/* Therapist Info Header */}
        <Card className="bold-card mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={therapistImage} alt={therapistName} />
                <AvatarFallback className="bg-purple-500 text-white font-bold text-xl">
                  {therapistName?.split(' ').map(n => n[0]).join('') || 'DR'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-black text-white mb-2">{therapistName}</h1>
                <p className="text-purple-300 font-bold text-lg">{specialization}</p>
                <p className="text-gray-300">{experience} years of experience</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plans Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-4">Choose Your Plan</h2>
          <p className="text-gray-300 text-lg">Select the perfect plan for your therapy journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedPlan === plan.id 
                  ? 'ring-4 ring-green-500 bg-gradient-to-br from-green-900/50 to-blue-900/50' 
                  : 'bold-card hover:ring-2 hover:ring-purple-500'
              } ${plan.popular ? 'border-yellow-500 border-2' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-black flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-black text-white">{plan.name}</CardTitle>
                <div className="text-4xl font-black text-green-400 mb-2">
                  ₹{plan.price.toLocaleString('en-IN')}
                </div>
                <p className="text-gray-300 font-bold">{plan.duration}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center text-blue-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {plan.sessions}
                  </div>
                  <div className="flex items-center text-purple-400">
                    <Users className="w-4 h-4 mr-1" />
                    1-on-1
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {selectedPlan === plan.id && (
                  <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <p className="text-green-400 font-bold text-center flex items-center justify-center">
                      <Check className="w-5 h-5 mr-2" />
                      Selected Plan
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Proceed Button */}
        <div className="text-center">
          <Button
            onClick={handleProceedToBooking}
            disabled={!selectedPlan}
            className={`px-8 py-4 text-lg font-black rounded-xl transition-all duration-200 ${
              selectedPlan
                ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {selectedPlan ? 'Confirm Booking' : 'Select a Plan'}
          </Button>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            💰 All plans include GST • 🔒 Secure payment • 📞 24/7 support
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
