import type { Media } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface MediaCardProps {
  media: Media;
  type: 'anime' | 'manga';
  showEpisode?: boolean;
}

export function MediaCard({ media, type, showEpisode }: MediaCardProps) {
  const statusColor = media.status === 'RELEASING' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className="text-left">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
        <Link href={`https://anilist.co/${type}/${media.id}`} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
          <Image
            src={media.coverImage.extraLarge}
            alt={media.title.userPreferred}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            data-ai-hint="anime manga poster"
          />
         </Link>
        {showEpisode && (
          <Badge className="absolute top-2 left-2 bg-black/70 text-white border-none">
            Episode 1
          </Badge>
        )}
      </div>
      
      <div className="flex items-start gap-2">
        <span className={cn("mt-1.5 h-2 w-2 rounded-full flex-shrink-0", statusColor)} />
        <Link href={`https://anilist.co/${type}/${media.id}`} target="_blank" rel="noopener noreferrer" className="block">
            <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
              {media.title.userPreferred}
            </h3>
        </Link>
      </div>
    </div>
  );
}
