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

  // Extended therapist data with bio, qualifications, etc. - matching the IDs from TherapistBooking
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
      distance: '5.1 km',
      bio: 'Dr. Rajesh Kumar is a senior speech therapist with a decade of experience in treating various speech disorders. He has worked with patients of all ages and specializes in voice therapy.',
      qualifications: ['Ph.D. in Speech Therapy', 'Voice Specialist Certification', 'Senior Clinical Therapist'],
      languages: ['English', 'Hindi', 'Telugu', 'Tamil'],
      availability: 'Mon-Fri: 8 AM - 5 PM'
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
      distance: '4.2 km',
      bio: 'Dr. Anita Reddy focuses on helping children with developmental delays and communication disorders. She creates personalized therapy plans for each patient.',
      qualifications: ['M.S. in Communication Disorders', 'Child Development Specialist', 'Licensed Therapist'],
      languages: ['English', 'Hindi', 'Telugu'],
      availability: 'Tue-Sat: 9 AM - 6 PM'
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
      distance: '6.8 km',
      bio: 'Dr. Vikram Singh specializes in adult speech therapy and rehabilitation. He has extensive experience in working with stroke patients and neurological disorders.',
      qualifications: ['M.A. in Speech Pathology', 'Neurological Disorders Specialist', 'Rehabilitation Therapist'],
      languages: ['English', 'Hindi', 'Punjabi'],
      availability: 'Mon-Fri: 10 AM - 7 PM'
    },
    // Behavioral Therapists
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
      distance: '4.8 km',
      bio: 'Dr. Michael Chen specializes in Applied Behavior Analysis (ABA) and has extensive experience working with children with autism spectrum disorders.',
      qualifications: ['Ph.D. in Behavioral Psychology', 'ABA Certification', 'Autism Specialist'],
      languages: ['English', 'Hindi'],
      availability: 'Mon-Fri: 9 AM - 6 PM'
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
      distance: '6.3 km',
      bio: 'Dr. Kavitha Reddy focuses on behavioral interventions for children with developmental disabilities and challenging behaviors.',
      qualifications: ['M.A. in Clinical Psychology', 'Behavioral Intervention Specialist', 'Child Psychologist'],
      languages: ['English', 'Hindi', 'Telugu'],
      availability: 'Mon-Sat: 10 AM - 8 PM'
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
      distance: '8.2 km',
      bio: 'Dr. Arun Patel works with individuals with ADHD and behavioral challenges, using evidence-based therapeutic approaches.',
      qualifications: ['M.S. in Behavioral Analysis', 'ADHD Specialist', 'Licensed Therapist'],
      languages: ['English', 'Hindi', 'Gujarati'],
      availability: 'Tue-Fri: 11 AM - 7 PM'
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
      distance: '2.1 km',
      bio: 'Dr. Neha Gupta has extensive experience in family-centered behavioral therapy and works with both children and their families.',
      qualifications: ['Ph.D. in Family Psychology', 'Family Therapy Certification', 'Behavioral Specialist'],
      languages: ['English', 'Hindi'],
      availability: 'Mon-Fri: 9 AM - 6 PM'
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
      distance: '3.5 km',
      bio: 'Dr. Arjun Kumar specializes in cognitive behavioral therapy and works with adolescents and young adults.',
      qualifications: ['M.A. in Clinical Psychology', 'CBT Certification', 'Youth Counselor'],
      languages: ['English', 'Hindi', 'Telugu'],
      availability: 'Mon-Sat: 10 AM - 7 PM'
    },
    // Occupational Therapists
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
      distance: '7.1 km',
      bio: 'Dr. Emma Wilson is a senior occupational therapist with expertise in pediatric rehabilitation and sensory integration therapy.',
      qualifications: ['M.S. in Occupational Therapy', 'Sensory Integration Specialist', 'Pediatric OT Certification'],
      languages: ['English', 'Hindi'],
      availability: 'Mon-Fri: 8 AM - 5 PM'
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
      distance: '4.5 km',
      bio: 'Dr. Suresh Babu focuses on helping children develop fine motor skills and daily living activities through therapeutic interventions.',
      qualifications: ['Bachelor in Occupational Therapy', 'Fine Motor Skills Specialist', 'Licensed OT'],
      languages: ['English', 'Hindi', 'Telugu'],
      availability: 'Tue-Sat: 9 AM - 6 PM'
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
      distance: '9.8 km',
      bio: 'Dr. Meera Singh specializes in adaptive equipment training and helps individuals with disabilities achieve independence in daily activities.',
      qualifications: ['M.S. in Occupational Therapy', 'Adaptive Technology Specialist', 'Rehabilitation Therapist'],
      languages: ['English', 'Hindi', 'Telugu'],
      availability: 'Mon-Fri: 10 AM - 7 PM'
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
      distance: '2.8 km',
      bio: 'Dr. Kiran Kumar works with children with developmental delays and helps them improve their cognitive and motor skills.',
      qualifications: ['Bachelor in Occupational Therapy', 'Developmental Delays Specialist', 'Cognitive Therapy Certification'],
      languages: ['English', 'Hindi', 'Telugu'],
      availability: 'Mon-Sat: 9 AM - 8 PM'
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
      distance: '3.9 km',
      bio: 'Dr. Radhika Iyer specializes in school-based occupational therapy and helps children succeed in their educational environments.',
      qualifications: ['M.S. in Occupational Therapy', 'School-based OT Certification', 'Educational Therapist'],
      languages: ['English', 'Hindi', 'Tamil'],
      availability: 'Mon-Fri: 9 AM - 6 PM'
    }
  ];

  useEffect(() => {
    // First try to find therapist in the local data
    let foundTherapist = therapists.find(t => t.id === therapistId);
    
    // If not found, try to get from localStorage (set by TherapistBooking)
    if (!foundTherapist) {
      const storedTherapist = localStorage.getItem('selectedTherapist');
      if (storedTherapist) {
        const parsedTherapist = JSON.parse(storedTherapist);
        // Add missing fields if therapist came from TherapistBooking
        foundTherapist = {
          ...parsedTherapist,
          bio: parsedTherapist.bio || `${parsedTherapist.name} is an experienced ${parsedTherapist.specialization.toLowerCase()} with ${parsedTherapist.experience} of professional practice.`,
          qualifications: parsedTherapist.qualifications || ['Licensed Therapist', 'Professional Certification'],
          languages: parsedTherapist.languages || ['English', 'Hindi'],
          availability: parsedTherapist.availability || 'Mon-Fri: 9 AM - 6 PM'
        };
      }
    }
    
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
