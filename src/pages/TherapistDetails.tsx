
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Phone, Star, Calendar, Award, Clock, ArrowLeft } from 'lucide-react';

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
  bio: string;
  qualifications: string[];
  languages: string[];
  availability: string;
}

const TherapistDetails = () => {
  const { therapistId } = useParams();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState<Therapist | null>(null);

  // Mock therapist data - in a real app, this would come from an API
  const therapists: Therapist[] = [
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
      distance: '2.5 km',
      bio: 'Dr. Sarah Johnson is a certified speech-language pathologist with extensive experience in treating children and adults with communication disorders. She specializes in articulation disorders, language delays, and fluency issues.',
      qualifications: ['M.S. in Speech-Language Pathology', 'ASHA Certified', 'Licensed Speech Therapist'],
      languages: ['English', 'Hindi', 'Telugu'],
      availability: 'Mon-Fri: 9 AM - 6 PM'
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
      distance: '3.2 km',
      bio: 'Dr. Priya Sharma specializes in pediatric speech therapy and has helped hundreds of children overcome speech and language challenges. She uses innovative techniques and technology in her practice.',
      qualifications: ['M.A. in Speech Therapy', 'Pediatric Speech Specialist', 'RCI Licensed'],
      languages: ['English', 'Hindi', 'Tamil'],
      availability: 'Mon-Sat: 10 AM - 7 PM'
    },
    // Add more therapists as needed...
  ];

  useEffect(() => {
    const foundTherapist = therapists.find(t => t.id === therapistId);
    setTherapist(foundTherapist || null);
  }, [therapistId]);

  const handleBooking = () => {
    navigate('/plan-selection', { 
      state: { 
        therapistId: therapist?.id,
        therapistName: therapist?.name,
        specialization: therapist?.specialization 
      } 
    });
  };

  if (!therapist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Therapist Not Found</h2>
          <Button onClick={() => navigate(-1)} className="bg-purple-500 hover:bg-purple-600">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-2 sm:p-4">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Header with back button */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-gray-700 text-sm sm:text-base p-2 sm:p-3"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Back
          </Button>
        </div>

        {/* Main Profile Card */}
        <Card className="bold-card">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-6">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                <AvatarImage src={therapist.image} alt={therapist.name} />
                <AvatarFallback className="bg-purple-500 text-white font-bold text-lg sm:text-2xl">
                  {therapist.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left min-w-0">
                <CardTitle className="text-lg sm:text-2xl lg:text-3xl font-black text-white mb-2 break-words">
                  {therapist.name}
                </CardTitle>
                <p className="text-sm sm:text-lg text-purple-300 font-bold mb-3 sm:mb-4">{therapist.specialization}</p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-bold">{therapist.rating}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                    <span className="text-white font-bold">{therapist.experience}</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    <span className="text-white font-bold truncate max-w-32 sm:max-w-none">{therapist.area}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Professional Information */}
          <Card className="bold-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl font-black text-white">Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div>
                <h4 className="text-white font-bold mb-2 text-sm sm:text-base">About</h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{therapist.bio}</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 text-sm sm:text-base">Qualifications</h4>
                <ul className="space-y-1">
                  {therapist.qualifications.map((qual, index) => (
                    <li key={index} className="text-gray-300 flex items-start text-xs sm:text-sm">
                      <Award className="w-3 h-3 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="break-words">{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 text-sm sm:text-base">Languages</h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {therapist.languages.map((lang, index) => (
                    <span key={index} className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Availability */}
          <Card className="bold-card">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl font-black text-white">Contact & Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-white font-bold text-sm sm:text-base">Phone:</span>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span className="text-green-300 font-bold text-xs sm:text-sm">{therapist.phone}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-white font-bold text-sm sm:text-base">Location:</span>
                <div className="text-left sm:text-right">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                    <span className="text-white font-bold text-xs sm:text-sm">{therapist.area}</span>
                  </div>
                  <span className="text-blue-300 font-bold text-xs">{therapist.pincode}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-white font-bold text-sm sm:text-base">Distance:</span>
                <span className="text-green-400 font-bold text-xs sm:text-sm">{therapist.distance}</span>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                  <span className="text-white font-bold text-sm sm:text-base">Availability:</span>
                </div>
                <p className="text-gray-300 text-xs sm:text-sm">{therapist.availability}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Button */}
        <Card className="bold-card">
          <CardContent className="p-4 sm:p-6">
            <Button
              onClick={handleBooking}
              className="w-full py-3 sm:py-4 text-sm sm:text-lg font-black bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="truncate">Book Appointment with {therapist.name}</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TherapistDetails;
