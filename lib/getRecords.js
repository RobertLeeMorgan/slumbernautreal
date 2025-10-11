'use server';

import { cache } from 'react';

export const getRecords = cache(async () => {
  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      cache: 'no-store',
    });

    if (!tokenRes.ok) {
      throw new Error(`Spotify auth failed: ${tokenRes.status}`);
    }

    const { access_token } = await tokenRes.json();

    const albumsRes = await fetch(
      'https://api.spotify.com/v1/artists/4Z4SX46wN0h6BL8geY82nt/albums?include_groups=single,album',
      {
        headers: { Authorization: `Bearer ${access_token}` },
        next: { revalidate: 86400 }, 
      }
    );

    if (!albumsRes.ok) {
      throw new Error(`Spotify API error: ${albumsRes.status}`);
    }

    const data = await albumsRes.json();
    const items = data?.items ?? [];

    if (!items.length) {
      console.warn('No Spotify albums found for artist.');
      return [];
    }

    const records = items.map((e) => {
      const isSingle = e.album_group === 'single';
      const releaseDate = new Date(e.release_date);
      const formattedName = e.name.replace(/\s/g, '');
      const price = isSingle ? 12.99 : 21.99;
      const vinylType = isSingle ? `7" Vinyl` : `12" Vinyl`;

      let link = `https://distrokid.com/hyperfollow/slumbernaut/${formattedName}`;
      if (releaseDate < new Date('2021-01-01')) {
        link = `https://hypeddit.com/slumbernaut/${formattedName}`;
      } else if (e.name === 'Taste of Spring (Edit)') {
        link = 'https://distrokid.com/hyperfollow/slumbernaut/taste-of-spring-edit';
      }

      return {
        id: e.id,
        title: e.name,
        name: `${e.name} ${isSingle ? 'EP' : 'LP'}`,
        price,
        description: `${e.name} ${vinylType}`,
        image: e.images?.[1]?.url ?? e.images?.[0]?.url ?? '',
        date: releaseDate.toISOString(),
        tag: e.album_group,
        link,
      };
    });

    records.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (records[0]) {
      records[0].tag = `New ${records[0].tag}`;
    }

    return records;
  } catch (err) {
    console.error('Failed to fetch Spotify records:', err);
    return [];
  }
});
