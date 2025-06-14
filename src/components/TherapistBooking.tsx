
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserCheck, Clock, Calendar, MapPin, Phone, Search } from 'lucide-react';

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
  const [selectedTherapist, setSelectedTherapist] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pincodeFilter, setPincodeFilter] = useState<string>('');

  const therapists: Therapist[] = [
    // Speech Therapists - 10 available
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
      available: true,
      image: '👨‍⚕️',
      area: 'Madhapur',
      pincode: '500081',
      phone: '+91 98765 43212',
      distance: '5.1 km'
    },
    {
      id: '4',
      name: 'Dr. Anita Reddy',
      specialization: 'Speech Therapy',
      rating: 4.6,
      experience: '6 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Kondapur',
      pincode: '500084',
      phone: '+91 98765 43213',
      distance: '4.2 km'
    },
    {
      id: '5',
      name: 'Dr. Vikram Singh',
      specialization: 'Speech Therapy',
      rating: 4.8,
      experience: '7 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Gachibowli',
      pincode: '500032',
      phone: '+91 98765 43214',
      distance: '6.8 km'
    },
    {
      id: '6',
      name: 'Dr. Meera Patel',
      specialization: 'Speech Therapy',
      rating: 4.7,
      experience: '4 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Begumpet',
      pincode: '500016',
      phone: '+91 98765 43215',
      distance: '3.7 km'
    },
    {
      id: '7',
      name: 'Dr. Suresh Babu',
      specialization: 'Speech Therapy',
      rating: 4.9,
      experience: '9 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Kukatpally',
      pincode: '500072',
      phone: '+91 98765 43216',
      distance: '8.1 km'
    },
    {
      id: '8',
      name: 'Dr. Kavya Rao',
      specialization: 'Speech Therapy',
      rating: 4.5,
      experience: '3 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Secunderabad',
      pincode: '500003',
      phone: '+91 98765 43217',
      distance: '7.9 km'
    },
    {
      id: '9',
      name: 'Dr. Ravi Chandra',
      specialization: 'Speech Therapy',
      rating: 4.8,
      experience: '11 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Ameerpet',
      pincode: '500016',
      phone: '+91 98765 43218',
      distance: '4.8 km'
    },
    {
      id: '10',
      name: 'Dr. Lakshmi Devi',
      specialization: 'Speech Therapy',
      rating: 4.6,
      experience: '5 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Miyapur',
      pincode: '500049',
      phone: '+91 98765 43219',
      distance: '9.2 km'
    },

    // Behavioral Therapists - 10 available
    {
      id: '11',
      name: 'Dr. Michael Chen',
      specialization: 'Behavioral Therapy',
      rating: 4.8,
      experience: '6 years',
      available: true,
      image: '👨‍⚕️',
      area: 'HITEC City',
      pincode: '500081',
      phone: '+91 98765 43220',
      distance: '4.8 km'
    },
    {
      id: '12',
      name: 'Dr. Kavitha Reddy',
      specialization: 'Behavioral Therapy',
      rating: 4.9,
      experience: '7 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Kondapur',
      pincode: '500084',
      phone: '+91 98765 43221',
      distance: '6.3 km'
    },
    {
      id: '13',
      name: 'Dr. Arun Patel',
      specialization: 'Behavioral Therapy',
      rating: 4.6,
      experience: '4 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Kukatpally',
      pincode: '500072',
      phone: '+91 98765 43222',
      distance: '8.2 km'
    },
    {
      id: '14',
      name: 'Dr. Neha Gupta',
      specialization: 'Behavioral Therapy',
      rating: 4.7,
      experience: '8 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Banjara Hills',
      pincode: '500034',
      phone: '+91 98765 43223',
      distance: '2.1 km'
    },
    {
      id: '15',
      name: 'Dr. Arjun Kumar',
      specialization: 'Behavioral Therapy',
      rating: 4.8,
      experience: '5 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Jubilee Hills',
      pincode: '500033',
      phone: '+91 98765 43224',
      distance: '3.5 km'
    },
    {
      id: '16',
      name: 'Dr. Swathi Nair',
      specialization: 'Behavioral Therapy',
      rating: 4.9,
      experience: '9 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Madhapur',
      pincode: '500081',
      phone: '+91 98765 43225',
      distance: '5.7 km'
    },
    {
      id: '17',
      name: 'Dr. Rohit Sharma',
      specialization: 'Behavioral Therapy',
      rating: 4.5,
      experience: '3 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Gachibowli',
      pincode: '500032',
      phone: '+91 98765 43226',
      distance: '7.1 km'
    },
    {
      id: '18',
      name: 'Dr. Pooja Mehta',
      specialization: 'Behavioral Therapy',
      rating: 4.7,
      experience: '6 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Begumpet',
      pincode: '500016',
      phone: '+91 98765 43227',
      distance: '4.3 km'
    },
    {
      id: '19',
      name: 'Dr. Vinay Reddy',
      specialization: 'Behavioral Therapy',
      rating: 4.8,
      experience: '10 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Secunderabad',
      pincode: '500003',
      phone: '+91 98765 43228',
      distance: '8.9 km'
    },
    {
      id: '20',
      name: 'Dr. Priyanka Joshi',
      specialization: 'Behavioral Therapy',
      rating: 4.6,
      experience: '4 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Ameerpet',
      pincode: '500016',
      phone: '+91 98765 43229',
      distance: '5.2 km'
    },

    // Occupational Therapists - 10 available
    {
      id: '21',
      name: 'Dr. Emma Wilson',
      specialization: 'Occupational Therapy',
      rating: 4.9,
      experience: '10 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Gachibowli',
      pincode: '500032',
      phone: '+91 98765 43230',
      distance: '7.1 km'
    },
    {
      id: '22',
      name: 'Dr. Suresh Babu',
      specialization: 'Occupational Therapy',
      rating: 4.7,
      experience: '8 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Begumpet',
      pincode: '500016',
      phone: '+91 98765 43231',
      distance: '4.5 km'
    },
    {
      id: '23',
      name: 'Dr. Meera Singh',
      specialization: 'Occupational Therapy',
      rating: 4.8,
      experience: '6 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Secunderabad',
      pincode: '500003',
      phone: '+91 98765 43232',
      distance: '9.8 km'
    },
    {
      id: '24',
      name: 'Dr. Kiran Kumar',
      specialization: 'Occupational Therapy',
      rating: 4.6,
      experience: '7 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Banjara Hills',
      pincode: '500034',
      phone: '+91 98765 43233',
      distance: '2.8 km'
    },
    {
      id: '25',
      name: 'Dr. Radhika Iyer',
      specialization: 'Occupational Therapy',
      rating: 4.8,
      experience: '5 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Jubilee Hills',
      pincode: '500033',
      phone: '+91 98765 43234',
      distance: '3.9 km'
    },
    {
      id: '26',
      name: 'Dr. Ashwin Rao',
      specialization: 'Occupational Therapy',
      rating: 4.7,
      experience: '9 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Madhapur',
      pincode: '500081',
      phone: '+91 98765 43235',
      distance: '5.4 km'
    },
    {
      id: '27',
      name: 'Dr. Divya Nair',
      specialization: 'Occupational Therapy',
      rating: 4.9,
      experience: '4 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Kondapur',
      pincode: '500084',
      phone: '+91 98765 43236',
      distance: '6.7 km'
    },
    {
      id: '28',
      name: 'Dr. Sanjay Verma',
      specialization: 'Occupational Therapy',
      rating: 4.5,
      experience: '11 years',
      available: true,
      image: '👨‍⚕️',
      area: 'HITEC City',
      pincode: '500081',
      phone: '+91 98765 43237',
      distance: '4.9 km'
    },
    {
      id: '29',
      name: 'Dr. Sneha Reddy',
      specialization: 'Occupational Therapy',
      rating: 4.8,
      experience: '6 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Kukatpally',
      pincode: '500072',
      phone: '+91 98765 43238',
      distance: '8.5 km'
    },
    {
      id: '30',
      name: 'Dr. Naveen Kumar',
      specialization: 'Occupational Therapy',
      rating: 4.6,
      experience: '3 years',
      available: true,
      image: '👨‍⚕️',
      area: 'Miyapur',
      pincode: '500049',
      phone: '+91 98765 43239',
      distance: '9.5 km'
    }
  ];

  // Filter therapists based on search query and pincode
  const filteredTherapists = useMemo(() => {
    let filtered = therapists.filter(t => t.available);

    // Filter by search query (therapist type)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(therapist => 
        therapist.specialization.toLowerCase().includes(query) ||
        therapist.name.toLowerCase().includes(query)
      );
    }

    // Filter by pincode
    if (pincodeFilter.trim()) {
      filtered = filtered.filter(therapist => 
        therapist.pincode.includes(pincodeFilter.trim())
      );
    }

    return filtered;
  }, [searchQuery, pincodeFilter]);

  // Group filtered therapists by specialization
  const groupedTherapists = useMemo(() => {
    const groups: Record<string, Therapist[]> = {};
    
    filteredTherapists.forEach(therapist => {
      if (!groups[therapist.specialization]) {
        groups[therapist.specialization] = [];
      }
      groups[therapist.specialization].push(therapist);
    });

    return groups;
  }, [filteredTherapists]);

  const handleBooking = () => {
    if (selectedTherapist) {
      const therapist = therapists.find(t => t.id === selectedTherapist);
      alert(`Booking confirmed with ${therapist?.name} in ${therapist?.area}!`);
      
      if (onPlanSelected) {
        onPlanSelected(30); // Default to 30 days
      }
    } else {
      alert('Please select a therapist');
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
          Hyderabad - Search by therapy type and pincode
        </p>
      </div>

      {/* Search Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search therapist type (e.g., speech therapist, behavioral therapy...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div className="sm:w-48">
            <Input
              type="text"
              placeholder="Enter pincode"
              value={pincodeFilter}
              onChange={(e) => setPincodeFilter(e.target.value)}
              className="bg-card border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || pincodeFilter) && (
        <div className="text-center">
          <p className="text-purple-300 font-bold">
            Found {filteredTherapists.length} therapist{filteredTherapists.length !== 1 ? 's' : ''} 
            {searchQuery && ` for "${searchQuery}"`}
            {pincodeFilter && ` in pincode "${pincodeFilter}"`}
          </p>
        </div>
      )}

      {/* Therapist Selection by Specialization */}
      <div className="space-y-6">        
        {Object.keys(groupedTherapists).length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-300 text-lg">No therapists found matching your search criteria.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms or pincode.</p>
          </div>
        ) : (
          Object.entries(groupedTherapists).map(([specialization, specialists]) => (
            <div key={specialization} className="space-y-3">
              <h4 className="text-lg sm:text-xl font-black text-purple-300">
                {specialization} Specialists ({specialists.length})
              </h4>
              <div className="space-y-3">
                {specialists.map((therapist) => (
                  <Card 
                    key={therapist.id}
                    className={`border-2 cursor-pointer transition-all duration-200 bold-card ${
                      selectedTherapist === therapist.id 
                        ? 'border-purple-400 shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTherapist(therapist.id)}
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
                            <span className="text-green-400 text-sm font-black">Available</span>
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
          ))
        )}
      </div>

      {/* Booking Button */}
      {filteredTherapists.length > 0 && (
        <Button
          onClick={handleBooking}
          disabled={!selectedTherapist}
          className="w-full py-4 text-lg font-black bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          {selectedTherapist 
            ? '🎉 Confirm Booking & Start Activities' 
            : '📋 Select a Therapist'
          }
        </Button>
      )}
    </div>
  );
};

export default TherapistBooking;
