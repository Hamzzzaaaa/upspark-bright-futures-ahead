
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Star, Calendar, Clock } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  duration: string;
  sessions: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  features: string[];
  description: string;
}

const PlanSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  
  const { therapistName, specialization } = location.state || {};

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic Plan',
      duration: '1 Month',
      sessions: 8,
      price: 4999,
      features: [
        '8 therapy sessions',
        'Basic progress tracking',
        'Email support',
        'Session recordings'
      ],
      description: 'Perfect for getting started with therapy'
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      duration: '2 Months',
      sessions: 16,
      price: 8999,
      originalPrice: 9998,
      popular: true,
      features: [
        '16 therapy sessions',
        'Advanced progress tracking',
        'Priority support',
        'Session recordings',
        'Personalized exercises',
        'Family guidance sessions'
      ],
      description: 'Most popular choice for consistent progress'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      duration: '3 Months',
      sessions: 24,
      price: 12999,
      originalPrice: 14997,
      features: [
        '24 therapy sessions',
        'Comprehensive progress tracking',
        '24/7 support',
        'Session recordings',
        'Personalized exercises',
        'Family guidance sessions',
        'Home visit options',
        'Monthly progress reports'
      ],
      description: 'Complete therapy solution with maximum support'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleBooking = () => {
    if (!selectedPlan) {
      alert('Please select a plan');
      return;
    }
    
    const plan = plans.find(p => p.id === selectedPlan);
    alert(`Booking confirmed!\nTherapist: ${therapistName}\nPlan: ${plan?.name}\nAmount: ₹${plan?.price}`);
    
    // Navigate to a success page or back to home
    navigate('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Title Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Select Your Therapy Plan
          </h1>
          {therapistName && (
            <p className="text-lg text-purple-300 font-bold">
              with {therapistName} - {specialization}
            </p>
          )}
          <p className="text-gray-300">
            Choose the plan that best fits your therapy needs
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-200 bold-card ${
                selectedPlan === plan.id
                  ? 'border-purple-400 shadow-lg scale-105'
                  : 'border-gray-600 hover:border-gray-500'
              } ${plan.popular ? 'ring-2 ring-purple-400' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-black text-white">
                  {plan.name}
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 font-bold">{plan.duration}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 font-bold">{plan.sessions} Sessions</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Pricing */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-3xl font-black text-white">
                      {formatPrice(plan.price)}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {formatPrice(plan.originalPrice)}
                      </span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <div className="text-sm text-green-400 font-bold">
                      Save {formatPrice(plan.originalPrice - plan.price)}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm text-center">
                  {plan.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {selectedPlan === plan.id && (
                  <div className="flex items-center justify-center space-x-2 bg-purple-500 text-white py-2 rounded-lg">
                    <Check className="w-4 h-4" />
                    <span className="font-bold">Selected</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Button */}
        <div className="text-center">
          <Button
            onClick={handleBooking}
            disabled={!selectedPlan}
            className="px-8 py-4 text-lg font-black bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            {selectedPlan 
              ? `Confirm Booking - ${formatPrice(plans.find(p => p.id === selectedPlan)?.price || 0)}`
              : 'Select a Plan to Continue'
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;
