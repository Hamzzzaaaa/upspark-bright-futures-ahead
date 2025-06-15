
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, User, Calendar, Phone, Award } from 'lucide-react';
import { hyderabadTherapists, type Therapist } from '@/data/therapistData';

interface TherapistListProps {
  onTherapistSelect?: (therapist: Therapist) => void;
}

const TherapistList = ({ onTherapistSelect }: TherapistListProps) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  
  const specialties = [
    'all',
    'Child Development',
    'Occupational Therapy',
    'Speech Therapy',
    'Psychology',
    'Pediatrics',
    'Special Education',
    'Physiotherapy',
    'Behavior Analysis'
  ];

  const filteredTherapists = selectedSpecialty === 'all' 
    ? hyderabadTherapists 
    : hyderabadTherapists.filter(therapist => 
        therapist.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
          Expert Therapists in Hyderabad 🏥
        </h2>
        <p className="text-lg font-bold text-white">
          Connect with certified professionals for your child's development
        </p>
      </div>

      {/* Specialty Filter */}
      <div className="space-y-3">
        <h3 className="text-lg font-black text-white">Filter by Specialty:</h3>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <Button
              key={specialty}
              variant={selectedSpecialty === specialty ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpecialty(specialty)}
              className={`font-bold text-xs ${
                selectedSpecialty === specialty
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'text-white border-gray-600 hover:bg-gray-700'
              }`}
            >
              {specialty === 'all' ? 'All Specialties' : specialty}
            </Button>
          ))}
        </div>
      </div>

      {/* Therapists Grid */}
      <div className="space-y-4">
        {filteredTherapists.map((therapist) => (
          <Card key={therapist.id} className="bold-card hover:scale-[1.02] transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                {/* Header with Name and Rating */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-xl font-black text-white mb-1">{therapist.name}</h4>
                    <p className="text-lg font-bold text-blue-300 mb-2">{therapist.specialty}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-black text-white">{therapist.rating}</span>
                        <span className="text-sm font-bold text-gray-300">({therapist.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-2">
                      {therapist.experience} years exp.
                    </Badge>
                  </div>
                </div>

                {/* Location and Languages */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-bold text-white">{therapist.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {therapist.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs text-gray-300 border-gray-600">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Qualifications */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-black text-white">Qualifications:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {therapist.qualifications.slice(0, 2).map((qual) => (
                      <Badge key={qual} className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                        {qual}
                      </Badge>
                    ))}
                    {therapist.qualifications.length > 2 && (
                      <Badge className="bg-gray-600 text-gray-300 text-xs">
                        +{therapist.qualifications.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Specializations */}
                <div className="space-y-2">
                  <span className="text-sm font-black text-white">Specializations:</span>
                  <div className="flex flex-wrap gap-1">
                    {therapist.specializations.slice(0, 3).map((spec) => (
                      <Badge key={spec} className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {therapist.specializations.length > 3 && (
                      <Badge className="bg-gray-600 text-gray-300 text-xs">
                        +{therapist.specializations.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* About */}
                <p className="text-sm font-bold text-gray-300 line-clamp-2">
                  {therapist.about}
                </p>

                {/* Consultation Details */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-bold text-white">{therapist.sessionDuration} min</span>
                    </div>
                    <div className="text-lg font-black text-green-400">
                      ₹{therapist.consultationFee}
                    </div>
                  </div>
                  <Button
                    onClick={() => onTherapistSelect?.(therapist)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-black px-6 py-2 rounded-lg"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTherapists.length === 0 && (
        <Card className="bold-card">
          <CardContent className="p-8 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-black text-white mb-2">No Therapists Found</h3>
            <p className="text-gray-300 font-bold">Try selecting a different specialty filter</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TherapistList;
