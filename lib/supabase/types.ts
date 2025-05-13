export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          due_date: string | null
          status: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          due_date?: string | null
          status?: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          due_date?: string | null
          status?: string
          user_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          id: string
          title: string
          description: string | null
          start_time: string
          end_time: string
          location: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          start_time: string
          end_time: string
          location?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          start_time?: string
          end_time?: string
          location?: string | null
          created_by?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      session_participants: {
        Row: {
          id: string
          session_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_id: string
          joined_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string
          joined_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_participants_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "study_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_participants_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          id: string
          title: string
          description: string | null
          file_path: string
          file_type: string
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          file_path: string
          file_type: string
          uploaded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          file_path?: string
          file_type?: string
          uploaded_by?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      document_shares: {
        Row: {
          id: string
          document_id: string
          shared_with: string
          shared_by: string
          shared_at: string
        }
        Insert: {
          id?: string
          document_id: string
          shared_with: string
          shared_by: string
          shared_at?: string
        }
        Update: {
          id?: string
          document_id?: string
          shared_with?: string
          shared_by?: string
          shared_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_shares_document_id_fkey"
            columns: ["document_id"]
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_shares_shared_by_fkey"
            columns: ["shared_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_shares_shared_with_fkey"
            columns: ["shared_with"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          id: string
          content: string
          sender_id: string
          session_id: string
          sent_at: string
        }
        Insert: {
          id?: string
          content: string
          sender_id: string
          session_id: string
          sent_at?: string
        }
        Update: {
          id?: string
          content?: string
          sender_id?: string
          session_id?: string
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_session_id_fkey"
            columns: ["session_id"]
            referencedRelation: "study_sessions"
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
  }
}
