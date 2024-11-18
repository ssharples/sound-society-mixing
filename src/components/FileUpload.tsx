import React, { useRef, useState } from 'react';
import { Upload, AlertCircle, Music2, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ALLOWED_AUDIO_TYPES } from '../lib/supabase';
import toast from 'react-hot-toast';

interface FileWithProgress {
  id: string;
  name: string;
  size: number;
  file: File;
  progress?: number;
  uploaded?: boolean;
}

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (!user) {
      toast.error('Please sign in to upload files');
      return;
    }

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = Array.from(newFiles).filter(file => {
      if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
        toast.error(`${file.name} is not a supported audio file`);
        return false;
      }
      return true;
    }).map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      file,
      progress: 0
    }));

    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleUpload = async () => {
    if (!user) {
      toast.error('Please sign in to upload files');
      return;
    }

    setUploading(true);

    try {
      for (const file of files) {
        if (!file.uploaded) {
          const onProgress = (progress: number) => {
            setFiles(prev => prev.map(f => 
              f.id === file.id ? { ...f, progress } : f
            ));
          };

          await uploadFile(file.file, user.id, onProgress);
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, uploaded: true } : f
          ));
        }
      }
      toast.success('Files uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-indigo-500/50 bg-indigo-500/10' : 'border-chrome-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ALLOWED_AUDIO_TYPES.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-400">
          Drag and drop your audio files here, or{' '}
          <span className="text-indigo-400 hover:text-indigo-300 cursor-pointer">browse</span>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          WAV, AIFF, or MP3 up to 2GB
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between bg-chrome-800 p-3 rounded-lg border border-chrome-600"
            >
              <div className="flex items-center min-w-0">
                <Music2 className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span className="ml-2 text-sm text-gray-300 truncate">{file.name}</span>
                <span className="ml-2 text-xs text-gray-400 flex-shrink-0">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
                {file.progress !== undefined && !file.uploaded && (
                  <div className="ml-4 w-24">
                    <div className="w-full bg-chrome-700 rounded-full h-1">
                      <div
                        className="bg-indigo-500 h-1 rounded-full transition-all"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {file.uploaded && <span className="ml-2 text-green-400">✓</span>}
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Remove file"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-start text-sm text-gray-500">
        <AlertCircle className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
        <p>
          For best results, please provide uncompressed WAV files at 44.1kHz/24bit or higher.
        </p>
      </div>

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={uploading || files.every(f => f.uploaded)}
          className="w-full px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-lg hover:bg-indigo-600/30 hover:shadow-neon transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload Files'}
        </button>
      )}

    </div>
  );
};

export default FileUpload;