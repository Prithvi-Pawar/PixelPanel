import { MediaGrid } from '@/components/media-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import { getSeason, getYear } from '@/lib/date-utils';
import type { Media } from '@/lib/types';


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
        const [thisMonthRes, thisWeekRes] = await Promise.all([
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
            thisMonth: thisMonthRes.data.Page.media,
            thisWeek: thisWeekRes.data.Page.media.slice(0, 10), // Take top 10 for "this week"
        };
    } catch (error) {
        console.error("Failed to fetch trending data:", error);
        return { thisMonth: [], thisWeek: [] };
    }
}


export default async function TrendingPage() {
  const { thisMonth, thisWeek } = await getTrendingData();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline tracking-wider">Trending Anime</h1>
      <Tabs defaultValue="this-month">
        <TabsList>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
        </TabsList>
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
