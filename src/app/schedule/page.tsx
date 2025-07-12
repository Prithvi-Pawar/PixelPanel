'use client';

import { useEffect, useState } from 'react';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import type { Media } from '@/lib/types';
import { getDayOfWeek, getWeekDays } from '@/lib/date-utils';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScheduleCard } from '@/components/schedule-card';

const SCHEDULE_QUERY = `
  query GetSchedule($page: Int, $perPage: Int, $airingAt_greater: Int, $airingAt_lesser: Int) {
    Page(page: $page, perPage: $perPage) {
      media: airingSchedules(sort: TIME_DESC, airingAt_greater: $airingAt_greater, airingAt_lesser: $airingAt_lesser) {
        episode
        airingAt
        media {
          ...mediaFields
        }
      }
    }
  }
  ${mediaFragment}
`;

type AiringSchedule = {
  episode: number;
  airingAt: number;
  media: Media;
};

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [scheduleData, setScheduleData] = useState<AiringSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const weekDays = getWeekDays();

  useEffect(() => {
    async function loadSchedule() {
      setLoading(true);
      try {
        const startOfDay = new Date(selectedDay);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDay);
        endOfDay.setHours(23, 59, 59, 999);

        const startTimestamp = Math.floor(startOfDay.getTime() / 1000);
        const endTimestamp = Math.floor(endOfDay.getTime() / 1000);

        const response = await fetchAnilistData<{ Page: { media: AiringSchedule[] } }>(SCHEDULE_QUERY, {
          page: 1,
          perPage: 50,
          airingAt_greater: startTimestamp,
          airingAt_lesser: endTimestamp,
        });
        
        // Filter out duplicates based on media id
        const uniqueMedia = new Map<number, AiringSchedule>();
        response.data.Page.media.forEach(item => {
            if (!uniqueMedia.has(item.media.id)) {
                uniqueMedia.set(item.media.id, item);
            }
        });

        setScheduleData(Array.from(uniqueMedia.values()));

      } catch (error) {
        console.error("Failed to fetch schedule data:", error);
        setScheduleData([]);
      } finally {
        setLoading(false);
      }
    }
    loadSchedule();
  }, [selectedDay]);

  const today = new Date().toDateString();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white font-headline tracking-wider">Anime Schedule</h1>
        <p className="text-muted-foreground mt-2 text-lg">Stay updated with the latest anime releases</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {weekDays.map(day => (
          <Button
            key={day.toISOString()}
            variant="ghost"
            onClick={() => setSelectedDay(day)}
            className={cn(
              "rounded-full px-4 py-2 h-auto text-sm font-semibold transition-colors",
              selectedDay.toDateString() === day.toDateString()
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            {getDayOfWeek(day)} {day.toDateString() === today && '(Today)'}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
            [...Array(6)].map((_, i) => <ScheduleCard.Skeleton key={i} />)
        ) : scheduleData.length > 0 ? (
          scheduleData.map(item => (
            <ScheduleCard key={item.media.id} schedule={item} />
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center py-8">
            No anime airing on this day.
          </p>
        )}
      </div>
    </div>
  );
}
