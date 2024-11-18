import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { AudioMetrics, analyzeAudio } from '../lib/audio/analyzer';
import WaveformPlayer from '../components/WaveformPlayer';
import { CheckCircle, XCircle, AlertTriangle, MessageSquare, Music2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReviewFile {
  id: string;
  name: string;
  url: string;
  metrics?: AudioMetrics;
}

export default function QualityReview() {
  const { projectId } = useParams<{ projectId: string }>();
  const [files, setFiles] = useState<ReviewFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [selectedFile, setSelectedFile] = useState<ReviewFile | null>(null);

  useEffect(() => {
    fetchFiles();
  }, [projectId]);

  const fetchFiles = async () => {
    try {
      const { data: projectFiles, error } = await supabase
        .from('files')
        .select('*')
        .eq('project_id', projectId);

      if (error) throw error;

      const filesWithUrls = await Promise.all(
        projectFiles.map(async (file) => {
          const { data: { publicUrl } } = supabase.storage
            .from('audio-files')
            .getPublicUrl(file.path);

          return {
            id: file.id,
            name: file.name,
            url: publicUrl
          };
        })
      );

      setFiles(filesWithUrls);
      if (filesWithUrls.length > 0) {
        setSelectedFile(filesWithUrls[0]);
      }
    } catch (error) {
      toast.error('Failed to load files');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeSelectedFile = async () => {
    if (!selectedFile) return;

    try {
      const metrics = await analyzeAudio(selectedFile.url);
      setSelectedFile({ ...selectedFile, metrics });
    } catch (error) {
      toast.error('Failed to analyze audio');
      console.error('Analysis error:', error);
    }
  };

  const handleReviewSubmit = async (status: 'approved' | 'rejected') => {
    if (!selectedFile || !feedback.trim()) {
      toast.error('Please provide feedback before submitting');
      return;
    }

    try {
      const { error } = await supabase
        .from('file_reviews')
        .insert({
          file_id: selectedFile.id,
          status,
          feedback,
          metrics: selectedFile.metrics,
          reviewed_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success(`File ${status === 'approved' ? 'approved' : 'rejected'}`);
      setFeedback('');
    } catch (error) {
      toast.error('Failed to submit review');
      console.error('Review error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-chrome-900 pt-16 flex items-center justify-center">
        <div className="text-gray-400">Loading files...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-chrome-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent mb-8">
          Quality Review
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* File List */}
          <div className="lg:col-span-1 space-y-4">
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedFile?.id === file.id
                    ? 'bg-chrome-700 border border-indigo-500/30'
                    : 'bg-chrome-800 border border-chrome-600 hover:border-indigo-500/30'
                }`}
              >
                <h3 className="text-gray-100 font-medium">{file.name}</h3>
              </div>
            ))}
          </div>

          {/* Audio Player and Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {selectedFile && (
              <>
                <WaveformPlayer url={selectedFile.url} title={selectedFile.name} />

                <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-100">Audio Analysis</h2>
                    <button
                      onClick={analyzeSelectedFile}
                      className="px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded hover:bg-indigo-600/30 hover:shadow-neon transition-all"
                    >
                      Analyze Audio
                    </button>
                  </div>

                  {selectedFile.metrics ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-chrome-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Peak Level</span>
                          <span className={`text-${selectedFile.metrics.peakLevel > 0.99 ? 'red' : 'green'}-400`}>
                            {(selectedFile.metrics.peakLevel * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-chrome-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              selectedFile.metrics.peakLevel > 0.99 ? 'bg-red-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${selectedFile.metrics.peakLevel * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-chrome-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Dynamic Range</span>
                          <span className={`text-${selectedFile.metrics.dynamicRange < 6 ? 'yellow' : 'green'}-400`}>
                            {selectedFile.metrics.dynamicRange.toFixed(1)} dB
                          </span>
                        </div>
                        <div className="w-full bg-chrome-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              selectedFile.metrics.dynamicRange < 6 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min((selectedFile.metrics.dynamicRange / 20) * 100, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-chrome-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Clipping Points</span>
                          <span className={`text-${selectedFile.metrics.clippingPoints > 0 ? 'red' : 'green'}-400`}>
                            {selectedFile.metrics.clippingPoints}
                          </span>
                        </div>
                      </div>

                      <div className="bg-chrome-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Duration</span>
                          <span className="text-gray-300">
                            {Math.floor(selectedFile.metrics.duration / 60)}:
                            {Math.floor(selectedFile.metrics.duration % 60).toString().padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      Click "Analyze Audio" to check file quality
                    </div>
                  )}
                </div>

                {/* Feedback Form */}
                <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">Review Feedback</h2>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide detailed feedback about the audio quality..."
                    className="w-full h-32 bg-chrome-700 border border-chrome-600 rounded-lg p-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                  />
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleReviewSubmit('rejected')}
                      className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded hover:bg-red-600/30 transition-all"
                    >
                      Request Re-recording
                    </button>
                    <button
                      onClick={() => handleReviewSubmit('approved')}
                      className="px-4 py-2 bg-green-600/20 text-green-400 border border-green-500/30 rounded hover:bg-green-600/30 transition-all"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}