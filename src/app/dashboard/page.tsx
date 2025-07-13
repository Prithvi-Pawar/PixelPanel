import { MediaSlider } from '@/components/media-slider';
import { RankedMediaItem } from '@/components/ranked-media-item';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import { getSeason, getYear, getNextSeason } from '@/lib/date-utils';
import type { Media } from '@/lib/types';

interface DashboardData {
  popularThisSeason: Media[];
  nextSeason: Media[];
  specialForYou: Media[];
  top10: Media[];
  allTimePopular: Media[];
}

const DASHBOARD_QUERY = `
  query GetDashboardData($season: MediaSeason, $seasonYear: Int, $nextSeason: MediaSeason, $nextSeasonYear: Int) {
    popularThisSeason: Page(page: 1, perPage: 15) {
      media(sort: POPULARITY_DESC, type: ANIME, season: $season, seasonYear: $seasonYear) { ...mediaFields }
    }
    nextSeason: Page(page: 1, perPage: 15) {
      media(sort: POPULARITY_DESC, type: ANIME, season: $nextSeason, seasonYear: $nextSeasonYear) { ...mediaFields }
    }
    specialForYou: Page(page: 1, perPage: 15) {
      media(sort: TRENDING_DESC, type: ANIME) { ...mediaFields }
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

async function getDashboardData(): Promise<DashboardData> {
    try {
        const season = getSeason();
        const seasonYear = getYear();
        const { season: nextSeason, year: nextSeasonYear } = getNextSeason();
        
        const result = await fetchAnilistData<any>(DASHBOARD_QUERY, { 
            season, 
            seasonYear,
            nextSeason,
            nextSeasonYear
        });
        
        return {
            popularThisSeason: result.data.popularThisSeason.media,
            nextSeason: result.data.nextSeason.media,
            specialForYou: result.data.specialForYou.media,
            top10: result.data.top10.media,
            allTimePopular: result.data.allTimePopular.media,
        };
    } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        return {
            popularThisSeason: [],
            nextSeason: [],
            specialForYou: [],
            top10: [],
            allTimePopular: [],
        };
    }
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="w-full space-y-12">
      <MediaSlider title="Popular This Season" items={data.popularThisSeason} />
      <MediaSlider title="Special For You" items={data.specialForYou} />

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
