import type { Media } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Star } from 'lucide-react';

interface MediaGridCardProps {
  media: Media;
}

export function MediaGridCard({ media }: MediaGridCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl flex flex-col">
       <Link href={`https://anilist.co/anime/${media.id}`} target="_blank" rel="noopener noreferrer" className="block relative aspect-[2/3] w-full">
        <Image
          src={media.coverImage.extraLarge}
          alt={media.title.userPreferred}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-2xl"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          data-ai-hint="anime manga poster"
        />
      </Link>
      <div className="pt-2">
        <Link href={`https://anilist.co/anime/${media.id}`} target="_blank" rel="noopener noreferrer">
            <h3 className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {media.title.userPreferred}
            </h3>
        </Link>
      </div>
    </div>
  );
}
