"use client";

export default function LoginPage() {
  const handleLogin = () => {
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirect_uri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scope = "user-top-read user-read-recently-played";

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Shergill's Spotify Stats</h1>
        <p>See your top tracks, artists & more!</p>
        <button
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
        >
          Log in with Spotify
        </button>
      </div>
    </div>
  );
}
