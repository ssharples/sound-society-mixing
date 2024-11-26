import React, { useState, useEffect } from 'react';
import { Search, Music2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Track {
  id: string;
  name: string;
  artists: string[];
  album: string;
  preview_url: string | null;
}

interface SpotifySearchProps {
  onTrackSelect: (track: Track) => void;
}

const SpotifySearch: React.FC<SpotifySearchProps> = ({ onTrackSelect }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const getSpotifyToken = async () => {
      try {
        const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
          },
          body: 'grant_type=client_credentials',
        });

        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error('Error getting Spotify token:', error);
        toast.error('Failed to connect to Spotify');
      }
    };

    getSpotifyToken();
  }, []);

  const searchSpotify = async () => {
    if (!query.trim() || !accessToken) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          query
        )}&type=track&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      const tracks: Track[] = data.tracks.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        artists: item.artists.map((artist: any) => artist.name),
        album: item.album.name,
        preview_url: item.preview_url,
      }));

      setSearchResults(tracks);
    } catch (error) {
      console.error('Error searching Spotify:', error);
      toast.error('Failed to search Spotify');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (query) searchSpotify();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [query, accessToken]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a reference track..."
          className="w-full px-4 py-2 pl-10 bg-chrome-700 border border-chrome-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {loading && (
        <div className="text-center text-gray-400">
          Searching...
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="space-y-2">
          {searchResults.map((track) => (
            <button
              key={track.id}
              onClick={() => onTrackSelect(track)}
              className="w-full p-3 bg-chrome-700 hover:bg-chrome-600 border border-chrome-600 rounded-lg transition-all flex items-center space-x-3"
            >
              <Music2 className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="text-gray-200 font-medium">{track.name}</div>
                <div className="text-gray-400 text-sm">
                  {track.artists.join(', ')} • {track.album}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
