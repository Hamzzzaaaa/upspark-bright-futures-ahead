import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pill, MapPin, Phone, CheckCircle, Upload, AlertCircle, Minus, Plus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MedicineDeliveryProps {
  onUploadRequest?: () => void;
}

const MedicineDelivery = ({ onUploadRequest }: MedicineDeliveryProps) => {
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [medicineQuantities, setMedicineQuantities] = useState<{[key: string]: number}>({});
  const [isBooked, setIsBooked] = useState(false);

  // Check verification status
  const isVerified = localStorage.getItem('prescriptionVerified') === 'true';
  const extractedMedicinesData = localStorage.getItem('extractedMedicines');
  const prescribedMedicines = extractedMedicinesData ? JSON.parse(extractedMedicinesData) : [];

  const updateQuantity = (medicineId: string, change: number) => {
    setMedicineQuantities(prev => ({
      ...prev,
      [medicineId]: Math.max(0, (prev[medicineId] || 0) + change)
    }));
  };

  const getQuantity = (medicineId: string) => {
    return medicineQuantities[medicineId] || 0;
  };

  const handleBookMedicine = () => {
    if (!deliveryAddress || !phoneNumber) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if at least one medicine has quantity > 0
    const hasValidQuantity = Object.values(medicineQuantities).some(qty => qty > 0);
    if (!hasValidQuantity) {
      alert('Please select at least one medicine with quantity greater than 0');
      return;
    }

    // Prepare order data
    const orderData = {
      medicines: prescribedMedicines.map((medicine: any) => ({
        ...medicine,
        quantity: getQuantity(medicine.id)
      })).filter((medicine: any) => medicine.quantity > 0),
      deliveryAddress,
      phoneNumber
    };

    // Store order data in localStorage for the billing page
    localStorage.setItem('orderData', JSON.stringify(orderData));
    
    // Navigate to billing page
    navigate('/billing');

    // Set booked state and reset quantities after navigation
    setIsBooked(true);
    setMedicineQuantities({});
    setDeliveryAddress('');
    setPhoneNumber('');
  };

  // If not verified, show verification needed message
  if (!isVerified) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Medicine Delivery 💊
          </h2>
          <p className="text-lg sm:text-xl font-bold text-white">Safe and reliable medicine delivery</p>
        </div>

        {/* Verification Needed Card */}
        <Card className="bold-card border-2 border-orange-500/50 bg-gradient-to-r from-orange-900/30 to-red-900/30">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-black text-white">
                🔒 Verification Needed
              </h3>
              <p className="text-lg font-bold text-white">
                Please upload and verify your prescription to access medicines prescribed by your doctor
              </p>
            </div>
            <Button
              onClick={onUploadRequest}
              className="bold-button py-4 px-8 text-lg font-black rounded-xl"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Prescription
            </Button>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bold-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-black text-white mb-2">Doctor Prescribed</h4>
              <p className="text-base font-bold text-white">Only verified medicines</p>
            </CardContent>
          </Card>
          
          <Card className="bold-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-black text-white mb-2">Safe Delivery</h4>
              <p className="text-base font-bold text-white">Secure medicine delivery</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If booked, show success message with big green tick
  if (isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Big Green Tick */}
          <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-scale-in">
            <Check className="w-20 h-20 text-white stroke-[3]" />
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-black text-white">
              Medicine Booked! 🎉
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-green-400">
              Your medicines will be delivered shortly
            </p>
            <p className="text-lg font-bold text-gray-300 max-w-lg mx-auto">
              We're preparing your prescribed medicines and will deliver them safely to your address within 24-48 hours.
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => setIsBooked(false)}
            className="py-4 px-8 text-lg font-black bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200"
          >
            <Pill className="w-5 h-5 mr-2" />
            Book More Medicines
          </Button>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <Phone className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h4 className="font-black text-white mb-1">Live Updates</h4>
                <p className="text-sm font-bold text-gray-300">SMS & call notifications</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h4 className="font-black text-white mb-1">Safe Delivery</h4>
                <p className="text-sm font-bold text-gray-300">Track your order</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // If verified, show prescribed medicines only
  return (
    <div className="space-y-6">
      {/* Header with Success Message */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Medicine Delivery 💊
          </h2>
        </div>
        <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-500/30 rounded-xl p-4 mb-4">
          <p className="text-lg font-black text-green-400 mb-1">
            ✅ Prescription Verified
          </p>
          <p className="text-base font-bold text-white">
            Order only the medicines prescribed by your doctor
          </p>
        </div>
      </div>

      {/* Prescribed Medicines with Quantity Selection */}
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-white">Your Prescribed Medicines</h3>
        <div className="space-y-3">
          {prescribedMedicines.map((medicine: any) => (
            <Card key={medicine.id} className="bold-card border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-white text-lg">{medicine.name}</h4>
                      <p className="text-base font-bold text-green-300">{medicine.dosage}</p>
                      <p className="text-sm font-bold text-gray-300">Duration: {medicine.duration}</p>
                      <p className="text-sm font-bold text-gray-300">{medicine.instructions}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(medicine.id, -1)}
                        className="h-8 w-8 p-0 text-white hover:bg-gray-600"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-white font-black min-w-[2rem] text-center">
                        {getQuantity(medicine.id)}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(medicine.id, 1)}
                        className="h-8 w-8 p-0 text-white hover:bg-gray-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Delivery Details */}
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-white">Delivery Details</h3>
        
        {/* Address Input */}
        <div className="space-y-2">
          <label className="text-base font-black text-white flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Delivery Address
          </label>
          <Input
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Enter your full address"
            className="rounded-xl bg-gray-800 border-gray-600 text-white font-bold placeholder-gray-400"
          />
        </div>

        {/* Phone Number Input */}
        <div className="space-y-2">
          <label className="text-base font-black text-white flex items-center">
            <Phone className="w-4 h-4 mr-1" />
            Phone Number
          </label>
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="rounded-xl bg-gray-800 border-gray-600 text-white font-bold placeholder-gray-400"
          />
        </div>

        {/* Book Medicine Button */}
        <Button
          onClick={handleBookMedicine}
          disabled={!deliveryAddress || !phoneNumber}
          className="w-full py-4 text-lg font-black bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          {deliveryAddress && phoneNumber
            ? '💳 Book Medicine'
            : '📋 Complete All Fields'
          }
        </Button>
      </div>
    </div>
  );
};

export default MedicineDelivery;
