import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
