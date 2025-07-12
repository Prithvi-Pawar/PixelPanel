import { MediaSlider } from '@/components/media-slider';
import { RankedMediaItem } from '@/components/ranked-media-item';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import type { Media } from '@/lib/types';

interface DashboardData {
  favorites: Media[];
  popularMovies: Media[];
  nextSeason: Media[];
  top10: Media[];
  allTimePopular: Media[];
}

const DASHBOARD_QUERY = `
  query GetDashboardData {
    favorites: Page(page: 1, perPage: 15) {
      media(sort: FAVOURITES_DESC, type: ANIME) { ...mediaFields }
    }
    popularMovies: Page(page: 1, perPage: 15) {
      media(sort: POPULARITY_DESC, type: ANIME, format: MOVIE) { ...mediaFields }
    }
    nextSeason: Page(page: 1, perPage: 15) {
      media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED) { ...mediaFields }
    }
    top10: Page(page: 1, perPage: 10) {
      media(sort: SCORE_DESC, type: ANIME) { ...mediaFields }
    }
    allTimePopular: Page(page: 1, perPage: 10) {
      media(sort: POPULARITY_DESC, type: ANIME) { ...mediaFields }
    }
  }
  ${mediaFragment}
`;

async function getDashboardData() {
    try {
        const result = await fetchAnilistData<any>(DASHBOARD_QUERY);
        return {
            favorites: result.data.favorites.media,
            popularMovies: result.data.popularMovies.media,
            nextSeason: result.data.nextSeason.media,
            top10: result.data.top10.media,
            allTimePopular: result.data.allTimePopular.media,
        };
    } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        return {
            favorites: [],
            popularMovies: [],
            nextSeason: [],
            top10: [],
            allTimePopular: [],
        };
    }
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="w-full space-y-12">
      <MediaSlider title="Most Favorite" items={data.favorites} />
      <MediaSlider title="Popular Movies" items={data.popularMovies} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline tracking-wider">Top 10 Anime</h2>
          <div className="bg-card p-4 rounded-2xl space-y-3">
            {data.top10.map((item, index) => (
              <RankedMediaItem key={item.id} media={item} rank={index + 1} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-headline tracking-wider">All Time Popular</h2>
           <div className="bg-card p-4 rounded-2xl space-y-3">
            {data.allTimePopular.map((item, index) => (
              <RankedMediaItem key={item.id} media={item} rank={index + 1} />
            ))}
          </div>
        </div>
      </div>

      <MediaSlider title="Next Season" items={data.nextSeason} />
    </div>
  );
}
