import { MediaGrid } from '@/components/media-grid';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import type { Media } from '@/lib/types';
import { getNextWeek, getNextMonth } from '@/lib/date-utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UPCOMING_QUERY = `
  query GetUpcoming($page: Int, $perPage: Int, $startDate_greater: FuzzyDateInt, $endDate_lesser: FuzzyDateInt) {
    Page(page: $page, perPage: $perPage) {
      media(sort: POPULARITY_DESC, type: ANIME, status: NOT_YET_RELEASED, startDate_greater: $startDate_greater, startDate_lesser: $endDate_lesser) {
        ...mediaFields
      }
    }
  }
  ${mediaFragment}
`;

async function getUpcomingData() {
  try {
    const nextWeekRange = getNextWeek();
    const nextMonthRange = getNextMonth();

    const [thisWeekRes, thisMonthRes] = await Promise.all([
       fetchAnilistData<{ Page: { media: Media[] } }>(UPCOMING_QUERY, {
        page: 1,
        perPage: 20,
        startDate_greater: nextWeekRange.start,
        endDate_lesser: nextWeekRange.end,
      }),
      fetchAnilistData<{ Page: { media: Media[] } }>(UPCOMING_QUERY, {
        page: 1,
        perPage: 20,
        startDate_greater: nextMonthRange.start,
        endDate_lesser: nextMonthRange.end,
      }),
    ]);
    
    return {
      thisWeek: thisWeekRes.data.Page.media,
      thisMonth: thisMonthRes.data.Page.media,
    };
  } catch (error) {
    console.error("Failed to fetch schedule data:", error);
    return {
      thisWeek: [],
      thisMonth: [],
    };
  }
}

export default async function SchedulePage() {
  const { thisWeek, thisMonth } = await getUpcomingData();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline tracking-wider">Upcoming Schedule</h1>
      <Tabs defaultValue="this-week">
        <TabsList>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
        </TabsList>
        <TabsContent value="this-week">
          {thisWeek.length > 0 ? (
            <MediaGrid media={thisWeek} />
          ) : (
            <p className="text-muted-foreground">No new anime scheduled for this week.</p>
          )}
        </TabsContent>
        <TabsContent value="this-month">
          {thisMonth.length > 0 ? (
            <MediaGrid media={thisMonth} />
          ) : (
             <p className="text-muted-foreground">No new anime scheduled for this month.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}