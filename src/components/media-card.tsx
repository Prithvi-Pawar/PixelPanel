import type { Media } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface MediaCardProps {
  media: Media;
  type: 'anime' | 'manga';
}

export function MediaCard({ media, type }: MediaCardProps) {
  return (
    <Link href={`https://anilist.co/${type}/${media.id}`} target="_blank" rel="noopener noreferrer" className="block group text-left">
      <div className="flex flex-col h-full">
        <div className="aspect-[2/3] relative rounded-lg overflow-hidden mb-3">
          <Image
            src={media.coverImage.large}
            alt={media.title.userPreferred}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            data-ai-hint="anime manga poster"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {media.title.userPreferred}
          </h3>
          <div className="mt-auto pt-1 flex items-center justify-between text-xs text-muted-foreground">
            <span>{media.format?.replace(/_/g, ' ')}</span>
            {media.averageScore && (
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="h-3 w-3 fill-current" />
                <span className="font-semibold">{media.averageScore}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
