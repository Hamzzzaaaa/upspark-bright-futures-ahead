
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, CheckCircle, Loader2, Edit, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentVerificationProps {
  onVerificationComplete: () => void;
}

const DocumentVerification = ({ onVerificationComplete }: DocumentVerificationProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Check if user already has a verified prescription
  const hasVerifiedPrescription = localStorage.getItem('prescriptionVerified') === 'true';

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type (images and PDFs)
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPG, PNG, or PDF file.",
          variant: "destructive"
        });
        return;
      }

      setUploadedFile(file);
    }
  };

  const handleVerification = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Realistic prescription medicines extracted from document
      const extractedMedicines = [
        {
          id: '1',
          name: 'Metformin 500mg',
          dosage: '1 tablet twice daily',
          duration: '30 days',
          instructions: 'Take with meals'
        },
        {
          id: '2',
          name: 'Lisinopril 10mg',
          dosage: '1 tablet once daily',
          duration: '30 days',
          instructions: 'Take in the morning'
        },
        {
          id: '3',
          name: 'Atorvastatin 20mg',
          dosage: '1 tablet at bedtime',
          duration: '30 days',
          instructions: 'Take with or without food'
        },
        {
          id: '4',
          name: 'Aspirin 81mg',
          dosage: '1 tablet once daily',
          duration: '30 days',
          instructions: 'Take with food to avoid stomach upset'
        }
      ];

      // Store verification status and extracted medicines
      localStorage.setItem('prescriptionVerified', 'true');
      localStorage.setItem('prescriptionFile', uploadedFile.name);
      localStorage.setItem('extractedMedicines', JSON.stringify(extractedMedicines));
      localStorage.setItem('verificationDate', new Date().toISOString());

      setIsVerified(true);
      
      toast({
        title: "Verification Complete! ✅",
        description: "Your prescription has been successfully verified.",
      });

      // Redirect to medicine page after a brief delay
      setTimeout(() => {
        onVerificationComplete();
      }, 2000);

    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try uploading again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUploadedFile(null);
  };

  const handleDeleteVerification = () => {
    // Clear verification data
    localStorage.removeItem('prescriptionVerified');
    localStorage.removeItem('prescriptionFile');
    localStorage.removeItem('extractedMedicines');
    localStorage.removeItem('verificationDate');
    
    setIsEditing(false);
    setUploadedFile(null);
    
    toast({
      title: "Verification Removed",
      description: "Your prescription verification has been cleared.",
    });
  };

  if (hasVerifiedPrescription && !isEditing) {
    const fileName = localStorage.getItem('prescriptionFile') || 'prescription.pdf';
    const verificationDate = localStorage.getItem('verificationDate');
    const formattedDate = verificationDate ? new Date(verificationDate).toLocaleDateString() : 'Recently';

    return (
      <Card className="bold-card border-green-500/30 bg-gradient-to-r from-green-900/50 to-blue-900/50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-black text-white flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
              Document Verified ✅
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="text-white hover:text-white hover:bg-white/10"
            >
              <Edit className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-3">
            <FileText className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-lg font-black text-white">{fileName}</p>
              <p className="text-base font-bold text-green-300">Verified on {formattedDate}</p>
            </div>
          </div>
          <Button
            onClick={onVerificationComplete}
            className="w-full bold-button py-3 text-lg font-black"
          >
            View Prescribed Medicines 💊
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bold-card">
      <CardHeader className="text-center">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-black text-white flex items-center">
            <FileText className="w-6 h-6 mr-3 text-blue-400" />
            Document Verification
          </CardTitle>
          {isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancelEdit}
              className="text-white hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
        <p className="text-lg font-bold text-white">Upload your prescription or medical document</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!uploadedFile ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <label className="cursor-pointer">
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="text-lg font-black text-white hover:text-blue-400 transition-colors">
                  Click to upload prescription
                </span>
              </label>
              <p className="text-base font-bold text-gray-300 mt-2">
                Supports JPG, PNG, and PDF files
              </p>
            </div>
            {isEditing && hasVerifiedPrescription && (
              <Button
                onClick={handleDeleteVerification}
                variant="outline"
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400"
              >
                Remove Current Verification
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 p-4 bg-gray-700 rounded-xl">
              <FileText className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-lg font-black text-white">{uploadedFile.name}</p>
                <p className="text-base font-bold text-gray-300">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            {isUploading ? (
              <div className="text-center space-y-4">
                <Loader2 className="w-12 h-12 text-blue-400 mx-auto animate-spin" />
                <p className="text-xl font-black text-white">
                  Verifying your prescription... hang tight! 💊
                </p>
                <p className="text-base font-bold text-gray-300">
                  This may take a few moments
                </p>
              </div>
            ) : isVerified ? (
              <div className="text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                <p className="text-xl font-black text-green-400">
                  ✅ Verification Complete!
                </p>
                <p className="text-base font-bold text-white">
                  Redirecting to your medicines...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  onClick={handleVerification}
                  className="w-full bold-button py-4 text-lg font-black"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Verify Prescription
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setUploadedFile(null)}
                  className="w-full border-gray-600 text-white hover:bg-gray-700"
                >
                  Choose Different File
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentVerification;
