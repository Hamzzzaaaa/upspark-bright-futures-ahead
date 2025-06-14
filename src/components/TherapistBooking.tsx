
import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Search } from 'lucide-react';

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
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const therapists: Therapist[] = [
    // Speech Therapists - 5 available
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

    // Behavioral Therapists - 5 available
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
      area: 'Kukatpally',
      pincode: '500072',
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
      area: 'Secunderabad',
      pincode: '500003',
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
      area: 'Ameerpet',
      pincode: '500016',
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
      area: 'Miyapur',
      pincode: '500049',
      phone: '+91 98765 43224',
      distance: '3.5 km'
    },

    // Occupational Therapists - 5 available
    {
      id: '21',
      name: 'Dr. Emma Wilson',
      specialization: 'Occupational Therapy',
      rating: 4.9,
      experience: '10 years',
      available: true,
      image: '👩‍⚕️',
      area: 'Begumpet',
      pincode: '500016',
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
      area: 'Kondapur',
      pincode: '500084',
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
      area: 'Jubilee Hills',
      pincode: '500033',
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
      area: 'Madhapur',
      pincode: '500081',
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
      area: 'Banjara Hills',
      pincode: '500034',
      phone: '+91 98765 43234',
      distance: '3.9 km'
    }
  ];

  // Filter therapists based on search query, pincode, and category
  const filteredTherapists = useMemo(() => {
    let filtered = therapists.filter(t => t.available);

    // Filter by search query (therapist type or name)
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

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(therapist => 
        therapist.specialization.toLowerCase().includes(categoryFilter.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, pincodeFilter, categoryFilter]);

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
              placeholder="Search therapist type or name..."
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
          <div className="sm:w-56">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="bg-card border-gray-600 text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="speech">Speech Therapy</SelectItem>
                <SelectItem value="behavioral">Behavioral Therapy</SelectItem>
                <SelectItem value="occupational">Occupational Therapy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || pincodeFilter || categoryFilter !== 'all') && (
        <div className="text-center">
          <p className="text-purple-300 font-bold">
            Found {filteredTherapists.length} therapist{filteredTherapists.length !== 1 ? 's' : ''} 
            {searchQuery && ` for "${searchQuery}"`}
            {pincodeFilter && ` in pincode "${pincodeFilter}"`}
            {categoryFilter !== 'all' && ` in ${categoryFilter} therapy`}
          </p>
        </div>
      )}

      {/* Therapist Grid */}
      <div className="space-y-6">        
        {filteredTherapists.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-300 text-lg">No therapists found matching your search criteria.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms, pincode, or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTherapists.map((therapist) => (
              <Card 
                key={therapist.id}
                className={`border-2 cursor-pointer transition-all duration-200 bold-card aspect-square ${
                  selectedTherapist === therapist.id 
                    ? 'border-purple-400 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTherapist(therapist.id)}
              >
                <CardContent className="p-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="text-3xl">{therapist.image}</div>
                      <span className="text-green-400 text-xs font-black">Available</span>
                    </div>

                    {/* Name and Specialization */}
                    <div>
                      <h4 className="font-black text-white text-sm">{therapist.name}</h4>
                      <p className="text-xs font-bold text-purple-300">{therapist.specialization}</p>
                    </div>

                    {/* Rating and Experience */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-yellow-400 font-bold">⭐ {therapist.rating}</span>
                      <span className="text-white font-bold">{therapist.experience}</span>
                    </div>

                    {/* Location */}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-blue-400" />
                        <span className="text-white font-bold text-xs">{therapist.area}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-blue-300 font-bold">{therapist.pincode}</span>
                        <span className="text-green-400 font-bold">{therapist.distance}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center space-x-1 mt-2">
                    <Phone className="w-3 h-3 text-green-400" />
                    <span className="text-green-300 font-bold text-xs">{therapist.phone}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
