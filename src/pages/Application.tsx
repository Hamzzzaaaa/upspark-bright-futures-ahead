import { useState } from 'react';
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

const Application = () => {
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

  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    
    // Save application data to localStorage for profile page
    localStorage.setItem('childName', formData.childName);
    localStorage.setItem('parentName', formData.parentName);
    localStorage.setItem('parentPhone', formData.parentPhone);
    localStorage.setItem('parentEmail', formData.parentEmail);
    localStorage.setItem('address', formData.address);
    
    toast({
      title: "Application Submitted Successfully!",
      description: `Thank you for submitting ${formData.childName}'s application. You will be redirected to the main app.`,
    });
    
    // Navigate to main app after submission
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const renderDynamicFields = () => {
    switch (formData.requirementType) {
      case 'online-therapist':
        return (
          <>
            <div className="space-y-2">
              <Label className="text-gray-900 font-medium text-base">Preferred Session Times</Label>
              <Textarea
                value={formData.therapyNeeds}
                onChange={(e) => handleInputChange('therapyNeeds', e.target.value)}
                className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[100px] text-base font-medium text-gray-900 placeholder:text-gray-600"
                placeholder="What days and times work best for online therapy sessions?"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-900 font-medium text-base">Technology Requirements</Label>
              <Textarea
                value={formData.equipmentNeeds}
                onChange={(e) => handleInputChange('equipmentNeeds', e.target.value)}
                className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[80px] text-base font-medium text-gray-900 placeholder:text-gray-600"
                placeholder="Do you have a computer/tablet with camera and stable internet connection?"
              />
            </div>
          </>
        );
      case 'medicine-booking':
        return (
          <>
            <div className="space-y-2">
              <Label className="text-gray-900 font-medium text-base">Preferred Delivery Schedule</Label>
              <Textarea
                value={formData.therapyNeeds}
                onChange={(e) => handleInputChange('therapyNeeds', e.target.value)}
                className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[100px] text-base font-medium text-gray-900 placeholder:text-gray-600"
                placeholder="How often do you need medicine delivered? (Weekly, Monthly, etc.)"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-900 font-medium text-base">Delivery Address</Label>
              <Textarea
                value={formData.equipmentNeeds}
                onChange={(e) => handleInputChange('equipmentNeeds', e.target.value)}
                className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[80px] text-base font-medium text-gray-900 placeholder:text-gray-600"
                placeholder="Confirm delivery address if different from main address"
              />
            </div>
          </>
        );
      case 'offline-therapist':
        return (
          <>
            <div className="space-y-2">
              <Label className="text-gray-900 font-medium text-base">Preferred Location</Label>
              <Textarea
                value={formData.therapyNeeds}
                onChange={(e) => handleInputChange('therapyNeeds', e.target.value)}
                className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[100px] text-base font-medium text-gray-900 placeholder:text-gray-600"
                placeholder="Would you prefer home visits or clinic visits? Any location preferences?"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-900 font-medium text-base">Mobility Requirements</Label>
              <Textarea
                value={formData.equipmentNeeds}
                onChange={(e) => handleInputChange('equipmentNeeds', e.target.value)}
                className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[80px] text-base font-medium text-gray-900 placeholder:text-gray-600"
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Patient Application Form
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            Please fill out the required fields (marked with *)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Information */}
          <Card className="border border-gray-300 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <User className="w-6 h-6 text-blue-600" />
                General Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900 font-medium text-base">Parent/Guardian Name *</Label>
                  <Input
                    value={formData.parentName}
                    onChange={(e) => handleInputChange('parentName', e.target.value)}
                    className="border-2 border-gray-300 bg-white focus:border-blue-500 h-12 text-base font-medium text-gray-900"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-900 font-medium text-base">Phone Number *</Label>
                  <Input
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                    className="border-2 border-gray-300 bg-white focus:border-blue-500 h-12 text-base font-medium text-gray-900"
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Email Address</Label>
                <Input
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                  className="border-2 border-gray-300 bg-white focus:border-blue-500 h-12 text-base font-medium text-gray-900"
                  placeholder="Email address"
                  type="email"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900 font-medium text-base">Child's Name *</Label>
                  <Input
                    value={formData.childName}
                    onChange={(e) => handleInputChange('childName', e.target.value)}
                    className="border-2 border-gray-300 bg-white focus:border-blue-500 h-12 text-base font-medium text-gray-900"
                    placeholder="Child's full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-900 font-medium text-base">Child's Age</Label>
                  <Input
                    value={formData.childAge}
                    onChange={(e) => handleInputChange('childAge', e.target.value)}
                    className="border-2 border-gray-300 bg-white focus:border-blue-500 h-12 text-base font-medium text-gray-900"
                    placeholder="Age"
                    type="number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Gender</Label>
                <RadioGroup
                  value={formData.childGender}
                  onValueChange={(value) => handleInputChange('childGender', value)}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="font-medium text-gray-900">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="font-medium text-gray-900">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="font-medium text-gray-900">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Address</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[80px] text-base font-medium text-gray-900"
                  placeholder="Full address"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900 font-medium text-base">Emergency Contact</Label>
                  <Input
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="border-2 border-gray-300 bg-white focus:border-blue-500 h-12 text-base font-medium text-gray-900"
                    placeholder="Emergency contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-900 font-medium text-base">Emergency Phone</Label>
                  <Input
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    className="border-2 border-gray-300 bg-white focus:border-blue-500 h-12 text-base font-medium text-gray-900"
                    placeholder="Emergency phone number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card className="border border-gray-300 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <Calendar className="w-6 h-6 text-green-600" />
                Disability & Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Type of Disability *</Label>
                <Input
                  value={formData.disabilityType}
                  onChange={(e) => handleInputChange('disabilityType', e.target.value)}
                  className="border-2 border-gray-300 bg-white focus:border-blue-500 h-12 text-base font-medium text-gray-900"
                  placeholder="e.g., Autism, ADHD, Cerebral Palsy, etc."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900 font-medium text-base">Duration of Disability</Label>
                  <Input
                    value={formData.disabilityDuration}
                    onChange={(e) => handleInputChange('disabilityDuration', e.target.value)}
                    className="border-2 border-gray-300 bg-white focus:border-blue-500 h-12 text-base font-medium text-gray-900"
                    placeholder="e.g., Since birth, 2 years"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-900 font-medium text-base">Onset Date</Label>
                  <Input
                    value={formData.onsetDate}
                    onChange={(e) => handleInputChange('onsetDate', e.target.value)}
                    className="border-2 border-gray-300 bg-white focus:border-blue-500 h-12 text-base font-medium text-gray-900"
                    placeholder="When did symptoms first appear?"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Current Symptoms</Label>
                <Textarea
                  value={formData.currentSymptoms}
                  onChange={(e) => handleInputChange('currentSymptoms', e.target.value)}
                  className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[100px] text-base font-medium text-gray-900"
                  placeholder="Describe current symptoms and behaviors"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Functional Limitations</Label>
                <Textarea
                  value={formData.functionalLimitations}
                  onChange={(e) => handleInputChange('functionalLimitations', e.target.value)}
                  className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[100px] text-base font-medium text-gray-900"
                  placeholder="What activities are affected? How does this impact daily life?"
                />
              </div>
            </CardContent>
          </Card>

          {/* Medication Information */}
          <Card className="border border-gray-300 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <Pill className="w-6 h-6 text-purple-600" />
                Medication & Treatment History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Current Medications</Label>
                <Textarea
                  value={formData.currentMedications}
                  onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                  className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[100px] text-base font-medium text-gray-900"
                  placeholder="List all current medications, dosages, and frequency"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Past Medications</Label>
                <Textarea
                  value={formData.pastMedications}
                  onChange={(e) => handleInputChange('pastMedications', e.target.value)}
                  className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[100px] text-base font-medium text-gray-900"
                  placeholder="Previous medications tried and why they were discontinued"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Allergies</Label>
                <Textarea
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[80px] text-base font-medium text-gray-900"
                  placeholder="Any known allergies to medications, foods, or other substances"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Previous Treatments</Label>
                <Textarea
                  value={formData.previousTreatments}
                  onChange={(e) => handleInputChange('previousTreatments', e.target.value)}
                  className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[100px] text-base font-medium text-gray-900"
                  placeholder="Therapies, interventions, or treatments previously received"
                />
              </div>
            </CardContent>
          </Card>

          {/* Support Requirements */}
          <Card className="border border-gray-300 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <FileText className="w-6 h-6 text-orange-600" />
                Support Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Primary Requirement Type</Label>
                <Select value={formData.requirementType} onValueChange={(value) => handleInputChange('requirementType', value)}>
                  <SelectTrigger className="border-2 border-gray-300 bg-white focus:border-blue-500 h-12 text-base font-medium text-gray-900">
                    <SelectValue placeholder="Select primary support requirement" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-300 shadow-xl">
                    <SelectItem value="online-therapist" className="font-medium text-gray-900">Online Therapist</SelectItem>
                    <SelectItem value="medicine-booking" className="font-medium text-gray-900">Medicine Booking</SelectItem>
                    <SelectItem value="offline-therapist" className="font-medium text-gray-900">Offline Therapist</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderDynamicFields()}

              <div className="space-y-2">
                <Label className="text-gray-900 font-medium text-base">Additional Support Needed</Label>
                <Textarea
                  value={formData.caregiverSupport}
                  onChange={(e) => handleInputChange('caregiverSupport', e.target.value)}
                  className="border-2 border-gray-300 bg-white focus:border-blue-500 min-h-[100px] text-base font-medium text-gray-900"
                  placeholder="Any other support requirements or special considerations?"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg h-12 text-base"
            >
              Submit Application 🚀
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Application;
