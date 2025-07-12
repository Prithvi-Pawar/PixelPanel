import type { Media } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Clock, CheckCircle2 } from 'lucide-react';
import { formatAiringTime } from '@/lib/date-utils';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

type AiringStatus = 'Aired' | 'Airing Soon';

interface ScheduleCardProps {
  schedule: {
    episode: number;
    airingAt: number;
    media: Media;
  };
  status: AiringStatus;
}

export function ScheduleCard({ schedule, status }: ScheduleCardProps) {
  const { media, episode, airingAt } = schedule;
  const isAired = status === 'Aired';

  return (
    <div className="group relative flex gap-4 rounded-2xl bg-card p-4 transition-all duration-300 hover:bg-white/5 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative flex-shrink-0">
        <Link href={`https://anilist.co/anime/${media.id}`} target="_blank" rel="noopener noreferrer" className="block">
          <div className="relative w-[100px] h-[140px] rounded-lg overflow-hidden">
            <Image
              src={media.coverImage.large}
              alt={media.title.userPreferred}
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <Badge variant="secondary" className={cn(
            "border-none w-fit mb-2",
            isAired ? "bg-green-500/10 text-green-400" : "bg-pink-500/10 text-pink-400"
        )}>
            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
            {status}
        </Badge>
        
        <Link href={`https://anilist.co/anime/${media.id}`} target="_blank" rel="noopener noreferrer" className="block">
            <h3 className="font-bold text-lg text-white line-clamp-1 group-hover:text-primary transition-colors">{media.title.userPreferred}</h3>
        </Link>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Clock className="h-4 w-4" />
            <span>Episode {episode}</span>
            <span>&bull;</span>
            <span>{formatAiringTime(airingAt)}</span>
        </div>

        <p 
          className="text-sm text-foreground/70 mt-2 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: media.description?.replace(/<br><br>/g, '<br>') || 'No description available.' }}
        />
      </div>
    </div>
  );
}

ScheduleCard.Skeleton = function ScheduleCardSkeleton() {
    return (
        <div className="flex gap-4 rounded-2xl bg-card p-4">
            <Skeleton className="w-[100px] h-[140px] rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-24 rounded" />
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-5 w-1/2 rounded" />
                <div className="space-y-2 pt-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                </div>
            </div>
        </div>
    )
}
