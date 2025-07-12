import { MediaGrid } from '@/components/media-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import { getSeason, getYear } from '@/lib/date-utils';
import type { Media } from '@/lib/types';


const TRENDING_QUERY = `
  query GetTrending($page: Int, $perPage: Int, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      media(sort: $sort, type: ANIME) {
        ...mediaFields
      }
    }
  }
  ${mediaFragment}
`;

const POPULAR_THIS_SEASON_QUERY = `
    query GetPopularThisSeason($season: MediaSeason, $seasonYear: Int) {
        Page(page: 1, perPage: 20) {
            media(sort: POPULARITY_DESC, type: ANIME, season: $season, seasonYear: $seasonYear) {
                ...mediaFields
            }
        }
    }
    ${mediaFragment}
`;

async function getTrendingData() {
    try {
        const [allTimeRes, thisMonthRes, thisWeekRes] = await Promise.all([
            fetchAnilistData<{ Page: { media: Media[] } }>(TRENDING_QUERY, { 
                page: 1, 
                perPage: 20, 
                sort: 'TRENDING_DESC' 
            }),
            fetchAnilistData<{ Page: { media: Media[] } }>(POPULAR_THIS_SEASON_QUERY, {
                 season: getSeason(),
                 seasonYear: getYear(),
            }),
            fetchAnilistData<{ Page: { media: Media[] } }>(POPULAR_THIS_SEASON_QUERY, {
                 season: getSeason(),
                 seasonYear: getYear(),
            })
        ]);

        return {
            allTime: allTimeRes.data.Page.media,
            thisMonth: thisMonthRes.data.Page.media,
            thisWeek: thisWeekRes.data.Page.media.slice(0, 10), // Take top 10 for "this week"
        };
    } catch (error) {
        console.error("Failed to fetch trending data:", error);
        return { allTime: [], thisMonth: [], thisWeek: [] };
    }
}


export default async function TrendingPage() {
  const { allTime, thisMonth, thisWeek } = await getTrendingData();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline tracking-wider">Trending Anime</h1>
      <Tabs defaultValue="all-time">
        <TabsList>
          <TabsTrigger value="all-time">All Time</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
        </TabsList>
        <TabsContent value="all-time">
            <MediaGrid media={allTime} />
        </TabsContent>
        <TabsContent value="this-month">
            <MediaGrid media={thisMonth} />
        </TabsContent>
        <TabsContent value="this-week">
             <MediaGrid media={thisWeek} />
        </TabsContent>
      </Tabs>
    </div>
  );
}