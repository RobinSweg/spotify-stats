import { cookies } from 'next/headers';
import SpotifyWebApi from 'spotify-web-api-node';

export async function GET() {
  const token = cookies().get('spotify_token')?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: 'No token' }), { status: 401 });
  }

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(token);

  try {
    const data = await spotifyApi.getMyTopTracks();
    return Response.json(data.body);
  } catch (error) {
    console.error('Spotify API error:', error);
    return new Response(JSON.stringify({ error: 'Spotify API call failed' }), { status: 500 });
  }
}
