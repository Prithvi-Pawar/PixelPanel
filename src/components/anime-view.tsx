"use client";

import { useState, useEffect } from 'react';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import type { Media } from '@/lib/types';
import { LoadingState } from './loading-state';
import { Hero } from './hero';
import { FeaturedCollections } from './featured-collections';
import { ContentGrid } from './content-grid';
import { Button } from './ui/button';

interface AnimeData {
  hero: Media[];
  specialForYou: Media[];
  mystical: Media[];
  romance: Media[];
  classic: Media[];
  trendingNow: Media[];
}

const ANIME_PAGE_QUERY = `
  query GetAnimePageData {
    hero: Page(page: 1, perPage: 10) {
      media(type: ANIME, sort: TRENDING_DESC, isAdult: false) { ...mediaFields }
    }
    specialForYou: Page(page: 1, perPage: 10) {
      media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) { ...mediaFields }
    }
    mystical: Page(page: 1, perPage: 3) {
      media(type: ANIME, genre_in: ["Supernatural", "Mystery"], sort: SCORE_DESC, isAdult: false) { ...mediaFields }
    }
    romance: Page(page: 1, perPage: 3) {
      media(type: ANIME, genre: "Romance", sort: POPULARITY_DESC, isAdult: false) { ...mediaFields }
    }
    classic: Page(page: 1, perPage: 3) {
      media(type: ANIME, startDate_lesser: 20100101, sort: SCORE_DESC, isAdult: false) { ...mediaFields }
    }
    trendingNow: Page(page: 1, perPage: 6) {
      media(type: ANIME, sort: TRENDING_DESC, isAdult: false) { ...mediaFields }
    }
  }
  ${mediaFragment}
`;

const POPULAR_ANIME_QUERY = `
  query GetPopularAnime($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(type: ANIME, sort: POPULARITY_DESC, isAdult: false) {
        ...mediaFields
      }
    }
  }
  ${mediaFragment}
`;

export function AnimeView() {
  const [data, setData] = useState<AnimeData | null>(null);
  const [popularItems, setPopularItems] = useState<Media[]>([]);
  const [popularPage, setPopularPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [pageData, popularData] = await Promise.all([
          fetchAnilistData<{
            hero: { media: Media[] };
            specialForYou: { media: Media[] };
            mystical: { media: Media[] };
            romance: { media: Media[] };
            classic: { media: Media[] };
            trendingNow: { media: Media[] };
          }>(ANIME_PAGE_QUERY),
          fetchAnilistData<{ Page: { media: Media[], pageInfo: { hasNextPage: boolean } } }>(POPULAR_ANIME_QUERY, { page: 1, perPage: 12 })
        ]);

        setData({
          hero: pageData.data.hero.media,
          specialForYou: pageData.data.specialForYou.media,
          mystical: pageData.data.mystical.media,
          romance: pageData.data.romance.media,
          classic: pageData.data.classic.media,
          trendingNow: pageData.data.trendingNow.media,
        });

        setPopularItems(popularData.data.Page.media);
        setHasNextPage(popularData.data.Page.pageInfo.hasNextPage);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }
    loadInitialData();
  }, []);

  const loadMorePopular = async () => {
    if (!hasNextPage || loadingMore) return;
    setLoadingMore(true);
    try {
      const nextPage = popularPage + 1;
      const result = await fetchAnilistData<{ Page: { media: Media[], pageInfo: { hasNextPage: boolean } } }>(POPULAR_ANIME_QUERY, { page: nextPage, perPage: 12 });
      setPopularItems(prev => [...prev, ...result.data.Page.media]);
      setPopularPage(nextPage);
      setHasNextPage(result.data.Page.pageInfo.hasNextPage);
    } catch (err) {
      console.error("Failed to load more items", err);
    } finally {
      setLoadingMore(false);
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

  const collections = [
    { title: "The Best Mystical Anime", items: data.mystical },
    { title: "Top 20 Romance Anime", items: data.romance },
    { title: "The Best Classic Anime", items: data.classic },
  ];

  return (
    <div className="flex flex-col">
      <Hero trending={data.hero} type="ANIME" />
      <div className="space-y-12 md:space-y-16 py-12 md:py-16">
        <ContentGrid title="Special For You" items={data.specialForYou} />
        <FeaturedCollections collections={collections} />
        <ContentGrid title="Trending Now" items={data.trendingNow} />
        <ContentGrid title="Most Popular" items={popularItems} />
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
