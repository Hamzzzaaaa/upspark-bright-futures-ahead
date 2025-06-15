
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pincodeFilter, setPincodeFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const therapists: Therapist[] = [
    // Speech Therapists - 12 therapists
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
    {
      id: '6',
      name: 'Dr. Kavya Nair',
      specialization: 'Speech Therapy',
      rating: 4.5,
      experience: '4 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
      area: 'Secunderabad',
      pincode: '500003',
      phone: '+91 98765 43215',
      distance: '8.1 km'
    },
    {
      id: '7',
      name: 'Dr. Ravi Teja',
      specialization: 'Speech Therapy',
      rating: 4.7,
      experience: '9 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face',
      area: 'Ameerpet',
      pincode: '500016',
      phone: '+91 98765 43216',
      distance: '3.7 km'
    },
    {
      id: '8',
      name: 'Dr. Deepika Rao',
      specialization: 'Speech Therapy',
      rating: 4.6,
      experience: '6 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1594824804732-ca8db7748dda?w=150&h=150&fit=crop&crop=face',
      area: 'Miyapur',
      pincode: '500049',
      phone: '+91 98765 43217',
      distance: '5.4 km'
    },
    {
      id: '9',
      name: 'Dr. Sanjay Gupta',
      specialization: 'Speech Therapy',
      rating: 4.9,
      experience: '12 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      area: 'Kukatpally',
      pincode: '500072',
      phone: '+91 98765 43218',
      distance: '7.2 km'
    },
    {
      id: '10',
      name: 'Dr. Pooja Jain',
      specialization: 'Speech Therapy',
      rating: 4.4,
      experience: '3 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      area: 'Begumpet',
      pincode: '500016',
      phone: '+91 98765 43219',
      distance: '4.8 km'
    },
    {
      id: '11',
      name: 'Dr. Arjun Malhotra',
      specialization: 'Speech Therapy',
      rating: 4.8,
      experience: '11 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      area: 'HITEC City',
      pincode: '500081',
      phone: '+91 98765 43220',
      distance: '6.3 km'
    },
    {
      id: '12',
      name: 'Dr. Nisha Patel',
      specialization: 'Speech Therapy',
      rating: 4.7,
      experience: '8 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=150&h=150&fit=crop&crop=face',
      area: 'LB Nagar',
      pincode: '500074',
      phone: '+91 98765 43221',
      distance: '9.1 km'
    },

    // Behavioral Therapists - 12 therapists
    {
      id: '21',
      name: 'Dr. Michael Chen',
      specialization: 'Behavioral Therapy',
      rating: 4.8,
      experience: '6 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
      area: 'HITEC City',
      pincode: '500081',
      phone: '+91 98765 43230',
      distance: '4.8 km'
    },
    {
      id: '22',
      name: 'Dr. Kavitha Reddy',
      specialization: 'Behavioral Therapy',
      rating: 4.9,
      experience: '7 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
      area: 'Kukatpally',
      pincode: '500072',
      phone: '+91 98765 43231',
      distance: '6.3 km'
    },
    {
      id: '23',
      name: 'Dr. Arun Patel',
      specialization: 'Behavioral Therapy',
      rating: 4.6,
      experience: '4 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=face',
      area: 'Secunderabad',
      pincode: '500003',
      phone: '+91 98765 43232',
      distance: '8.2 km'
    },
    {
      id: '24',
      name: 'Dr. Neha Gupta',
      specialization: 'Behavioral Therapy',
      rating: 4.7,
      experience: '8 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop&crop=face',
      area: 'Ameerpet',
      pincode: '500016',
      phone: '+91 98765 43233',
      distance: '2.1 km'
    },
    {
      id: '25',
      name: 'Dr. Rohit Kumar',
      specialization: 'Behavioral Therapy',
      rating: 4.8,
      experience: '5 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=150&h=150&fit=crop&crop=face',
      area: 'Miyapur',
      pincode: '500049',
      phone: '+91 98765 43234',
      distance: '3.5 km'
    },
    {
      id: '26',
      name: 'Dr. Priyanka Singh',
      specialization: 'Behavioral Therapy',
      rating: 4.5,
      experience: '6 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
      area: 'Banjara Hills',
      pincode: '500034',
      phone: '+91 98765 43235',
      distance: '4.7 km'
    },
    {
      id: '27',
      name: 'Dr. Suresh Babu',
      specialization: 'Behavioral Therapy',
      rating: 4.9,
      experience: '10 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face',
      area: 'Jubilee Hills',
      pincode: '500033',
      phone: '+91 98765 43236',
      distance: '5.2 km'
    },
    {
      id: '28',
      name: 'Dr. Radha Krishna',
      specialization: 'Behavioral Therapy',
      rating: 4.6,
      experience: '7 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1594824804732-ca8db7748dda?w=150&h=150&fit=crop&crop=face',
      area: 'Madhapur',
      pincode: '500081',
      phone: '+91 98765 43237',
      distance: '3.8 km'
    },
    {
      id: '29',
      name: 'Dr. Anjali Sharma',
      specialization: 'Behavioral Therapy',
      rating: 4.7,
      experience: '9 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      area: 'Kondapur',
      pincode: '500084',
      phone: '+91 98765 43238',
      distance: '6.1 km'
    },
    {
      id: '30',
      name: 'Dr. Kiran Reddy',
      specialization: 'Behavioral Therapy',
      rating: 4.8,
      experience: '4 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      area: 'Gachibowli',
      pincode: '500032',
      phone: '+91 98765 43239',
      distance: '7.4 km'
    },
    {
      id: '31',
      name: 'Dr. Meera Joshi',
      specialization: 'Behavioral Therapy',
      rating: 4.4,
      experience: '5 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      area: 'Begumpet',
      pincode: '500016',
      phone: '+91 98765 43240',
      distance: '4.3 km'
    },
    {
      id: '32',
      name: 'Dr. Venkat Rao',
      specialization: 'Behavioral Therapy',
      rating: 4.9,
      experience: '11 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=150&h=150&fit=crop&crop=face',
      area: 'LB Nagar',
      pincode: '500074',
      phone: '+91 98765 43241',
      distance: '8.9 km'
    },

    // Occupational Therapists - 12 therapists
    {
      id: '41',
      name: 'Dr. Emma Wilson',
      specialization: 'Occupational Therapy',
      rating: 4.9,
      experience: '10 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face',
      area: 'Begumpet',
      pincode: '500016',
      phone: '+91 98765 43250',
      distance: '7.1 km'
    },
    {
      id: '42',
      name: 'Dr. Ramesh Kumar',
      specialization: 'Occupational Therapy',
      rating: 4.7,
      experience: '8 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face',
      area: 'Kondapur',
      pincode: '500084',
      phone: '+91 98765 43251',
      distance: '4.5 km'
    },
    {
      id: '43',
      name: 'Dr. Meera Singh',
      specialization: 'Occupational Therapy',
      rating: 4.8,
      experience: '6 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop&crop=face',
      area: 'Jubilee Hills',
      pincode: '500033',
      phone: '+91 98765 43252',
      distance: '9.8 km'
    },
    {
      id: '44',
      name: 'Dr. Kiran Kumar',
      specialization: 'Occupational Therapy',
      rating: 4.6,
      experience: '7 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop&crop=face',
      area: 'Madhapur',
      pincode: '500081',
      phone: '+91 98765 43253',
      distance: '2.8 km'
    },
    {
      id: '45',
      name: 'Dr. Radhika Iyer',
      specialization: 'Occupational Therapy',
      rating: 4.8,
      experience: '5 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=150&h=150&fit=crop&crop=face',
      area: 'Banjara Hills',
      pincode: '500034',
      phone: '+91 98765 43254',
      distance: '3.9 km'
    },
    {
      id: '46',
      name: 'Dr. Lakshmi Prasad',
      specialization: 'Occupational Therapy',
      rating: 4.5,
      experience: '4 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
      area: 'Secunderabad',
      pincode: '500003',
      phone: '+91 98765 43255',
      distance: '6.7 km'
    },
    {
      id: '47',
      name: 'Dr. Anil Varma',
      specialization: 'Occupational Therapy',
      rating: 4.7,
      experience: '9 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face',
      area: 'Ameerpet',
      pincode: '500016',
      phone: '+91 98765 43256',
      distance: '5.3 km'
    },
    {
      id: '48',
      name: 'Dr. Sunita Rao',
      specialization: 'Occupational Therapy',
      rating: 4.9,
      experience: '11 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1594824804732-ca8db7748dda?w=150&h=150&fit=crop&crop=face',
      area: 'Miyapur',
      pincode: '500049',
      phone: '+91 98765 43257',
      distance: '4.1 km'
    },
    {
      id: '49',
      name: 'Dr. Gopal Krishna',
      specialization: 'Occupational Therapy',
      rating: 4.6,
      experience: '6 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      area: 'Kukatpally',
      pincode: '500072',
      phone: '+91 98765 43258',
      distance: '7.8 km'
    },
    {
      id: '50',
      name: 'Dr. Shweta Jain',
      specialization: 'Occupational Therapy',
      rating: 4.8,
      experience: '8 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      area: 'Gachibowli',
      pincode: '500032',
      phone: '+91 98765 43259',
      distance: '3.6 km'
    },
    {
      id: '51',
      name: 'Dr. Mahesh Reddy',
      specialization: 'Occupational Therapy',
      rating: 4.4,
      experience: '3 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      area: 'HITEC City',
      pincode: '500081',
      phone: '+91 98765 43260',
      distance: '5.9 km'
    },
    {
      id: '52',
      name: 'Dr. Divya Sharma',
      specialization: 'Occupational Therapy',
      rating: 4.7,
      experience: '7 years',
      available: true,
      image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=150&h=150&fit=crop&crop=face',
      area: 'LB Nagar',
      pincode: '500074',
      phone: '+91 98765 43261',
      distance: '8.4 km'
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

    // Filter by category - Fixed the filter logic
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(therapist => {
        const spec = therapist.specialization.toLowerCase();
        switch (categoryFilter) {
          case 'speech':
            return spec.includes('speech');
          case 'behavioral':
            return spec.includes('behavioral');
          case 'occupational':
            return spec.includes('occupational');
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [searchQuery, pincodeFilter, categoryFilter]);

  const handleTherapistClick = (therapistId: string) => {
    navigate(`/therapist/${therapistId}`);
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
                className="border-2 cursor-pointer transition-all duration-200 bold-card hover:border-purple-400 hover:scale-105"
                onClick={() => handleTherapistClick(therapist.id)}
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

                  {/* Rating and Experience */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-bold text-white">{therapist.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs font-bold text-gray-400">{therapist.experience}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <span className="text-xs font-bold text-blue-300">{therapist.area}</span>
                  </div>

                  {/* Click for details hint */}
                  <p className="text-xs text-gray-400">Click for details</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TherapistBooking;
