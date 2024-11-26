const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_PLAYLIST_ID = import.meta.env.VITE_SPOTIFY_PLAYLIST_ID;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  throw new Error('Missing Spotify credentials in environment variables');
}

export async function getSpotifyToken(): Promise<string> {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error('Failed to get Spotify token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw error;
  }
}

export async function searchTracks(query: string, token: string) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search tracks');
    }

    const data = await response.json();
    return data.tracks.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      artists: item.artists.map((artist: any) => artist.name),
      album: item.album.name,
      preview_url: item.preview_url,
    }));
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
}

export async function getPlaylistTracks(token: string) {
  if (!SPOTIFY_PLAYLIST_ID) {
    throw new Error('Missing Spotify playlist ID in environment variables');
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${SPOTIFY_PLAYLIST_ID}/tracks?limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch playlist');
    }

    const data = await response.json();
    return data.items.map((item: any) => ({
      id: item.track.id,
      name: item.track.name,
      artists: item.track.artists.map((artist: any) => artist.name),
      album: item.track.album.name,
      preview_url: item.track.preview_url,
    }));
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
}

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: string[];
  album: string;
  preview_url: string | null;
};
