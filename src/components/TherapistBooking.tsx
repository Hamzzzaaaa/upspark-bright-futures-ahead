
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck, Clock, Calendar, MapPin, Phone } from 'lucide-react';

interface Therapist {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  available: boolean;
  image: string;
  area: string;
  pincode: string;
  phone: string;
  distance: string;
}

interface TherapistBookingProps {
  onPlanSelected?: (planDays: number) => void;
}

const TherapistBooking = ({ onPlanSelected }: TherapistBookingProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedTherapist, setSelectedTherapist] = useState<string>('');

  const therapists: Therapist[] = [
    // Speech Therapists
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Speech Therapy',
      rating: 4.9,
      experience: '8 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Banjara Hills',
      pincode: '500034',
      phone: '+91 98765 43210',
      distance: '2.5 km'
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      specialization: 'Speech Therapy',
      rating: 4.7,
      experience: '5 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Jubilee Hills',
      pincode: '500033',
      phone: '+91 98765 43211',
      distance: '3.2 km'
    },
    {
      id: '3',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Speech Therapy',
      rating: 4.8,
      experience: '10 years',
      available: false,
      image: '👨‍⚕️',
      area: 'Madhapur',
      pincode: '500081',
      phone: '+91 98765 43212',
      distance: '5.1 km'
    },
    // Behavioral Therapists
    {
      id: '4',
      name: 'Dr. Michael Chen',
      specialization: 'Behavioral Therapy',
      rating: 4.8,
      experience: '6 years',
      available: true,
      image: '👨‍⚕️',
      area: 'HITEC City',
      pincode: '500081',
      phone: '+91 98765 43213',
      distance: '4.8 km'
    },
    {
      id: '5',
      name: 'Dr. Kavitha Reddy',
      specialization: 'Behavioral Therapy',
      rating: 4.9,
      experience: '7 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Kondapur',
      pincode: '500084',
      phone: '+91 98765 43214',
      distance: '6.3 km'
    },
    {
      id: '6',
      name: 'Dr. Arun Patel',
      specialization: 'Behavioral Therapy',
      rating: 4.6,
      experience: '4 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Kukatpally',
      pincode: '500072',
      phone: '+91 98765 43215',
      distance: '8.2 km'
    },
    // Occupational Therapists
    {
      id: '7',
      name: 'Dr. Emma Wilson',
      specialization: 'Occupational Therapy',
      rating: 4.9,
      experience: '10 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Gachibowli',
      pincode: '500032',
      phone: '+91 98765 43216',
      distance: '7.1 km'
    },
    {
      id: '8',
      name: 'Dr. Suresh Babu',
      specialization: 'Occupational Therapy',
      rating: 4.7,
      experience: '8 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Begumpet',
      pincode: '500016',
      phone: '+91 98765 43217',
      distance: '4.5 km'
    },
    {
      id: '9',
      name: 'Dr. Meera Singh',
      specialization: 'Occupational Therapy',
      rating: 4.8,
      experience: '6 years',
      available: false,
      image: '👩‍⚕️',
      area: 'Secunderabad',
      pincode: '500003',
      phone: '+91 98765 43218',
      distance: '9.8 km'
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

  // Group therapists by specialization
  const groupedTherapists = {
    'Speech Therapy': therapists.filter(t => t.specialization === 'Speech Therapy'),
    'Behavioral Therapy': therapists.filter(t => t.specialization === 'Behavioral Therapy'),
    'Occupational Therapy': therapists.filter(t => t.specialization === 'Occupational Therapy')
  };

  const handleBooking = () => {
    if (selectedPlan && selectedTherapist) {
      const planDays = parseInt(selectedPlan);
      const therapist = therapists.find(t => t.id === selectedTherapist);
      alert(`Booking confirmed! ${planDays}-day program with ${therapist?.name} in ${therapist?.area}`);
      
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
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
          Find Therapists Near You 📍
        </h2>
        <p className="text-lg sm:text-xl font-bold text-white">
          Hyderabad - Choose from specialists in your area
        </p>
      </div>

      {/* Plan Selection */}
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-white">Select Your Plan</h3>
        <div className="space-y-3">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`border-2 cursor-pointer transition-all duration-200 bold-card ${
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
                      <h4 className="font-black text-white text-lg sm:text-xl">{plan.duration}</h4>
                      <p className="text-base sm:text-lg font-bold text-white">{plan.sessions}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-black text-white">{plan.price}</div>
                    {plan.popular && (
                      <span className="text-xs bg-yellow-400 text-yellow-800 px-2 py-1 rounded-full font-black">
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

      {/* Therapist Selection by Specialization */}
      <div className="space-y-6">
        <h3 className="text-xl sm:text-2xl font-black text-white">Choose Your Therapist by Location</h3>
        
        {Object.entries(groupedTherapists).map(([specialization, specialists]) => (
          <div key={specialization} className="space-y-3">
            <h4 className="text-lg sm:text-xl font-black text-purple-300">{specialization} Specialists</h4>
            <div className="space-y-3">
              {specialists.map((therapist) => (
                <Card 
                  key={therapist.id}
                  className={`border-2 cursor-pointer transition-all duration-200 bold-card ${
                    selectedTherapist === therapist.id 
                      ? 'border-purple-400 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!therapist.available ? 'opacity-50' : ''}`}
                  onClick={() => therapist.available && setSelectedTherapist(therapist.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{therapist.image}</div>
                          <div>
                            <h4 className="font-black text-white text-lg">{therapist.name}</h4>
                            <p className="text-sm font-bold text-purple-300">{therapist.specialization}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {therapist.available ? (
                            <span className="text-green-400 text-sm font-black">Available</span>
                          ) : (
                            <span className="text-red-400 text-sm font-black">Busy</span>
                          )}
                        </div>
                      </div>

                      {/* Details Row */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-yellow-400 font-bold">⭐ {therapist.rating}</span>
                          <span className="text-white font-bold">{therapist.experience}</span>
                        </div>
                      </div>

                      {/* Location Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          <span className="text-white font-bold">{therapist.area}</span>
                          <span className="text-gray-300">|</span>
                          <span className="text-blue-300 font-bold">{therapist.pincode}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400 font-bold">{therapist.distance} away</span>
                        </div>
                      </div>

                      {/* Contact Row */}
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-green-400" />
                        <span className="text-green-300 font-bold">{therapist.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Button */}
      <Button
        onClick={handleBooking}
        disabled={!selectedPlan || !selectedTherapist}
        className="w-full py-4 text-lg font-black bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 disabled:opacity-50"
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
