import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface WaveformPlayerProps {
  audioUrl: string;
  onPlaybackComplete?: () => void;
}

const WaveformPlayer: React.FC<WaveformPlayerProps> = ({ audioUrl, onPlaybackComplete }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4f46e5',
        progressColor: '#818cf8',
        cursorColor: '#818cf8',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 80,
        barGap: 3,
      });

      wavesurfer.current.load(audioUrl);

      wavesurfer.current.on('ready', () => {
        setDuration(wavesurfer.current?.getDuration() || 0);
      });

      wavesurfer.current.on('audioprocess', () => {
        setCurrentTime(wavesurfer.current?.getCurrentTime() || 0);
      });

      wavesurfer.current.on('finish', () => {
        setIsPlaying(false);
        if (onPlaybackComplete) {
          onPlaybackComplete();
        }
      });

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [audioUrl, onPlaybackComplete]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const skipBackward = () => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      wavesurfer.current.seekTo(Math.max(currentTime - 5, 0) / duration);
    }
  };

  const skipForward = () => {
    if (wavesurfer.current) {
      const currentTime = wavesurfer.current.getCurrentTime();
      wavesurfer.current.seekTo(Math.min(currentTime + 5, duration) / duration);
    }
  };

  return (
    <div className="w-full space-y-4 bg-chrome-800 p-6 rounded-lg border border-chrome-600">
      <div ref={waveformRef} />
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">{formatTime(currentTime)}</span>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={skipBackward}
            className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
            aria-label="Skip backward"
          >
            <SkipBack className="h-6 w-6" />
          </button>
          
          <button
            onClick={togglePlayPause}
            className="p-3 bg-indigo-600/20 text-indigo-400 rounded-full hover:bg-indigo-600/30 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </button>
          
          <button
            onClick={skipForward}
            className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
            aria-label="Skip forward"
          >
            <SkipForward className="h-6 w-6" />
          </button>
        </div>
        
        <span className="text-sm text-gray-400">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default WaveformPlayer;