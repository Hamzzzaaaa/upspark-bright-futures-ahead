
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentVerificationProps {
  onVerificationComplete: () => void;
}

const DocumentVerification = ({ onVerificationComplete }: DocumentVerificationProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isVerified, setIsVerified] = useState(false);
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

      // Mock extracted medicines from prescription
      const extractedMedicines = [
        {
          id: '1',
          name: 'Paracetamol 500mg',
          dosage: '1 tablet twice daily',
          duration: '5 days',
          instructions: 'Take after meals'
        },
        {
          id: '2',
          name: 'Amoxicillin 250mg',
          dosage: '1 capsule three times daily',
          duration: '7 days',
          instructions: 'Take before meals'
        },
        {
          id: '3',
          name: 'Vitamin D3 1000IU',
          dosage: '1 tablet daily',
          duration: '30 days',
          instructions: 'Take with breakfast'
        },
        {
          id: '4',
          name: 'Omega-3 Fish Oil',
          dosage: '1 capsule daily',
          duration: '30 days',
          instructions: 'Take with any meal'
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

  if (hasVerifiedPrescription) {
    const fileName = localStorage.getItem('prescriptionFile') || 'prescription.pdf';
    const verificationDate = localStorage.getItem('verificationDate');
    const formattedDate = verificationDate ? new Date(verificationDate).toLocaleDateString() : 'Recently';

    return (
      <Card className="bold-card border-green-500/30 bg-gradient-to-r from-green-900/50 to-blue-900/50">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-black text-white flex items-center justify-center">
            <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
            Document Verified ✅
          </CardTitle>
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
        <CardTitle className="text-2xl font-black text-white flex items-center justify-center">
          <FileText className="w-6 h-6 mr-3 text-blue-400" />
          Document Verification
        </CardTitle>
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
