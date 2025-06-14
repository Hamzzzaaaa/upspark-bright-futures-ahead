import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Search, Star, X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

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
  const [selectedForDetails, setSelectedForDetails] = useState<string>('');
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
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop&crop=face',
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
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=150&h=150&fit=crop&crop=face',
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

  const selectedTherapistForDetails = therapists.find(t => t.id === selectedForDetails);

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

      {/* Therapist Grid - 2 columns responsive */}
      <div className="space-y-6">        
        {filteredTherapists.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-300 text-lg">No therapists found matching your search criteria.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms, pincode, or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredTherapists.map((therapist) => (
              <Card 
                key={therapist.id}
                className={`border-2 cursor-pointer transition-all duration-200 bold-card ${
                  selectedTherapist === therapist.id 
                    ? 'border-purple-400 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedTherapist(therapist.id);
                  setSelectedForDetails(therapist.id);
                }}
              >
                <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                  {/* Profile Picture */}
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                    <AvatarImage src={therapist.image} alt={therapist.name} />
                    <AvatarFallback className="bg-purple-500 text-white font-bold">
                      {therapist.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  {/* Doctor Name */}
                  <div>
                    <h4 className="font-black text-white text-sm sm:text-base">{therapist.name}</h4>
                    <p className="text-xs sm:text-sm font-bold text-purple-300">{therapist.specialization}</p>
                  </div>

                  {/* Click for details hint */}
                  <p className="text-xs text-gray-400">Click for details</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Detailed Information Modal */}
      {selectedTherapistForDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bold-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-black text-white">Therapist Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedForDetails('')}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Profile Picture */}
                <div className="flex justify-center">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={selectedTherapistForDetails.image} alt={selectedTherapistForDetails.name} />
                    <AvatarFallback className="bg-purple-500 text-white font-bold text-lg">
                      {selectedTherapistForDetails.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Details */}
                <div className="text-center space-y-2">
                  <h4 className="font-black text-white text-lg">{selectedTherapistForDetails.name}</h4>
                  <p className="text-purple-300 font-bold">{selectedTherapistForDetails.specialization}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-bold">{selectedTherapistForDetails.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Experience:</span>
                    <span className="text-white font-bold">{selectedTherapistForDetails.experience}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Location:</span>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-blue-400" />
                        <span className="text-white font-bold text-sm">{selectedTherapistForDetails.area}</span>
                      </div>
                      <span className="text-blue-300 font-bold text-sm">{selectedTherapistForDetails.pincode}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Distance:</span>
                    <span className="text-green-400 font-bold">{selectedTherapistForDetails.distance}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Phone:</span>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3 text-green-400" />
                      <span className="text-green-300 font-bold text-sm">{selectedTherapistForDetails.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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
