import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, FileText, User, Calendar, Pill } from 'lucide-react';

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
    assistanceLevel: '',
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
    // Navigate to main app after submission
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-2 sm:p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center mb-2 sm:mb-4">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 sm:p-3 rounded-full">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-800 mb-2">
            Patient Application Form
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-bold">
            Please fill out all sections completely
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* General Information */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-black text-gray-800">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                General Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label className="text-gray-700 font-black text-sm sm:text-base">Parent/Guardian Name</Label>
                  <Input
                    value={formData.parentName}
                    onChange={(e) => handleInputChange('parentName', e.target.value)}
                    className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label className="text-gray-700 font-black text-sm sm:text-base">Phone Number</Label>
                  <Input
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                    className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Email Address</Label>
                <Input
                  value={formData.parentEmail}
                  onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                  placeholder="Email address"
                  type="email"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label className="text-gray-700 font-black text-sm sm:text-base">Child's Name</Label>
                  <Input
                    value={formData.childName}
                    onChange={(e) => handleInputChange('childName', e.target.value)}
                    className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                    placeholder="Child's full name"
                    required
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label className="text-gray-700 font-black text-sm sm:text-base">Child's Age</Label>
                  <Input
                    value={formData.childAge}
                    onChange={(e) => handleInputChange('childAge', e.target.value)}
                    className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                    placeholder="Age"
                    type="number"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Gender</Label>
                <RadioGroup
                  value={formData.childGender}
                  onValueChange={(value) => handleInputChange('childGender', value)}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="font-bold text-gray-700">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="font-bold text-gray-700">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="font-bold text-gray-700">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Address</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 min-h-[80px] text-sm sm:text-base font-bold"
                  placeholder="Full address"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label className="text-gray-700 font-black text-sm sm:text-base">Emergency Contact</Label>
                  <Input
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                    placeholder="Emergency contact name"
                    required
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label className="text-gray-700 font-black text-sm sm:text-base">Emergency Phone</Label>
                  <Input
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                    placeholder="Emergency phone number"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Information */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-black text-gray-800">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                Disability & Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Type of Disability</Label>
                <Input
                  value={formData.disabilityType}
                  onChange={(e) => handleInputChange('disabilityType', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                  placeholder="e.g., Autism, ADHD, Cerebral Palsy, etc."
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1 sm:space-y-2">
                  <Label className="text-gray-700 font-black text-sm sm:text-base">Duration of Disability</Label>
                  <Input
                    value={formData.disabilityDuration}
                    onChange={(e) => handleInputChange('disabilityDuration', e.target.value)}
                    className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                    placeholder="e.g., Since birth, 2 years"
                    required
                  />
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <Label className="text-gray-700 font-black text-sm sm:text-base">Onset Date</Label>
                  <Input
                    value={formData.onsetDate}
                    onChange={(e) => handleInputChange('onsetDate', e.target.value)}
                    className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold"
                    placeholder="When did symptoms first appear?"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Current Symptoms</Label>
                <Textarea
                  value={formData.currentSymptoms}
                  onChange={(e) => handleInputChange('currentSymptoms', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 min-h-[100px] text-sm sm:text-base font-bold"
                  placeholder="Describe current symptoms and behaviors"
                  required
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Functional Limitations</Label>
                <Textarea
                  value={formData.functionalLimitations}
                  onChange={(e) => handleInputChange('functionalLimitations', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 min-h-[100px] text-sm sm:text-base font-bold"
                  placeholder="What activities are affected? How does this impact daily life?"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Medication Information */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-black text-gray-800">
                <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                Medication & Treatment History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Current Medications</Label>
                <Textarea
                  value={formData.currentMedications}
                  onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 min-h-[100px] text-sm sm:text-base font-bold"
                  placeholder="List all current medications, dosages, and frequency"
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Past Medications</Label>
                <Textarea
                  value={formData.pastMedications}
                  onChange={(e) => handleInputChange('pastMedications', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 min-h-[100px] text-sm sm:text-base font-bold"
                  placeholder="Previous medications tried and why they were discontinued"
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Allergies</Label>
                <Textarea
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 min-h-[80px] text-sm sm:text-base font-bold"
                  placeholder="Any known allergies to medications, foods, or other substances"
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Previous Treatments</Label>
                <Textarea
                  value={formData.previousTreatments}
                  onChange={(e) => handleInputChange('previousTreatments', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 min-h-[100px] text-sm sm:text-base font-bold"
                  placeholder="Therapies, interventions, or treatments previously received"
                />
              </div>
            </CardContent>
          </Card>

          {/* Support Requirements */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-black text-gray-800">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                Support Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Level of Assistance Needed</Label>
                <RadioGroup
                  value={formData.assistanceLevel}
                  onValueChange={(value) => handleInputChange('assistanceLevel', value)}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="minimal" id="minimal" />
                    <Label htmlFor="minimal" className="font-bold text-gray-700">Minimal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate" className="font-bold text-gray-700">Moderate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intensive" id="intensive" />
                    <Label htmlFor="intensive" className="font-bold text-gray-700">Intensive</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Primary Requirement Type</Label>
                <Select value={formData.requirementType} onValueChange={(value) => handleInputChange('requirementType', value)}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-purple-400 h-10 sm:h-12 text-sm sm:text-base font-bold">
                    <SelectValue placeholder="Select primary support requirement" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-gray-200 shadow-lg z-50">
                    <SelectItem value="therapist" className="font-bold text-gray-700 hover:bg-purple-50">Therapist Services</SelectItem>
                    <SelectItem value="medicine" className="font-bold text-gray-700 hover:bg-purple-50">Medicine Management</SelectItem>
                    <SelectItem value="online-session" className="font-bold text-gray-700 hover:bg-purple-50">Online Sessions</SelectItem>
                    <SelectItem value="home-visit" className="font-bold text-gray-700 hover:bg-purple-50">Home Visit Services</SelectItem>
                    <SelectItem value="equipment" className="font-bold text-gray-700 hover:bg-purple-50">Medical Equipment</SelectItem>
                    <SelectItem value="respite-care" className="font-bold text-gray-700 hover:bg-purple-50">Respite Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Therapy Needs</Label>
                <Textarea
                  value={formData.therapyNeeds}
                  onChange={(e) => handleInputChange('therapyNeeds', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 min-h-[100px] text-sm sm:text-base font-bold"
                  placeholder="What types of therapy are needed? (Speech, Occupational, Physical, Behavioral, etc.)"
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Equipment Needs</Label>
                <Textarea
                  value={formData.equipmentNeeds}
                  onChange={(e) => handleInputChange('equipmentNeeds', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 min-h-[80px] text-sm sm:text-base font-bold"
                  placeholder="Any special equipment, devices, or accommodations needed"
                />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label className="text-gray-700 font-black text-sm sm:text-base">Caregiver Support</Label>
                <Textarea
                  value={formData.caregiverSupport}
                  onChange={(e) => handleInputChange('caregiverSupport', e.target.value)}
                  className="border-2 border-gray-200 focus:border-purple-400 min-h-[100px] text-sm sm:text-base font-bold"
                  placeholder="What support do caregivers need? Training, respite care, etc."
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-black py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 h-12 text-base"
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
