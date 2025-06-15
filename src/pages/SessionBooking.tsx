
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CalendarIcon, Clock, User, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const SessionBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientAge, setPatientAge] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const { therapistName, specialization, experience, therapistPhone, therapistImage, therapistArea } = location.state || {};

  // Available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const handleBookSession = () => {
    if (!selectedDate || !selectedTime || !patientName || !contactNumber) {
      alert('Please fill in all required fields');
      return;
    }

    // Save booking data
    const bookingData = {
      therapistName,
      specialization,
      patientName,
      patientAge,
      contactNumber,
      address,
      selectedDate: format(selectedDate, 'PPP'),
      selectedTime,
      notes,
      bookingId: `BOOK-${Date.now()}`
    };

    localStorage.setItem('sessionBooking', JSON.stringify(bookingData));
    
    navigate('/booking-confirmation', {
      state: {
        ...bookingData,
        therapistImage,
        therapistPhone
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Therapist Details
        </Button>

        {/* Therapist Info Header */}
        <Card className="bold-card mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={therapistImage} alt={therapistName} />
                <AvatarFallback className="bg-purple-500 text-white font-bold text-xl">
                  {therapistName?.split(' ').map(n => n[0]).join('') || 'DR'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-black text-white mb-2">{therapistName}</h1>
                <p className="text-purple-300 font-bold text-lg">{specialization}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <div className="flex items-center text-blue-400">
                    <User className="w-4 h-4 mr-1" />
                    {experience} experience
                  </div>
                  <div className="flex items-center text-green-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {therapistArea}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Patient Information */}
          <Card className="bold-card">
            <CardHeader>
              <CardTitle className="text-xl font-black text-white">Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="patientName" className="text-white font-bold">Patient Name *</Label>
                <Input
                  id="patientName"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter patient's full name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="patientAge" className="text-white font-bold">Patient Age</Label>
                <Input
                  id="patientAge"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="Enter patient's age"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contactNumber" className="text-white font-bold">Contact Number *</Label>
                <Input
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Enter contact number"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-white font-bold">Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-white font-bold">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific requirements or notes"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule Selection */}
          <Card className="bold-card">
            <CardHeader>
              <CardTitle className="text-xl font-black text-white">Schedule Your Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date Selection */}
              <div>
                <Label className="text-white font-bold mb-3 block">Select Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Selection */}
              <div>
                <Label className="text-white font-bold mb-3 block">Select Time *</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "text-xs",
                        selectedTime === time 
                          ? "bg-purple-500 hover:bg-purple-600 text-white" 
                          : "hover:bg-purple-500/20"
                      )}
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Session Summary */}
              {selectedDate && selectedTime && (
                <div className="p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-white mb-2">Session Summary</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p><strong>Date:</strong> {format(selectedDate, "PPP")}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                    <p><strong>Duration:</strong> 60 minutes</p>
                    <p><strong>Type:</strong> In-person consultation</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Book Session Button */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleBookSession}
            disabled={!selectedDate || !selectedTime || !patientName || !contactNumber}
            className={cn(
              "px-8 py-4 text-lg font-black rounded-xl transition-all duration-200",
              selectedDate && selectedTime && patientName && contactNumber
                ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            )}
          >
            {selectedDate && selectedTime && patientName && contactNumber 
              ? "Confirm Session Booking" 
              : "Complete Required Fields"
            }
          </Button>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            📅 Sessions are 60 minutes • 🔒 Secure booking • 📞 Confirmation call within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionBooking;
