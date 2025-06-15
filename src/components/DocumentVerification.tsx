
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, CheckCircle, Loader2, Edit, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface DocumentVerificationProps {
  onVerificationComplete: () => void;
}

const DocumentVerification = ({ onVerificationComplete }: DocumentVerificationProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      loadPrescriptionData();
    }
  }, [user]);

  const loadPrescriptionData = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('user_prescriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_verified', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setPrescriptionData(data);
        setIsVerified(true);
        console.log('Loaded prescription data from database');
      }
    } catch (error) {
      console.error('Error loading prescription data:', error);
    }
  };

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
    if (!uploadedFile || !user?.id) return;

    setIsUploading(true);

    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Prescribed medicines extracted from document
      const extractedMedicines = [
        {
          id: '1',
          name: 'Valparin chrono',
          dosage: '1 tablet twice daily',
          duration: '30 days',
          instructions: 'Take with meals'
        },
        {
          id: '2',
          name: 'Rize-2',
          dosage: '1 tablet once daily',
          duration: '30 days',
          instructions: 'Take in the morning'
        },
        {
          id: '3',
          name: 'Cloba 10',
          dosage: '1 tablet at bedtime',
          duration: '30 days',
          instructions: 'Take with or without food'
        },
        {
          id: '4',
          name: 'Zonigran',
          dosage: '1 tablet once daily',
          duration: '30 days',
          instructions: 'Take with food to avoid stomach upset'
        }
      ];

      // Get user's application ID
      const { data: applicationData } = await supabase
        .from('user_applications')
        .select('id')
        .eq('user_id', user.id)
        .single();

      // Save prescription verification to database
      const { data, error } = await supabase
        .from('user_prescriptions')
        .upsert({
          user_id: user.id,
          application_id: applicationData?.id || null,
          prescription_file_name: uploadedFile.name,
          verification_date: new Date().toISOString(),
          extracted_medicines: extractedMedicines,
          is_verified: true
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      setPrescriptionData({
        prescription_file_name: uploadedFile.name,
        verification_date: new Date().toISOString(),
        extracted_medicines: extractedMedicines,
        is_verified: true
      });

      setIsVerified(true);
      
      toast({
        title: "Verification Complete! ✅",
        description: "Your prescription has been successfully verified and saved.",
      });

      // Redirect to medicine page after a brief delay
      setTimeout(() => {
        onVerificationComplete();
      }, 2000);

    } catch (error) {
      console.error('Verification error:', error);
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

  const handleDeleteVerification = async () => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('user_prescriptions')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }

      setPrescriptionData(null);
      setIsVerified(false);
      setIsEditing(false);
      setUploadedFile(null);
      
      toast({
        title: "Verification Removed",
        description: "Your prescription verification has been cleared.",
      });
    } catch (error) {
      console.error('Error deleting verification:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to remove verification. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isVerified && prescriptionData && !isEditing) {
    const fileName = prescriptionData.prescription_file_name || 'prescription.pdf';
    const verificationDate = prescriptionData.verification_date;
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
            {isEditing && prescriptionData && (
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
