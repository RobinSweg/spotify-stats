'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Dashboard() {
  // reading token from url right now (insecure TODO)
  const params = useSearchParams();
  const token  = params.get('token');
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=50', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => setTracks(data.items || []))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Top Tracks</h1>
      <ul>
        {tracks.map((t: { id: string; name: string; artists: { name: string }[] }) => (
          <li key={t.id}>{t.name} — {t.artists[0].name}</li>
        ))}
      </ul>
    </div>
  );
}
