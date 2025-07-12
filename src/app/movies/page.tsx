'use client';

import { MediaGrid } from '@/components/media-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import { getSeason, getYear } from '@/lib/date-utils';
import type { Media } from '@/lib/types';
import { useEffect, useState } from 'react';

type MediaData = {
  allTime: Media[];
  thisMonth: Media[];
  thisWeek: Media[];
};

const MOVIES_QUERY = (sort: string, page: number = 1, perPage: number = 20) => `
  query GetMovies($season: MediaSeason, $seasonYear: Int) {
    page: Page(page: ${page}, perPage: ${perPage}) {
      media(sort: ${sort}, type: ANIME, format: MOVIE, season: $season, seasonYear: $seasonYear) {
        ...mediaFields
      }
    }
  }
  ${mediaFragment}
`;

export default function MoviesPage() {
  const [data, setData] = useState<MediaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const [allTimeRes, thisMonthRes, thisWeekRes] = await Promise.all([
          fetchAnilistData<{ page: { media: Media[] } }>(MOVIES_QUERY('POPULARITY_DESC')),
          fetchAnilistData<{ page: { media: Media[] } }>(MOVIES_QUERY('POPULARITY_DESC'), {
            season: getSeason(),
            seasonYear: getYear(),
          }),
           fetchAnilistData<{ page: { media: Media[] } }>(MOVIES_QUERY('POPULARITY_DESC', 1, 10), {
            season: getSeason(),
            seasonYear: getYear(),
          }),
        ]);

        setData({
          allTime: allTimeRes.data.page.media,
          thisMonth: thisMonthRes.data.page.media,
          thisWeek: thisWeekRes.data.page.media.slice(0,10),
        });
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center text-red-500">Failed to load movie data.</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline tracking-wider">Movies</h1>
      <Tabs defaultValue="all-time">
        <TabsList>
          <TabsTrigger value="all-time">All Time</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
        </TabsList>
        <TabsContent value="all-time">
          <MediaGrid media={data.allTime} />
        </TabsContent>
        <TabsContent value="this-month">
          <MediaGrid media={data.thisMonth} />
        </TabsContent>
        <TabsContent value="this-week">
          <MediaGrid media={data.thisWeek} />
        </TabsContent>
      </Tabs>
    </div>
  );
}