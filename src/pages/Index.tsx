
import { useState, useEffect } from 'react';
import { Activity, UserCheck, Pill, Home, User, Calendar, TrendingUp, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '@/components/DashboardCard';
import ActivitiesZone from '@/components/ActivitiesZone';
import TherapistBooking from '@/components/TherapistBooking';
import MedicineDelivery from '@/components/MedicineDelivery';
import UpSparkLogo from '@/components/UpSparkLogo';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to profile page which now contains all navigation
    navigate('/profile');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-black text-white mb-6 tracking-tight">Loading UpSpark...</h1>
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default Index;
