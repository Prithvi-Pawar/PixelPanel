"use client";

import { useState, useEffect } from 'react';
import type { Media } from '@/lib/types';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import { LoadingState } from './loading-state';
import { Hero } from './hero';
import { ContentSlider } from './content-slider';

interface HomepageData {
  trending: Media[];
  topRated: Media[];
  popularThisSeason: Media[];
  allTimePopular: Media[];
}

const HOMEPAGE_QUERY = `
  query GetHomepageData {
    trending: Page(page: 1, perPage: 10) {
      media(type: ANIME, sort: TRENDING_DESC, isAdult: false) { ...mediaFields }
    }
    topRated: Page(page: 1, perPage: 15) {
      media(type: ANIME, sort: SCORE_DESC, isAdult: false) { ...mediaFields }
    }
    popularThisSeason: Page(page: 1, perPage: 15) {
        media(type: ANIME, sort: POPULARITY_DESC, season: CURRENT, isAdult: false) { ...mediaFields }
    }
    allTimePopular: Page(page: 1, perPage: 15) {
        media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) { ...mediaFields }
    }
  }
  ${mediaFragment}
`;

export function Homepage() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await fetchAnilistData<any>(HOMEPAGE_QUERY);
        setData({
          trending: result.data.trending.media,
          topRated: result.data.topRated.media,
          popularThisSeason: result.data.popularThisSeason.media,
          allTimePopular: result.data.allTimePopular.media,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <div className="flex h-screen items-center justify-center text-destructive">Failed to load data. Please try again later.</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <main>
        <Hero trending={data.trending} type="ANIME" />
        <div className="flex flex-col space-y-12 md:space-y-16 py-12 md:py-16">
          <ContentSlider title="Trending Now" items={data.trending} type="anime" />
          <ContentSlider title="Top Rated By Fans" items={data.topRated} type="anime" />
          <ContentSlider title="Seasonal Picks" items={data.popularThisSeason} type="anime" />
          <ContentSlider title="All Time Popular" items={data.allTimePopular} type="anime" />
        </div>
      </main>
    </div>
  );
}
