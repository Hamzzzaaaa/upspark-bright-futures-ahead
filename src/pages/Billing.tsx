import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CreditCard, MapPin, Phone, Clock, Pill, Calendar, Check, AlertCircle, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    // Check if prescription is verified first
    const isVerified = localStorage.getItem('prescriptionVerified') === 'true';
    
    if (!isVerified) {
      // If no verification, redirect to profile
      navigate('/profile');
      return;
    }

    const storedOrderData = localStorage.getItem('orderData');
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    } else {
      // Redirect back if no order data
      navigate('/profile');
    }
  }, [navigate]);

  // Check verification status
  const isVerified = localStorage.getItem('prescriptionVerified') === 'true';

  // If not verified, show verification needed message
  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
        <div className="max-w-md mx-auto space-y-8 pt-20">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/profile')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-3xl font-black text-white">Billing & Payment</h1>
          </div>

          {/* Verification Needed Card */}
          <Card className="bold-card border-2 border-orange-500/50 bg-gradient-to-r from-orange-900/30 to-red-900/30">
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white">
                  🔒 Verification Required
                </h3>
                <p className="text-lg font-bold text-white">
                  Please upload and verify your prescription before accessing billing
                </p>
              </div>
              <Button
                onClick={() => navigate('/profile')}
                className="bold-button py-4 px-8 text-lg font-black rounded-xl"
              >
                <Upload className="w-5 h-5 mr-2" />
                Go Back to Upload Prescription
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'upi', name: 'UPI Payment', icon: '📱' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💰' }
  ];

  const calculateTotal = () => {
    if (!orderData?.medicines) return 0;
    return orderData.medicines.reduce((total: number, medicine: any) => {
      const price = 100; // Base price per medicine
      return total + (price * medicine.quantity);
    }, 0);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv || !cardName)) {
      alert('Please fill in all card details');
      return;
    }

    // Set booking success and clear order data
    setIsBooked(true);
    localStorage.removeItem('orderData');
  };

  const handleBookMore = () => {
    navigate('/profile');
  };

  if (!orderData) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-white text-xl font-black">Loading...</div>
    </div>;
  }

  // If booked, show success message with big green tick
  if (isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
        <div className="max-w-md mx-auto space-y-8 pt-20">
          {/* Big Green Tick */}
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-2xl mb-6">
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
              onClick={handleBookMore}
              className="mt-8 py-4 px-8 text-lg font-black bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-200"
            >
              <Pill className="w-5 h-5 mr-2" />
              Back to Profile
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/profile')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-black text-white">Billing & Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div className="space-y-4">
            <Card className="bold-card">
              <CardHeader>
                <CardTitle className="text-xl font-black text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Medicines */}
                <div className="space-y-3">
                  {orderData.medicines.map((medicine: any) => (
                    <div key={medicine.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Pill className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="font-black text-white">{medicine.name}</p>
                          <p className="text-sm font-bold text-gray-300">{medicine.dosage}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-white">Qty: {medicine.quantity}</p>
                        <p className="text-sm font-bold text-green-400">₹{100 * medicine.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Details */}
                <div className="border-t border-gray-600 pt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-white text-sm">{orderData.deliveryAddress}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-white">{orderData.phoneNumber}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-white">{orderData.preferredTime}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-white">Total Amount:</span>
                    <span className="text-2xl font-black text-green-400">₹{calculateTotal()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div className="space-y-4">
            <Card className="bold-card">
              <CardHeader>
                <CardTitle className="text-xl font-black text-white flex items-center">
                  <CreditCard className="w-6 h-6 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Payment Method Selection */}
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <Card
                      key={method.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        paymentMethod === method.id
                          ? 'border-blue-400 bg-blue-900/30'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{method.icon}</span>
                          <span className="font-black text-white">{method.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Card Details (only if card is selected) */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-white">Card Number</label>
                      <Input
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-sm font-black text-white">Expiry Date</label>
                        <Input
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY"
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-white">CVV</label>
                        <Input
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-white">Cardholder Name</label>
                      <Input
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                )}

                {/* UPI Details */}
                {paymentMethod === 'upi' && (
                  <div className="mt-4 p-4 bg-gray-700 rounded-lg text-center">
                    <p className="font-black text-white mb-2">Scan QR Code or Pay via UPI ID</p>
                    <p className="text-sm font-bold text-gray-300">UPI ID: medicines@paytm</p>
                  </div>
                )}

                {/* COD Message */}
                {paymentMethod === 'cod' && (
                  <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                    <p className="font-black text-yellow-400">Cash on Delivery</p>
                    <p className="text-sm font-bold text-white">Pay ₹{calculateTotal()} when medicines are delivered</p>
                  </div>
                )}

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={!paymentMethod}
                  className="w-full py-4 text-lg font-black bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl transition-all duration-200 disabled:opacity-50"
                >
                  {paymentMethod === 'cod' ? '📦 Confirm Order' : '💳 Pay Now'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
