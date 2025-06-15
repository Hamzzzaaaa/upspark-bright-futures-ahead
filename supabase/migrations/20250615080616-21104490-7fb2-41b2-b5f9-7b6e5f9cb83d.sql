
-- Create table for storing user application data
CREATE TABLE public.user_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  parent_name TEXT NOT NULL,
  parent_phone TEXT,
  parent_email TEXT,
  child_name TEXT NOT NULL,
  child_age INTEGER,
  child_gender TEXT,
  address TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  disability_type TEXT,
  disability_duration TEXT,
  onset_date TEXT,
  current_symptoms TEXT,
  functional_limitations TEXT,
  current_medications TEXT,
  past_medications TEXT,
  allergies TEXT,
  previous_treatments TEXT,
  medical_history TEXT,
  requirement_type TEXT,
  therapy_needs TEXT,
  equipment_needs TEXT,
  caregiver_support TEXT,
  application_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create table for user prescriptions linked to applications
CREATE TABLE public.user_prescriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  application_id UUID REFERENCES public.user_applications(id) ON DELETE CASCADE,
  prescription_file_name TEXT,
  prescription_file_url TEXT,
  verification_date TIMESTAMP WITH TIME ZONE,
  extracted_medicines JSONB,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for user bookings linked to applications
CREATE TABLE public.user_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  application_id UUID REFERENCES public.user_applications(id) ON DELETE CASCADE,
  therapist_name TEXT,
  plan_name TEXT,
  plan_price TEXT,
  booking_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_applications
CREATE POLICY "Users can view their own applications" 
  ON public.user_applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications" 
  ON public.user_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications" 
  ON public.user_applications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for user_prescriptions
CREATE POLICY "Users can view their own prescriptions" 
  ON public.user_prescriptions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own prescriptions" 
  ON public.user_prescriptions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prescriptions" 
  ON public.user_prescriptions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for user_bookings
CREATE POLICY "Users can view their own bookings" 
  ON public.user_bookings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
  ON public.user_bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
  ON public.user_bookings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Update the profiles table trigger to handle application data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, parent_name, child_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'parent_name',
    NEW.raw_user_meta_data ->> 'child_name'
  );
  
  -- Create empty application record for the user
  INSERT INTO public.user_applications (user_id, parent_name, child_name, parent_email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'parent_name',
    NEW.raw_user_meta_data ->> 'child_name',
    NEW.email
  );
  
  RETURN NEW;
END;
$$;
