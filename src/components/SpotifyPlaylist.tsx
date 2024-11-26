import React, { useState, useEffect } from 'react';
import { Music2, Play, Pause } from 'lucide-react';
import toast from 'react-hot-toast';

interface Track {
  id: string;
  name: string;
  artists: string[];
  album: string;
  preview_url: string | null;
}

const SpotifyPlaylist: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const getSpotifyToken = async () => {
      try {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
        const playlistId = import.meta.env.VITE_SPOTIFY_PLAYLIST_ID;

        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
          },
          body: 'grant_type=client_credentials',
        });

        const data = await response.json();
        const accessToken = data.access_token;

        // Fetch playlist tracks
        const playlistResponse = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=5`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const playlistData = await playlistResponse.json();
        const formattedTracks: Track[] = playlistData.items.map((item: any) => ({
          id: item.track.id,
          name: item.track.name,
          artists: item.track.artists.map((artist: any) => artist.name),
          album: item.track.album.name,
          preview_url: item.track.preview_url,
        }));

        setTracks(formattedTracks);
      } catch (error) {
        console.error('Error fetching playlist:', error);
        toast.error('Failed to load playlist');
      } finally {
        setLoading(false);
      }
    };

    getSpotifyToken();

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  const handlePlayPause = (track: Track) => {
    if (!track.preview_url) {
      toast.error('No preview available for this track');
      return;
    }

    if (currentlyPlaying === track.id) {
      audioElement?.pause();
      setCurrentlyPlaying(null);
      setAudioElement(null);
    } else {
      if (audioElement) {
        audioElement.pause();
      }
      const audio = new Audio(track.preview_url);
      audio.play();
      setCurrentlyPlaying(track.id);
      setAudioElement(audio);
      audio.addEventListener('ended', () => {
        setCurrentlyPlaying(null);
        setAudioElement(null);
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-400">
        Loading playlist...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Featured Tracks</h2>
      <div className="grid gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="flex items-center p-4 bg-chrome-800 border border-chrome-600 rounded-lg hover:bg-chrome-700 transition-all group"
          >
            <button
              onClick={() => handlePlayPause(track)}
              className="mr-4 p-2 bg-indigo-600/20 rounded-lg group-hover:bg-indigo-600/30 transition-all"
              disabled={!track.preview_url}
            >
              {currentlyPlaying === track.id ? (
                <Pause className="h-5 w-5 text-indigo-400" />
              ) : (
                <Play className="h-5 w-5 text-indigo-400" />
              )}
            </button>
            <div className="flex-1">
              <div className="text-gray-200 font-medium">{track.name}</div>
              <div className="text-gray-400 text-sm">
                {track.artists.join(', ')} • {track.album}
              </div>
            </div>
            <Music2 className="h-5 w-5 text-gray-400 opacity-50" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpotifyPlaylist;
