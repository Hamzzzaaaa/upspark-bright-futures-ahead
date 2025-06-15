export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          child_name: string
          created_at: string
          id: string
          parent_name: string
          updated_at: string
        }
        Insert: {
          child_name: string
          created_at?: string
          id: string
          parent_name: string
          updated_at?: string
        }
        Update: {
          child_name?: string
          created_at?: string
          id?: string
          parent_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_applications: {
        Row: {
          address: string | null
          allergies: string | null
          application_complete: boolean | null
          caregiver_support: string | null
          child_age: number | null
          child_gender: string | null
          child_name: string
          created_at: string
          current_medications: string | null
          current_symptoms: string | null
          disability_duration: string | null
          disability_type: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          equipment_needs: string | null
          functional_limitations: string | null
          id: string
          medical_history: string | null
          onset_date: string | null
          parent_email: string | null
          parent_name: string
          parent_phone: string | null
          past_medications: string | null
          previous_treatments: string | null
          requirement_type: string | null
          therapy_needs: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          allergies?: string | null
          application_complete?: boolean | null
          caregiver_support?: string | null
          child_age?: number | null
          child_gender?: string | null
          child_name: string
          created_at?: string
          current_medications?: string | null
          current_symptoms?: string | null
          disability_duration?: string | null
          disability_type?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          equipment_needs?: string | null
          functional_limitations?: string | null
          id?: string
          medical_history?: string | null
          onset_date?: string | null
          parent_email?: string | null
          parent_name: string
          parent_phone?: string | null
          past_medications?: string | null
          previous_treatments?: string | null
          requirement_type?: string | null
          therapy_needs?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          allergies?: string | null
          application_complete?: boolean | null
          caregiver_support?: string | null
          child_age?: number | null
          child_gender?: string | null
          child_name?: string
          created_at?: string
          current_medications?: string | null
          current_symptoms?: string | null
          disability_duration?: string | null
          disability_type?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          equipment_needs?: string | null
          functional_limitations?: string | null
          id?: string
          medical_history?: string | null
          onset_date?: string | null
          parent_email?: string | null
          parent_name?: string
          parent_phone?: string | null
          past_medications?: string | null
          previous_treatments?: string | null
          requirement_type?: string | null
          therapy_needs?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_bookings: {
        Row: {
          application_id: string | null
          booking_date: string | null
          created_at: string
          id: string
          plan_name: string | null
          plan_price: string | null
          therapist_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_id?: string | null
          booking_date?: string | null
          created_at?: string
          id?: string
          plan_name?: string | null
          plan_price?: string | null
          therapist_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_id?: string | null
          booking_date?: string | null
          created_at?: string
          id?: string
          plan_name?: string | null
          plan_price?: string | null
          therapist_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_bookings_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "user_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_prescriptions: {
        Row: {
          application_id: string | null
          created_at: string
          extracted_medicines: Json | null
          id: string
          is_verified: boolean | null
          prescription_file_name: string | null
          prescription_file_url: string | null
          updated_at: string
          user_id: string
          verification_date: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          extracted_medicines?: Json | null
          id?: string
          is_verified?: boolean | null
          prescription_file_name?: string | null
          prescription_file_url?: string | null
          updated_at?: string
          user_id: string
          verification_date?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string
          extracted_medicines?: Json | null
          id?: string
          is_verified?: boolean | null
          prescription_file_name?: string | null
          prescription_file_url?: string | null
          updated_at?: string
          user_id?: string
          verification_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_prescriptions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "user_applications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
