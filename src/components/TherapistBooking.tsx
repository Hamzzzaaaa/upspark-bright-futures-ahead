import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck, Clock, Calendar } from 'lucide-react';

interface Therapist {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  available: boolean;
  image: string;
}

interface TherapistBookingProps {
  onPlanSelected?: (planDays: number) => void;
}

const TherapistBooking = ({ onPlanSelected }: TherapistBookingProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedTherapist, setSelectedTherapist] = useState<string>('');

  const therapists: Therapist[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Speech Therapy',
      rating: 4.9,
      experience: '8 years',
      available: true,
      image: '👩‍⚕️'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Behavioral Therapy',
      rating: 4.8,
      experience: '6 years',
      available: true,
      image: '👨‍⚕️'
    },
    {
      id: '3',
      name: 'Dr. Emma Wilson',
      specialization: 'Occupational Therapy',
      rating: 4.9,
      experience: '10 years',
      available: false,
      image: '👩‍⚕️'
    }
  ];

  const plans = [
    {
      id: '30',
      duration: '30 Days',
      price: '$299',
      sessions: '8 sessions',
      color: 'from-green-400 to-teal-500',
      popular: false
    },
    {
      id: '60',
      duration: '60 Days',
      price: '$549',
      sessions: '16 sessions',
      color: 'from-blue-400 to-purple-500',
      popular: true
    },
    {
      id: '90',
      duration: '90 Days',
      price: '$799',
      sessions: '24 sessions',
      color: 'from-purple-400 to-pink-500',
      popular: false
    }
  ];

  const handleBooking = () => {
    if (selectedPlan && selectedTherapist) {
      const planDays = parseInt(selectedPlan);
      alert(`Booking confirmed! ${planDays}-day program with therapist ID: ${selectedTherapist}`);
      
      // Call the callback to update the selected plan
      if (onPlanSelected) {
        onPlanSelected(planDays);
      }
    } else {
      alert('Please select both a plan and a therapist');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Book a Therapist 👩‍⚕️
        </h2>
        <p className="text-gray-600">Choose a plan and therapist for personalized care</p>
      </div>

      {/* Plan Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Select Your Plan</h3>
        <div className="space-y-3">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`border-2 cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id 
                  ? 'border-purple-400 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center`}>
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{plan.duration}</h4>
                      <p className="text-sm text-gray-600">{plan.sessions}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{plan.price}</div>
                    {plan.popular && (
                      <span className="text-xs bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full font-medium">
                        Most Popular
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Therapist Selection */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Choose Your Therapist</h3>
        <div className="space-y-3">
          {therapists.map((therapist) => (
            <Card 
              key={therapist.id}
              className={`border-2 cursor-pointer transition-all duration-200 ${
                selectedTherapist === therapist.id 
                  ? 'border-purple-400 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${!therapist.available ? 'opacity-50' : ''}`}
              onClick={() => therapist.available && setSelectedTherapist(therapist.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{therapist.image}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{therapist.name}</h4>
                    <p className="text-sm text-gray-600">{therapist.specialization}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-yellow-600">⭐ {therapist.rating}</span>
                      <span className="text-sm text-gray-500">{therapist.experience}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {therapist.available ? (
                      <span className="text-green-600 text-sm font-medium">Available</span>
                    ) : (
                      <span className="text-red-600 text-sm font-medium">Busy</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Button */}
      <Button
        onClick={handleBooking}
        disabled={!selectedPlan || !selectedTherapist}
        className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 disabled:opacity-50"
      >
        {selectedPlan && selectedTherapist 
          ? '🎉 Confirm Booking & Start Activities' 
          : '📋 Select Plan & Therapist'
        }
      </Button>
    </div>
  );
};

export default TherapistBooking;
