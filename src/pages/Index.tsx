import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
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
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to profile page which now contains all navigation
    navigate('/profile');
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast.success('Successfully signed out!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-800 mb-6">
            Welcome to UpSpark!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Please sign in to access your dashboard
          </p>
          <Link to="/login">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg">
              Sign In / Sign Up
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-lg border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <span className="text-white font-black text-xl">UpSpark</span>
            </div>
            <span className="text-gray-700 font-semibold">
              Welcome back!
            </span>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-gray-800 mb-6 tracking-tight">
            Welcome to UpSpark! ✨
          </h1>
          <p className="text-2xl text-gray-600 font-bold max-w-3xl mx-auto leading-relaxed">
            Empowering children with special needs through personalized therapy, engaging activities, and comprehensive support.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <DashboardCard
            title="Progress Tracker"
            description="Monitor your child's development milestones and celebrate achievements"
            icon="📊"
            href="/progress"
          />
          
          <DashboardCard
            title="Therapist Booking"
            description="Connect with qualified therapists and schedule sessions"
            icon="👩‍⚕️"
            href="/therapist"
          />
          
          <DashboardCard
            title="Activities Zone"
            description="Interactive games and exercises designed for skill development"
            icon="🎮"
            href="/activities"
          />
          
          <DashboardCard
            title="Medicine Delivery"
            description="Convenient prescription management and home delivery"
            icon="💊"
            href="/medicine"
          />
          
          <DashboardCard
            title="Document Verification"
            description="Secure upload and verification of medical documents"
            icon="📋"
            href="/documents"
          />
          
          <DashboardCard
            title="Profile Management"
            description="Update personal information and preferences"
            icon="👤"
            href="/profile"
          />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-black mb-6">Ready to Begin the Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start with our comprehensive assessment to create a personalized plan for your child's unique needs.
          </p>
          <Link to="/application">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 font-black py-4 px-8 rounded-lg text-xl shadow-xl transform hover:scale-105 transition-all duration-200">
              Start Assessment 🚀
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
