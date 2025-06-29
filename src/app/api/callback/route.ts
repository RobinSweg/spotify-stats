
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId:     process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
  redirectUri:  process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
});

export async function GET(req: Request) {
  try {
    const url  = new URL(req.url);
    const code = url.searchParams.get('code');

    const { body } = await spotifyApi.authorizationCodeGrant(code as string);
    const access_token = body.access_token;

    // redirect user to dashboard
    const redirect = new URL('/dashboard', req.url);
    redirect.searchParams.set('token', access_token);
    return Response.redirect(redirect);
  } catch (err) {
    console.error('Auth failed:', err);
    return new Response('Authentication failed', { status: 400 });
  }
}
