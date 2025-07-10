"use client";

import { useState, useEffect } from 'react';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import type { Media } from '@/lib/types';
import { LoadingState } from './loading-state';
import { Hero } from './hero';
import { ContentGrid } from './content-grid';
import { Button } from './ui/button';
import { ContentSlider } from './content-slider';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

interface MangaData {
  hero: Media[];
  specialForYou: Media[];
  popularThisSeason: Media[];
  topRated: Media[];
}

type TrendingPeriod = 'weekly' | 'monthly';

const MANGA_PAGE_QUERY = `
  query GetMangaPageData {
    hero: Page(page: 1, perPage: 10) {
      media(type: MANGA, sort: TRENDING_DESC, isAdult: false) { ...mediaFields }
    }
    specialForYou: Page(page: 1, perPage: 15) {
      media(type: MANGA, sort: POPULARITY_DESC, isAdult: false) { ...mediaFields }
    }
    popularThisSeason: Page(page: 1, perPage: 15) {
      media(type: MANGA, sort: POPULARITY_DESC, status: RELEASING, isAdult: false) { ...mediaFields }
    }
    topRated: Page(page: 1, perPage: 6) {
      media(type: MANGA, sort: SCORE_DESC, isAdult: false) { ...mediaFields }
    }
  }
  ${mediaFragment}
`;

const TRENDING_MANGA_QUERY = `
  query GetTrendingManga($page: Int, $perPage: Int, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(type: MANGA, sort: $sort, isAdult: false) {
        ...mediaFields
      }
    }
  }
  ${mediaFragment}
`;

export function MangaView() {
  const [data, setData] = useState<MangaData | null>(null);
  const [popularItems, setPopularItems] = useState<Media[]>([]);
  const [popularPage, setPopularPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [trendingPeriod, setTrendingPeriod] = useState<TrendingPeriod>('weekly');
  const [trendingItems, setTrendingItems] = useState<Media[]>([]);
  const [trendingPage, setTrendingPage] = useState(1);
  const [trendingHasNextPage, setTrendingHasNextPage] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(false);

  const fetchTrendingData = async (page: number, period: TrendingPeriod) => {
    const sort = period === 'weekly' ? ['TRENDING_DESC'] : ['POPULARITY_DESC'];
    return fetchAnilistData<{ Page: { media: Media[], pageInfo: { hasNextPage: boolean } } }>(TRENDING_MANGA_QUERY, { page, perPage: 12, sort });
  };

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [pageData, popularData, trendingData] = await Promise.all([
          fetchAnilistData<any>(MANGA_PAGE_QUERY),
          fetchAnilistData<{ Page: { media: Media[], pageInfo: { hasNextPage: boolean } } }>(TRENDING_MANGA_QUERY, { page: 1, perPage: 12, sort: ['POPULARITY_DESC'] }),
          fetchTrendingData(1, trendingPeriod)
        ]);

        setData({
          hero: pageData.data.hero.media,
          specialForYou: pageData.data.specialForYou.media,
          popularThisSeason: pageData.data.popularThisSeason.media,
          topRated: pageData.data.topRated.media,
        });

        setPopularItems(popularData.data.Page.media);
        setHasNextPage(popularData.data.Page.pageInfo.hasNextPage);
        setTrendingItems(trendingData.data.Page.media);
        setTrendingHasNextPage(trendingData.data.Page.pageInfo.hasNextPage);

      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    const loadTrending = async () => {
      setLoadingTrending(true);
      setTrendingPage(1);
      try {
        const trendingData = await fetchTrendingData(1, trendingPeriod);
        setTrendingItems(trendingData.data.Page.media);
        setTrendingHasNextPage(trendingData.data.Page.pageInfo.hasNextPage);
      } catch (err) {
        console.error("Failed to load trending items", err);
      } finally {
        setLoadingTrending(false);
      }
    };
    if (!loading) {
       loadTrending();
    }
  }, [trendingPeriod, loading]);

  const loadMorePopular = async () => {
    if (!hasNextPage || loadingMore) return;
    setLoadingMore(true);
    try {
      const nextPage = popularPage + 1;
      const result = await fetchAnilistData<{ Page: { media: Media[], pageInfo: { hasNextPage: boolean } } }>(TRENDING_MANGA_QUERY, { page: nextPage, perPage: 12, sort: ['POPULARITY_DESC'] });
      setPopularItems(prev => [...prev, ...result.data.Page.media]);
      setPopularPage(nextPage);
      setHasNextPage(result.data.Page.pageInfo.hasNextPage);
    } catch (err) {
      console.error("Failed to load more items", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const loadMoreTrending = async () => {
    if (!trendingHasNextPage || loadingTrending) return;
    setLoadingTrending(true);
    try {
      const nextPage = trendingPage + 1;
      const result = await fetchTrendingData(nextPage, trendingPeriod);
      setTrendingItems(prev => [...prev, ...result.data.Page.media]);
      setTrendingPage(nextPage);
      setTrendingHasNextPage(result.data.Page.pageInfo.hasNextPage);
    } catch (err) {
      console.error("Failed to load more trending items", err);
    } finally {
      setLoadingTrending(false);
    }
  };

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
    <div className="flex flex-col">
      <Hero trending={data.hero} type="MANGA" />
      <div className="space-y-12 md:space-y-16 py-12 md:py-16">
        <ContentSlider title="Popular This Season" items={data.popularThisSeason} type="manga" />
        <ContentSlider title="Special For You" items={data.specialForYou} type="manga" />
        <ContentGrid title="Top Rated Manga" items={data.topRated} type="manga" />
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
            <Tabs value={trendingPeriod} onValueChange={(value) => setTrendingPeriod(value as TrendingPeriod)}>
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <ContentGrid title="" items={trendingItems} type="manga" />
          {trendingHasNextPage && (
            <div className="mt-8 text-center">
              <Button onClick={loadMoreTrending} disabled={loadingTrending}>
                {loadingTrending && trendingPage > 1 ? "Loading..." : "Show More"}
              </Button>
            </div>
          )}
        </div>
        
        <ContentGrid title="Most Popular" items={popularItems} type="manga" />
        {hasNextPage && (
          <div className="container mx-auto text-center">
            <Button onClick={loadMorePopular} disabled={loadingMore}>
              {loadingMore ? "Loading..." : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
