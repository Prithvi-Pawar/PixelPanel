import { getMediaList, getTrendingMedia } from '@/lib/anilist';
import { CinematicCarousel } from './cinematic-carousel';
import { MediaGrid } from './media-grid';

export async function MangaSection() {
  const [trendingManga, recentManga, topManga] = await Promise.all([
    getTrendingMedia({ type: 'MANGA', perPage: 10 }),
    getMediaList({ type: 'MANGA', sort: 'START_DATE_DESC', perPage: 12 }),
    getMediaList({ type: 'MANGA', sort: 'SCORE_DESC', perPage: 12 }),
  ]);

  return (
    <div className="flex flex-col">
      <CinematicCarousel media={trendingManga} type="MANGA" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12">
        <MediaGrid title="Recently Published Manga" media={recentManga} type="manga" />
        <MediaGrid title="Top Rated Manga" media={topManga} type="manga" />
      </div>
    </div>
  );
}
