
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pill, Clock, MapPin, Calendar } from 'lucide-react';

const MedicineDelivery = () => {
  const [selectedFrequency, setSelectedFrequency] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('');

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

  const medicineHistory = [
    {
      id: '1',
      name: 'Vitamin D3',
      lastDelivery: '2024-06-10',
      nextDelivery: '2024-07-10',
      status: 'active'
    },
    {
      id: '2',
      name: 'Omega-3 Supplements',
      lastDelivery: '2024-06-05',
      nextDelivery: '2024-07-05',
      status: 'active'
    },
    {
      id: '3',
      name: 'Multivitamin',
      lastDelivery: '2024-05-28',
      nextDelivery: '2024-06-28',
      status: 'pending'
    }
  ];

  const handleOrderRequest = () => {
    if (selectedFrequency && deliveryAddress && preferredTime) {
      alert(`Medicine delivery scheduled!\nFrequency: ${selectedFrequency}\nAddress: ${deliveryAddress}\nTime: ${preferredTime}`);
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
          Medicine Delivery 💊
        </h2>
        <p className="text-lg sm:text-xl font-bold text-white">Schedule medication refills and deliveries</p>
      </div>

      {/* Current Medications */}
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-white">Current Medications</h3>
        <div className="space-y-3">
          {medicineHistory.map((medicine) => (
            <Card key={medicine.id} className="border-0 shadow-lg bold-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <Pill className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-lg sm:text-xl">{medicine.name}</h4>
                      <p className="text-base font-bold text-white">Next: {medicine.nextDelivery}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-black ${
                    medicine.status === 'active' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {medicine.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* New Order Section */}
      <div className="space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-white">Request New Delivery</h3>
        
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
