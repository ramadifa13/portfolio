export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          title: string | null;
          bio: string | null;
          avatar_url: string | null;
          resume_url: string | null;
          email: string | null;
          location: string | null;
          github_url: string | null;
          linkedin_url: string | null;
          twitter_url: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          full_name: string;
          title?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          resume_url?: string | null;
          email?: string | null;
          location?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string;
          title?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          resume_url?: string | null;
          email?: string | null;
          location?: string | null;
          github_url?: string | null;
          linkedin_url?: string | null;
          twitter_url?: string | null;
          updated_at?: string | null;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          long_description: string | null;
          tech_stack: string[] | null;
          image_url: string | null;
          additional_images: string[] | null;
          role: "solo" | "team" | null;
          project_type: "web" | "mobile" | "internal" | null;
          status: "draft" | "published" | null;
          featured: boolean | null;
          live_url: string | null;
          repo_url: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          long_description?: string | null;
          tech_stack?: string[] | null;
          image_url?: string | null;
          additional_images?: string[] | null;
          role?: "solo" | "team" | null;
          project_type?: "web" | "mobile" | "internal" | null;
          status?: "draft" | "published" | null;
          featured?: boolean | null;
          live_url?: string | null;
          repo_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          long_description?: string | null;
          tech_stack?: string[] | null;
          image_url?: string | null;
          additional_images?: string[] | null;
          role?: "solo" | "team" | null;
          project_type?: "web" | "mobile" | "internal" | null;
          status?: "draft" | "published" | null;
          featured?: boolean | null;
          live_url?: string | null;
          repo_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      experience: {
        Row: {
          id: string;
          company: string;
          position: string;
          location: string | null;
          start_date: string;
          end_date: string | null;
          description: string | null;
          is_current: boolean | null;
          technologies: string[] | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          company: string;
          position: string;
          location?: string | null;
          start_date: string;
          end_date?: string | null;
          description?: string | null;
          is_current?: boolean | null;
          technologies?: string[] | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          company?: string;
          position?: string;
          location?: string | null;
          start_date?: string;
          end_date?: string | null;
          description?: string | null;
          is_current?: boolean | null;
          technologies?: string[] | null;
          created_at?: string | null;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          proficiency: number | null;
          icon: string | null;
          featured: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          proficiency?: number | null;
          icon?: string | null;
          featured?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          proficiency?: number | null;
          icon?: string | null;
          featured?: boolean | null;
          created_at?: string | null;
        };
      };
      certifications: {
        Row: {
          id: string;
          name: string;
          issuer: string;
          issue_date: string | null;
          expiry_date: string | null;
          credential_id: string | null;
          credential_url: string | null;
          image_url: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          issuer: string;
          issue_date?: string | null;
          expiry_date?: string | null;
          credential_id?: string | null;
          credential_url?: string | null;
          image_url?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          issuer?: string;
          issue_date?: string | null;
          expiry_date?: string | null;
          credential_id?: string | null;
          credential_url?: string | null;
          image_url?: string | null;
          created_at?: string | null;
        };
      };
    };
  };
}
