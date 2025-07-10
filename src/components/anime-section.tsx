import { getMediaList, getTrendingMedia } from '@/lib/anilist';
import { Hero } from './hero';
import { MediaGrid } from './media-grid';

export async function AnimeSection() {
  const [trendingAnime, recentAnime, topAnime] = await Promise.all([
    getTrendingMedia({ type: 'ANIME', perPage: 10 }),
    getMediaList({ type: 'ANIME', sort: 'START_DATE_DESC', perPage: 12 }),
    getMediaList({ type: 'ANIME', sort: 'SCORE_DESC', perPage: 12 }),
  ]);

  return (
    <div className="flex flex-col">
      <Hero trending={trendingAnime} type="ANIME" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12">
        <MediaGrid title="Recently Aired Anime" media={recentAnime} type="anime" />
        <MediaGrid title="Top Rated Anime" media={topAnime} type="anime" />
      </div>
    </div>
  );
}
