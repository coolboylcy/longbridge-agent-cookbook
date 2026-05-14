export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  cookbook: {
    Tables: {
      run_logs: {
        Row: {
          id: string;
          app: string;
          input: Json | null;
          output: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          app: string;
          input?: Json | null;
          output?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          app?: string;
          input?: Json | null;
          output?: Json | null;
          created_at?: string;
        };
      };
    };
  };
}
