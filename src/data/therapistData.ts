
export interface Therapist {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  qualifications: string[];
  languages: string[];
  about: string;
  availability: string[];
  consultationFee: number;
  sessionDuration: number;
  approachStyle: string;
  specializations: string[];
}

export const hyderabadTherapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialty: "Child Development Therapist",
    experience: 12,
    rating: 4.8,
    reviewCount: 156,
    location: "Banjara Hills, Hyderabad",
    image: "/placeholder.svg",
    qualifications: ["M.Phil in Clinical Psychology", "Ph.D in Child Development", "Certified ABA Therapist"],
    languages: ["English", "Hindi", "Telugu"],
    about: "Dr. Priya specializes in developmental disorders and has extensive experience working with children with autism spectrum disorders. She uses evidence-based approaches including ABA and play therapy.",
    availability: ["Monday", "Tuesday", "Wednesday", "Friday"],
    consultationFee: 1500,
    sessionDuration: 60,
    approachStyle: "Applied Behavior Analysis (ABA)",
    specializations: ["Autism Spectrum Disorders", "ADHD", "Learning Disabilities", "Social Skills Training"]
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialty: "Occupational Therapist",
    experience: 8,
    rating: 4.7,
    reviewCount: 203,
    location: "Jubilee Hills, Hyderabad",
    image: "/placeholder.svg",
    qualifications: ["Master's in Occupational Therapy", "Sensory Integration Certified", "NDT Certified"],
    languages: ["English", "Hindi", "Telugu", "Urdu"],
    about: "Specialized in sensory integration therapy and motor skill development. Dr. Rajesh has helped hundreds of children improve their daily living skills and sensory processing abilities.",
    availability: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    consultationFee: 1200,
    sessionDuration: 45,
    approachStyle: "Sensory Integration Therapy",
    specializations: ["Sensory Processing Disorders", "Fine Motor Skills", "Gross Motor Skills", "Daily Living Activities"]
  },
  {
    id: "3",
    name: "Ms. Ananya Reddy",
    specialty: "Speech Language Pathologist",
    experience: 10,
    rating: 4.9,
    reviewCount: 187,
    location: "Gachibowli, Hyderabad",
    image: "/placeholder.svg",
    qualifications: ["MASLP", "PROMPT Certified", "Hanen Program Certified"],
    languages: ["English", "Telugu", "Hindi"],
    about: "Expert in communication disorders with a focus on early intervention. Ananya uses innovative techniques to help children develop speech and language skills effectively.",
    availability: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
    consultationFee: 1300,
    sessionDuration: 50,
    approachStyle: "PROMPT Technique",
    specializations: ["Speech Delays", "Language Disorders", "Articulation", "Stuttering", "Voice Disorders"]
  },
  {
    id: "4",
    name: "Dr. Mohammad Ali Khan",
    specialty: "Clinical Psychologist",
    experience: 15,
    rating: 4.8,
    reviewCount: 234,
    location: "Kondapur, Hyderabad",
    image: "/placeholder.svg",
    qualifications: ["Ph.D in Clinical Psychology", "RCI Licensed", "CBT Certified"],
    languages: ["English", "Hindi", "Urdu", "Telugu"],
    about: "With over 15 years of experience, Dr. Khan specializes in behavioral interventions and family therapy. He works closely with families to create supportive environments for children with special needs.",
    availability: ["Monday", "Wednesday", "Thursday", "Friday"],
    consultationFee: 1800,
    sessionDuration: 60,
    approachStyle: "Cognitive Behavioral Therapy",
    specializations: ["Behavioral Issues", "Anxiety Disorders", "Family Therapy", "Parent Training"]
  },
  {
    id: "5",
    name: "Dr. Sunitha Nair",
    specialty: "Developmental Pediatrician",
    experience: 18,
    rating: 4.9,
    reviewCount: 312,
    location: "Hitech City, Hyderabad",
    image: "/placeholder.svg",
    qualifications: ["MBBS", "MD Pediatrics", "Fellowship in Developmental Pediatrics"],
    languages: ["English", "Hindi", "Malayalam", "Telugu"],
    about: "Dr. Sunitha is a renowned developmental pediatrician with expertise in early diagnosis and intervention. She provides comprehensive developmental assessments and treatment plans.",
    availability: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
    consultationFee: 2000,
    sessionDuration: 45,
    approachStyle: "Medical Model with Holistic Approach",
    specializations: ["Developmental Delays", "Autism Diagnosis", "ADHD", "Genetic Disorders", "Early Intervention"]
  },
  {
    id: "6",
    name: "Ms. Kavitha Rao",
    specialty: "Special Education Teacher",
    experience: 9,
    rating: 4.6,
    reviewCount: 145,
    location: "Madhapur, Hyderabad",
    image: "/placeholder.svg",
    qualifications: ["M.Ed Special Education", "B.Ed", "Montessori Certified"],
    languages: ["English", "Telugu", "Hindi", "Kannada"],
    about: "Passionate about inclusive education, Kavitha specializes in creating individualized learning programs for children with diverse learning needs using creative and engaging methods.",
    availability: ["Monday", "Tuesday", "Thursday", "Friday"],
    consultationFee: 1000,
    sessionDuration: 60,
    approachStyle: "Individualized Education Program (IEP)",
    specializations: ["Learning Disabilities", "Intellectual Disabilities", "Academic Skills", "Social Skills"]
  },
  {
    id: "7",
    name: "Dr. Vikram Agarwal",
    specialty: "Physiotherapist",
    experience: 11,
    rating: 4.7,
    reviewCount: 189,
    location: "Begumpet, Hyderabad",
    image: "/placeholder.svg",
    qualifications: ["BPT", "MPT in Neurology", "Bobath Certified"],
    languages: ["English", "Hindi", "Telugu"],
    about: "Dr. Vikram specializes in pediatric physiotherapy with focus on neurological conditions. He helps children improve their motor functions and achieve developmental milestones.",
    availability: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday"],
    consultationFee: 1100,
    sessionDuration: 45,
    approachStyle: "Neurodevelopmental Treatment (NDT)",
    specializations: ["Cerebral Palsy", "Motor Delays", "Muscle Weakness", "Coordination Issues"]
  },
  {
    id: "8",
    name: "Ms. Fatima Sheikh",
    specialty: "Behavior Analyst",
    experience: 7,
    rating: 4.8,
    reviewCount: 167,
    location: "Secunderabad, Hyderabad",
    image: "/placeholder.svg",
    qualifications: ["BCBA Certified", "M.A. Psychology", "ABA Intensive Training"],
    languages: ["English", "Hindi", "Urdu"],
    about: "Certified Behavior Analyst with expertise in designing and implementing behavior intervention programs. Fatima works with families to reduce challenging behaviors and increase positive behaviors.",
    availability: ["Tuesday", "Wednesday", "Friday", "Saturday"],
    consultationFee: 1400,
    sessionDuration: 60,
    approachStyle: "Applied Behavior Analysis",
    specializations: ["Challenging Behaviors", "Self-Help Skills", "Communication Training", "Social Behaviors"]
  }
];

export const getTherapistById = (id: string): Therapist | undefined => {
  return hyderabadTherapists.find(therapist => therapist.id === id);
};

export const getTherapistsBySpecialty = (specialty: string): Therapist[] => {
  return hyderabadTherapists.filter(therapist => 
    therapist.specialty.toLowerCase().includes(specialty.toLowerCase()) ||
    therapist.specializations.some(spec => spec.toLowerCase().includes(specialty.toLowerCase()))
  );
};
