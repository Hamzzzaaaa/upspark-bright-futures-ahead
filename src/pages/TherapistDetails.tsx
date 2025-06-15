
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
    navigate('/session-booking', { 
      state: { 
        therapistId: therapist?.id,
        therapistName: therapist?.name,
        specialization: therapist?.specialization,
        experience: therapist?.experience,
        therapistPhone: therapist?.phone,
        therapistImage: therapist?.image,
        therapistArea: therapist?.area
      } 
    });
  };

  if (!therapist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Therapist Not Found</h2>
          <Button onClick={() => navigate(-1)} className="bg-purple-500 hover:bg-purple-600">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with back button */}
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

        {/* Main Profile Card */}
        <Card className="bold-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <Avatar className="w-32 h-32">
                <AvatarImage src={therapist.image} alt={therapist.name} />
                <AvatarFallback className="bg-purple-500 text-white font-bold text-2xl">
                  {therapist.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <CardTitle className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {therapist.name}
                </CardTitle>
                <p className="text-lg text-purple-300 font-bold mb-4">{therapist.specialization}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 font-bold">{therapist.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-bold">{therapist.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span className="text-white font-bold">{therapist.area}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Professional Information */}
          <Card className="bold-card">
            <CardHeader>
              <CardTitle className="text-xl font-black text-white">Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-white font-bold mb-2">About</h4>
                <p className="text-gray-300">{therapist.bio}</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2">Qualifications</h4>
                <ul className="space-y-1">
                  {therapist.qualifications.map((qual, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <Award className="w-3 h-3 mr-2 text-blue-400" />
                      {qual}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {therapist.languages.map((lang, index) => (
                    <span key={index} className="bg-purple-500 text-white px-2 py-1 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Availability */}
          <Card className="bold-card">
            <CardHeader>
              <CardTitle className="text-xl font-black text-white">Contact & Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">Phone:</span>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 font-bold">{therapist.phone}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">Location:</span>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-bold">{therapist.area}</span>
                  </div>
                  <span className="text-blue-300 font-bold text-sm">{therapist.pincode}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">Distance:</span>
                <span className="text-green-400 font-bold">{therapist.distance}</span>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-white font-bold">Availability:</span>
                </div>
                <p className="text-gray-300">{therapist.availability}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Button */}
        <Card className="bold-card">
          <CardContent className="p-6">
            <Button
              onClick={handleBooking}
              className="w-full py-4 text-lg font-black bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Appointment with {therapist.name}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TherapistDetails;
