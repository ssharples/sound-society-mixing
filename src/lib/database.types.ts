export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string
          client_id: string
          status: 'pending' | 'in-progress' | 'review' | 'completed'
          due_date: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description: string
          client_id: string
          status?: 'pending' | 'in-progress' | 'review' | 'completed'
          due_date: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string
          client_id?: string
          status?: 'pending' | 'in-progress' | 'review' | 'completed'
          due_date?: string
        }
      }
      revisions: {
        Row: {
          id: string
          project_id: string
          title: string
          description: string
          priority: 'low' | 'medium' | 'high' | 'urgent'
          status: 'pending' | 'in-progress' | 'review' | 'completed'
          assignee_id: string
          created_at: string
          updated_at: string
          due_date: string
        }
        Insert: {
          id?: string
          project_id: string
          title: string
          description: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'pending' | 'in-progress' | 'review' | 'completed'
          assignee_id: string
          created_at?: string
          updated_at?: string
          due_date: string
        }
        Update: {
          id?: string
          project_id?: string
          title?: string
          description?: string
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'pending' | 'in-progress' | 'review' | 'completed'
          assignee_id?: string
          created_at?: string
          updated_at?: string
          due_date?: string
        }
      }
      comments: {
        Row: {
          id: string
          project_id: string
          user_id: string
          content: string
          created_at: string
          parent_id: string | null
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          content: string
          created_at?: string
          parent_id?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          content?: string
          created_at?: string
          parent_id?: string | null
        }
      }
      files: {
        Row: {
          id: string
          project_id: string
          revision_id: string | null
          path: string
          name: string
          size: number
          type: string
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          revision_id?: string | null
          path: string
          name: string
          size: number
          type: string
          uploaded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          revision_id?: string | null
          path?: string
          name?: string
          size?: number
          type?: string
          uploaded_by?: string
          created_at?: string
        }
      }
      changelog: {
        Row: {
          id: string
          project_id: string
          version: string
          description: string
          changes: string[]
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          version: string
          description: string
          changes: string[]
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          version?: string
          description?: string
          changes?: string[]
          user_id?: string
          created_at?: string
        }
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
}</content>