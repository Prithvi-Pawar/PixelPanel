import type { Media } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface MediaCardGridItemProps {
  media: Media;
  type: 'anime' | 'manga';
}

function MediaCardGridItem({ media, type }: MediaCardGridItemProps) {
  return (
    <Link href={`https://anilist.co/${type}/${media.id}`} target="_blank" rel="noopener noreferrer" className="block group text-left">
      <div className="flex flex-col h-full">
        <div className="aspect-[2/3] relative rounded-lg overflow-hidden mb-3">
          <Image
            src={media.coverImage.large}
            alt={media.title.userPreferred}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
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


interface MediaGridProps {
  title: string;
  media: Media[];
  type: 'anime' | 'manga';
}

export function MediaGrid({ title, media, type }: MediaGridProps) {
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
        {media.map((item) => (
          <MediaCardGridItem key={item.id} media={item} type={type} />
        ))}
      </div>
    </section>
  );
}
