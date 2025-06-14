
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Check, Phone, Calendar, Home } from 'lucide-react';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { therapistName, specialization, planName, price, therapistPhone, therapistImage } = location.state || {};

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Success Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500 rounded-full mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-green-400 font-bold">
            Your therapy session has been successfully booked
          </p>
        </div>

        {/* Booking Details Card */}
        <Card className="bold-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-black text-white">
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Therapist Info */}
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
              <Avatar className="w-16 h-16">
                <AvatarImage src={therapistImage} alt={therapistName} />
                <AvatarFallback className="bg-purple-500 text-white font-bold text-lg">
                  {therapistName?.split(' ').map(n => n[0]).join('') || 'DR'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-black text-white">{therapistName}</h3>
                <p className="text-purple-300 font-bold">{specialization}</p>
              </div>
            </div>

            {/* Plan Info */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-bold">Selected Plan:</span>
                <span className="text-white font-black">{planName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-bold">Total Amount:</span>
                <span className="text-green-400 font-black text-xl">₹{price?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <h4 className="text-white font-black mb-3 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-400" />
                Contact Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Therapist Phone:</span>
                  <a 
                    href={`tel:${therapistPhone}`}
                    className="text-blue-400 font-bold hover:text-blue-300 transition-colors"
                  >
                    {therapistPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="p-4 bg-green-900/30 rounded-lg border border-green-500/30">
              <h4 className="text-white font-black mb-2 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-400" />
                What's Next?
              </h4>
              <p className="text-gray-300">
                <strong className="text-green-400">Good news!</strong> Your therapist will contact you soon to schedule your first session and discuss your therapy goals.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="text-center">
          <Button
            onClick={handleGoHome}
            className="px-8 py-4 text-lg font-black bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
