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
    <div className="group relative overflow-hidden rounded-2xl">
      <Link href={`https://anilist.co/anime/${media.id}`} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={media.coverImage.extraLarge}
            alt={media.title.userPreferred}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            data-ai-hint="anime manga poster"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-base font-bold text-white line-clamp-2">{media.title.userPreferred}</h3>
          <div className="mt-2 flex items-center gap-2">
            {media.averageScore && (
                <Badge variant="secondary" className="bg-primary/20 text-primary border-none">
                    <Star className="mr-1 h-3 w-3" />
                    {media.averageScore / 10}
                </Badge>
            )}
            <Badge variant="outline" className="border-white/50 text-white/80 bg-black/20 backdrop-blur-sm">{media.format}</Badge>
          </div>
        </div>
      </Link>
    </div>
  );
}
