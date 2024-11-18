import React, { useState, useRef, useEffect } from 'react';
import { Music2, Pencil, Check, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface FileListProps {
  files: Array<{
    id: string;
    name: string;
    size: number;
    url?: string;
  }>;
  onFileRenamed: (fileId: string, newName: string) => void;
}

interface RenameState {
  fileId: string | null;
  name: string;
}

export default function FileList({ files, onFileRenamed }: FileListProps) {
  const [renaming, setRenaming] = useState<RenameState>({ fileId: null, name: '' });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (renaming.fileId && inputRef.current) {
      inputRef.current.focus();
      // Select filename without extension
      const lastDotIndex = renaming.name.lastIndexOf('.');
      inputRef.current.setSelectionRange(0, lastDotIndex);
    }
  }, [renaming.fileId]);

  const startRename = (fileId: string, currentName: string) => {
    setRenaming({ fileId, name: currentName });
  };

  const cancelRename = () => {
    setRenaming({ fileId: null, name: '' });
  };

  const validateFileName = (name: string): boolean => {
    // Check for illegal characters
    const illegalChars = /[<>:"\/\\|?*\x00-\x1F]/g;
    if (illegalChars.test(name)) {
      toast.error('Filename contains invalid characters');
      return false;
    }

    // Check for duplicates (preserve original extension)
    const nameWithoutExt = name.substring(0, name.lastIndexOf('.'));
    const duplicates = files.filter(file => {
      const existingNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.'));
      return existingNameWithoutExt === nameWithoutExt && file.id !== renaming.fileId;
    });

    if (duplicates.length > 0) {
      toast.error('A file with this name already exists');
      return false;
    }

    return true;
  };

  const handleRename = async (fileId: string, newName: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    // Preserve file extension
    const currentExt = file.name.split('.').pop();
    const newNameWithoutExt = newName.substring(0, newName.lastIndexOf('.'));
    const finalName = `${newNameWithoutExt}.${currentExt}`;

    if (!validateFileName(finalName)) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('files')
        .update({ name: finalName })
        .eq('id', fileId);

      if (error) throw error;

      onFileRenamed(fileId, finalName);
      toast.success('File renamed successfully');
    } catch (error) {
      console.error('Error renaming file:', error);
      toast.error('Failed to rename file');
    } finally {
      setLoading(false);
      cancelRename();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, fileId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRename(fileId, renaming.name);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelRename();
    }
  };

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between bg-chrome-700 p-3 rounded-lg border border-chrome-600 hover:border-indigo-500/30 transition-all"
          onDoubleClick={() => !renaming.fileId && startRename(file.id, file.name)}
        >
          <div className="flex items-center flex-1 min-w-0">
            <Music2 className="h-5 w-5 text-gray-400 flex-shrink-0" />
            {renaming.fileId === file.id ? (
              <div className="ml-2 flex-1 flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={renaming.name}
                  onChange={(e) => setRenaming(prev => ({ ...prev, name: e.target.value }))}
                  onKeyDown={(e) => handleKeyDown(e, file.id)}
                  className="flex-1 bg-chrome-800 border border-indigo-500/30 rounded px-2 py-1 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={loading}
                />
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleRename(file.id, renaming.name)}
                    disabled={loading}
                    className="p-1 text-green-400 hover:text-green-300 disabled:opacity-50"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={cancelRename}
                    disabled={loading}
                    className="p-1 text-red-400 hover:text-red-300 disabled:opacity-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="ml-2 text-sm text-gray-100 truncate">{file.name}</span>
                <button
                  onClick={() => startRename(file.id, file.name)}
                  className="ml-2 p-1 text-gray-400 hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
          <span className="ml-2 text-xs text-gray-400 flex-shrink-0">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </span>
        </div>
      ))}
    </div>
  );
}