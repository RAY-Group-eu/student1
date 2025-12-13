export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in_progress' | 'done' | 'cancelled';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          user_id: string;
          created_at: string;
          updated_at: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
        };
        Insert: {
          user_id?: string;
          created_at?: string;
          updated_at?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Update: {
          user_id?: string;
          created_at?: string;
          updated_at?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
          updated_at: string;
          title: string;
          description: string | null;
          starts_at: string | null;
          ends_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          description?: string | null;
          starts_at?: string | null;
          ends_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          description?: string | null;
          starts_at?: string | null;
          ends_at?: string | null;
        };
        Relationships: [];
      };
      event_study_days: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          created_at: string;
          updated_at: string;
          study_date: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string;
          event_id: string;
          created_at?: string;
          updated_at?: string;
          study_date: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_id?: string;
          created_at?: string;
          updated_at?: string;
          study_date?: string;
          notes?: string | null;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          id: string;
          user_id: string;
          event_id: string;
          event_study_day_id: string | null;
          created_at: string;
          updated_at: string;
          title: string;
          description: string | null;
          due_at: string | null;
          priority: TaskPriority;
          status: TaskStatus;
          is_study_task: boolean;
        };
        Insert: {
          id?: string;
          user_id?: string;
          event_id: string;
          event_study_day_id?: string | null;
          created_at?: string;
          updated_at?: string;
          title: string;
          description?: string | null;
          due_at?: string | null;
          priority?: TaskPriority;
          status?: TaskStatus;
          is_study_task?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_id?: string;
          event_study_day_id?: string | null;
          created_at?: string;
          updated_at?: string;
          title?: string;
          description?: string | null;
          due_at?: string | null;
          priority?: TaskPriority;
          status?: TaskStatus;
          is_study_task?: boolean;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      upsert_profile: {
        Args: {
          p_username?: string | null;
          p_full_name?: string | null;
          p_avatar_url?: string | null;
        };
        Returns: Database['public']['Tables']['profiles']['Row'];
      };
    };
    Enums: {
      task_priority: TaskPriority;
      task_status: TaskStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};

export type PublicSchema = Database['public'];
export type Tables = PublicSchema['Tables'];
export type Profile = Tables['profiles']['Row'];
export type Event = Tables['events']['Row'];
export type EventStudyDay = Tables['event_study_days']['Row'];
export type Task = Tables['tasks']['Row'];
