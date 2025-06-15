import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, User, Calendar, Pill } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Application = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // General Information
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    childName: '',
    childAge: '',
    childGender: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Patient Information
    disabilityType: '',
    disabilityDuration: '',
    onsetDate: '',
    currentSymptoms: '',
    functionalLimitations: '',
    
    // Medical History
    currentMedications: '',
    pastMedications: '',
    allergies: '',
    previousTreatments: '',
    medicalHistory: '',
    
    // Support Requirements
    requirementType: '',
    therapyNeeds: '',
    equipmentNeeds: '',
    caregiverSupport: ''
  });

  useEffect(() => {
    // Pre-fill from user metadata if available
    if (user?.user_metadata) {
      const parentName = user.user_metadata.parent_name || '';
      const childName = user.user_metadata.child_name || '';
      const email = user.email || '';
      
      setFormData(prev => ({
        ...prev,
        parentName,
        childName,
        parentEmail: email
      }));
      
      console.log('Application page loaded for user:', { parentName, childName, email });
    }

    // Load existing application data if user has already started
    loadExistingApplication();
  }, [user]);

  const loadExistingApplication = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('user_applications')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        // Pre-fill form with existing data
        setFormData({
          parentName: data.parent_name || '',
          parentPhone: data.parent_phone || '',
          parentEmail: data.parent_email || '',
          childName: data.child_name || '',
          childAge: data.child_age?.toString() || '',
          childGender: data.child_gender || '',
          address: data.address || '',
          emergencyContact: data.emergency_contact || '',
          emergencyPhone: data.emergency_phone || '',
          disabilityType: data.disability_type || '',
          disabilityDuration: data.disability_duration || '',
          onsetDate: data.onset_date || '',
          currentSymptoms: data.current_symptoms || '',
          functionalLimitations: data.functional_limitations || '',
          currentMedications: data.current_medications || '',
          pastMedications: data.past_medications || '',
          allergies: data.allergies || '',
          previousTreatments: data.previous_treatments || '',
          medicalHistory: data.medical_history || '',
          requirementType: data.requirement_type || '',
          therapyNeeds: data.therapy_needs || '',
          equipmentNeeds: data.equipment_needs || '',
          caregiverSupport: data.caregiver_support || ''
        });

        console.log('Loaded existing application data for user');
      }
    } catch (error) {
      console.error('Error loading application data:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit your application.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting application for user:', user.id);

    try {
      const applicationData = {
        user_id: user.id,
        parent_name: formData.parentName,
        parent_phone: formData.parentPhone,
        parent_email: formData.parentEmail,
        child_name: formData.childName,
        child_age: formData.childAge ? parseInt(formData.childAge) : null,
        child_gender: formData.childGender,
        address: formData.address,
        emergency_contact: formData.emergencyContact,
        emergency_phone: formData.emergencyPhone,
        disability_type: formData.disabilityType,
        disability_duration: formData.disabilityDuration,
        onset_date: formData.onsetDate,
        current_symptoms: formData.currentSymptoms,
        functional_limitations: formData.functionalLimitations,
        current_medications: formData.currentMedications,
        past_medications: formData.pastMedications,
        allergies: formData.allergies,
        previous_treatments: formData.previousTreatments,
        medical_history: formData.medicalHistory,
        requirement_type: formData.requirementType,
        therapy_needs: formData.therapyNeeds,
        equipment_needs: formData.equipmentNeeds,
        caregiver_support: formData.caregiverSupport,
        application_complete: true
      };

      // Use upsert to handle both insert and update
      const { error } = await supabase
        .from('user_applications')
        .upsert(applicationData, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: "Application Submitted Successfully!",
        description: `Thank you for submitting ${formData.childName}'s application. You will be redirected to your profile.`,
      });
      
      // Navigate to profile after submission
      setTimeout(() => {
        navigate('/profile');
      }, 2000);

    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDynamicFields = () => {
    switch (formData.requirementType) {
      case 'online-therapist':
        return (
          <>
            <div className="space-y-3">
              <Label className="text-white font-bold text-lg">Preferred Session Times</Label>
              <Textarea
                value={formData.therapyNeeds}
                onChange={(e) => handleInputChange('therapyNeeds', e.target.value)}
                className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[120px] text-lg font-semibold placeholder:text-gray-300"
                placeholder="What days and times work best for online therapy sessions?"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold text-lg">Technology Requirements</Label>
              <Textarea
                value={formData.equipmentNeeds}
                onChange={(e) => handleInputChange('equipmentNeeds', e.target.value)}
                className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[100px] text-lg font-semibold placeholder:text-gray-300"
                placeholder="Do you have a computer/tablet with camera and stable internet connection?"
              />
            </div>
          </>
        );
      case 'medicine-booking':
        return (
          <>
            <div className="space-y-3">
              <Label className="text-white font-bold text-lg">Preferred Delivery Schedule</Label>
              <Textarea
                value={formData.therapyNeeds}
                onChange={(e) => handleInputChange('therapyNeeds', e.target.value)}
                className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[120px] text-lg font-semibold placeholder:text-gray-300"
                placeholder="How often do you need medicine delivered? (Weekly, Monthly, etc.)"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold text-lg">Delivery Address</Label>
              <Textarea
                value={formData.equipmentNeeds}
                onChange={(e) => handleInputChange('equipmentNeeds', e.target.value)}
                className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[100px] text-lg font-semibold placeholder:text-gray-300"
                placeholder="Confirm delivery address if different from main address"
              />
            </div>
          </>
        );
      case 'offline-therapist':
        return (
          <>
            <div className="space-y-3">
              <Label className="text-white font-bold text-lg">Preferred Location</Label>
              <Textarea
                value={formData.therapyNeeds}
                onChange={(e) => handleInputChange('therapyNeeds', e.target.value)}
                className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[120px] text-lg font-semibold placeholder:text-gray-300"
                placeholder="Would you prefer home visits or clinic visits? Any location preferences?"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold text-lg">Mobility Requirements</Label>
              <Textarea
                value={formData.equipmentNeeds}
                onChange={(e) => handleInputChange('equipmentNeeds', e.target.value)}
                className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[100px] text-lg font-semibold placeholder:text-gray-300"
                placeholder="Any special mobility needs or accessibility requirements?"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-2xl">
              <FileText className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
            Patient Application Form
          </h1>
          <p className="text-xl text-gray-200 font-bold">
            Please fill out the required fields (marked with *)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Information */}
          <Card className="border-2 border-gray-600 shadow-2xl bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-black text-white">
                <User className="w-8 h-8 text-blue-400" />
                General Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-white font-bold text-lg">Parent/Guardian Name *</Label>
                  <Input
                    value={formData.parentName}
                    onChange={(e) => handleInputChange('parentName', e.target.value)}
                    className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-white font-bold text-lg">Phone Number *</Label>
                  <Input
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                    className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-white font-bold text-lg">Email Address</Label>
                <Input
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                  placeholder="Email address"
                  type="email"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-white font-bold text-lg">Child's Name *</Label>
                  <Input
                    value={formData.childName}
                    onChange={(e) => handleInputChange('childName', e.target.value)}
                    className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                    placeholder="Child's full name"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-white font-bold text-lg">Child's Age</Label>
                  <Input
                    value={formData.childAge}
                    onChange={(e) => handleInputChange('childAge', e.target.value)}
                    className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                    placeholder="Age"
                    type="number"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-white font-bold text-lg">Gender</Label>
                <RadioGroup
                  value={formData.childGender}
                  onValueChange={(value) => handleInputChange('childGender', value)}
                  className="flex flex-row space-x-8"
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="male" id="male" className="border-white text-blue-400" />
                    <Label htmlFor="male" className="font-bold text-white text-lg">Male</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="female" id="female" className="border-white text-blue-400" />
                    <Label htmlFor="female" className="font-bold text-white text-lg">Female</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="other" id="other" className="border-white text-blue-400" />
                    <Label htmlFor="other" className="font-bold text-white text-lg">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-white font-bold text-lg">Address</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[100px] text-lg font-semibold placeholder:text-gray-300"
                  placeholder="Full address"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-white font-bold text-lg">Emergency Contact</Label>
                  <Input
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                    placeholder="Emergency contact name"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-white font-bold text-lg">Emergency Phone</Label>
                  <Input
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                    placeholder="Emergency phone number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card className="border-2 border-gray-600 shadow-2xl bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-black text-white">
                <Calendar className="w-8 h-8 text-green-400" />
                Disability & Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-3">
                <Label className="text-white font-bold text-lg">Type of Disability *</Label>
                <Input
                  value={formData.disabilityType}
                  onChange={(e) => handleInputChange('disabilityType', e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                  placeholder="e.g., Autism, ADHD, Cerebral Palsy, etc."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-white font-bold text-lg">Duration of Disability</Label>
                  <Input
                    value={formData.disabilityDuration}
                    onChange={(e) => handleInputChange('disabilityDuration', e.target.value)}
                    className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                    placeholder="e.g., Since birth, 2 years"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-white font-bold text-lg">Onset Date</Label>
                  <Input
                    value={formData.onsetDate}
                    onChange={(e) => handleInputChange('onsetDate', e.target.value)}
                    className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 h-14 text-lg font-semibold placeholder:text-gray-300"
                    placeholder="When did symptoms first appear?"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-white font-bold text-lg">Current Symptoms</Label>
                <Textarea
                  value={formData.currentSymptoms}
                  onChange={(e) => handleInputChange('currentSymptoms', e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[120px] text-lg font-semibold placeholder:text-gray-300"
                  placeholder="Describe current symptoms and behaviors"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-white font-bold text-lg">Functional Limitations</Label>
                <Textarea
                  value={formData.functionalLimitations}
                  onChange={(e) => handleInputChange('functionalLimitations', e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[120px] text-lg font-semibold placeholder:text-gray-300"
                  placeholder="What activities are affected? How does this impact daily life?"
                />
              </div>
            </CardContent>
          </Card>

          {/* Medication Information */}
          <Card className="border-2 border-gray-600 shadow-2xl bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-black text-white">
                <Pill className="w-8 h-8 text-purple-400" />
                Medication & Treatment History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-3">
                <Label className="text-white font-bold text-lg">Current Medications</Label>
                <Textarea
                  value={formData.currentMedications}
                  onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[120px] text-lg font-semibold placeholder:text-gray-300"
                  placeholder="List all current medications, dosages, and frequency"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-white font-bold text-lg">Past Medications</Label>
                <Textarea
                  value={formData.pastMedications}
                  onChange={(e) => handleInputChange('pastMedications', e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[120px] text-lg font-semibold placeholder:text-gray-300"
                  placeholder="Previous medications tried and why they were discontinued"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-white font-bold text-lg">Allergies</Label>
                <Textarea
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[100px] text-lg font-semibold placeholder:text-gray-300"
                  placeholder="Any known allergies to medications, foods, or other substances"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-white font-bold text-lg">Previous Treatments</Label>
                <Textarea
                  value={formData.previousTreatments}
                  onChange={(e) => handleInputChange('previousTreatments', e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[120px] text-lg font-semibold placeholder:text-gray-300"
                  placeholder="Therapies, interventions, or treatments previously received"
                />
              </div>
            </CardContent>
          </Card>

          {/* Support Requirements */}
          <Card className="border-2 border-gray-600 shadow-2xl bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl font-black text-white">
                <FileText className="w-8 h-8 text-orange-400" />
                Support Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-3">
                <Label className="text-white font-bold text-lg">Primary Requirement Type</Label>
                <Select value={formData.requirementType} onValueChange={(value) => handleInputChange('requirementType', value)}>
                  <SelectTrigger className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 h-14 text-lg font-semibold">
                    <SelectValue placeholder="Select primary support requirement" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-2 border-gray-500 shadow-2xl">
                    <SelectItem value="online-therapist" className="font-bold text-white hover:bg-gray-600">Online Therapist</SelectItem>
                    <SelectItem value="medicine-booking" className="font-bold text-white hover:bg-gray-600">Medicine Booking</SelectItem>
                    <SelectItem value="offline-therapist" className="font-bold text-white hover:bg-gray-600">Offline Therapist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderDynamicFields()}

              <div className="space-y-3">
                <Label className="text-white font-bold text-lg">Additional Support Needed</Label>
                <Textarea
                  value={formData.caregiverSupport}
                  onChange={(e) => handleInputChange('caregiverSupport', e.target.value)}
                  className="border-2 border-gray-500 bg-gray-700 text-white focus:border-blue-400 focus:bg-gray-600 min-h-[120px] text-lg font-semibold placeholder:text-gray-300"
                  placeholder="Any other support requirements or special considerations?"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center pb-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black py-4 px-12 rounded-lg h-16 text-xl shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application 🚀'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Application;
