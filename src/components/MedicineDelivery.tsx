
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pill, Clock, MapPin, Calendar, FileText, CheckCircle, Upload } from 'lucide-react';

interface MedicineDeliveryProps {
  onUploadRequest?: () => void;
}

const MedicineDelivery = ({ onUploadRequest }: MedicineDeliveryProps) => {
  const [selectedFrequency, setSelectedFrequency] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('');

  // Check verification status
  const isVerified = localStorage.getItem('prescriptionVerified') === 'true';
  const extractedMedicinesData = localStorage.getItem('extractedMedicines');
  const prescribedMedicines = extractedMedicinesData ? JSON.parse(extractedMedicinesData) : [];

  const frequencies = [
    {
      id: 'weekly',
      title: 'Weekly Delivery',
      description: 'Every 7 days',
      icon: '📅',
      color: 'from-green-400 to-teal-500'
    },
    {
      id: 'monthly',
      title: 'Monthly Delivery',
      description: 'Every 30 days',
      icon: '🗓️',
      color: 'from-blue-400 to-purple-500'
    }
  ];

  const timeSlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM'
  ];

  const handleOrderRequest = () => {
    if (selectedFrequency && deliveryAddress && preferredTime) {
      alert(`Medicine delivery scheduled!\nFrequency: ${selectedFrequency}\nAddress: ${deliveryAddress}\nTime: ${preferredTime}`);
    } else {
      alert('Please fill in all required fields');
    }
  };

  // If not verified, show upload reminder
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

        {/* Upload Reminder Card */}
        <Card className="bold-card border-2 border-orange-500/50 bg-gradient-to-r from-orange-900/30 to-red-900/30">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-black text-white">
                📄 Please upload your prescription
              </h3>
              <p className="text-lg font-bold text-white">
                to access and purchase medicines. Your health matters!
              </p>
            </div>
            <Button
              onClick={onUploadRequest}
              className="bold-button py-4 px-8 text-lg font-black rounded-xl"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Now
            </Button>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="bold-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-black text-white mb-2">Quick Delivery</h4>
              <p className="text-base font-bold text-white">Same day delivery available</p>
            </CardContent>
          </Card>
          
          <Card className="bold-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-black text-white mb-2">Verified</h4>
              <p className="text-base font-bold text-white">Licensed pharmacy partners</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If verified, show prescribed medicines
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
            ✅ Verification Complete
          </p>
          <p className="text-base font-bold text-white">
            Here are the medicines prescribed for you
          </p>
        </div>
      </div>

      {/* Prescribed Medicines */}
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-white">Prescribed Medicines</h3>
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
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-black rounded-lg"
                  >
                    Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Delivery Options */}
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-white">Delivery Options</h3>
        
        {/* Frequency Selection */}
        <div className="space-y-3">
          <label className="text-base font-black text-white">Delivery Frequency</label>
          {frequencies.map((freq) => (
            <Card 
              key={freq.id}
              className={`border-2 cursor-pointer transition-all duration-200 bold-card ${
                selectedFrequency === freq.id 
                  ? 'border-purple-400 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedFrequency(freq.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${freq.color} rounded-full flex items-center justify-center text-2xl`}>
                    {freq.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-white text-lg sm:text-xl">{freq.title}</h4>
                    <p className="text-base font-bold text-white">{freq.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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

        {/* Time Slot Selection */}
        <div className="space-y-2">
          <label className="text-base font-black text-white flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Preferred Time Slot
          </label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={preferredTime === time ? "default" : "outline"}
                onClick={() => setPreferredTime(time)}
                className={`rounded-xl text-sm font-bold ${
                  preferredTime === time 
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white' 
                    : 'border-gray-600 bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleOrderRequest}
          disabled={!selectedFrequency || !deliveryAddress || !preferredTime}
          className="w-full py-4 text-lg font-black bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          {selectedFrequency && deliveryAddress && preferredTime
            ? '🚚 Schedule Delivery'
            : '📋 Complete All Fields'
          }
        </Button>
      </div>
    </div>
  );
};

export default MedicineDelivery;
