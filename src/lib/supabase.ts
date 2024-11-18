import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = 'https://aflxjobceqjpjftxwewp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmbHhqb2JjZXFqcGpmdHh3ZXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MzgxNDMsImV4cCI6MjA0NzUxNDE0M30.nWVRnDthpXBiQXmfD53hfbxJUeEPFapdYptaQJsJU6M'; // Your public anon key

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const ALLOWED_AUDIO_TYPES = [
  'audio/wav',
  'audio/x-wav',
  'audio/aiff',
  'audio/x-aiff',
  'audio/mpeg',
  'audio/mp3'
];

export const uploadFile = async (
  file: File,
  userId: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  const fileName = `${userId}/${Date.now()}-${file.name}`;

  const { error: uploadError, data } = await supabase.storage
    .from('file-uploads')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      onUploadProgress: (progress) => {
        const percentage = (progress.loaded / progress.total) * 100;
        onProgress?.(percentage);
      },
    });

  if (uploadError) {
    throw uploadError;
  }

  return data.path;
};