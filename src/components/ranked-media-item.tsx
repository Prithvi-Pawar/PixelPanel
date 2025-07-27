
import type { Media } from '@/lib/types';
import { Badge } from './ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { Eye } from 'lucide-react';

interface RankedMediaItemProps {
  media: Media;
  rank: number;
}

export function RankedMediaItem({ media, rank }: RankedMediaItemProps) {
  return (
    <div className="flex items-center gap-4 group p-2 rounded-lg hover:bg-white/5 transition-colors">
      <div className="text-2xl font-bold text-muted-foreground w-8 text-center">#{rank}</div>
      <div className="relative w-14 h-20 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={media.coverImage.large}
          alt={media.title.userPreferred}
          fill
          className="object-cover"
          sizes="56px"
        />
      </div>
      <div className="flex-1">
        <Link href={`/media/${media.id}`}>
          <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">{media.title.userPreferred}</h3>
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
          <span>{media.format}</span>
          {media.episodes && <><span>•</span><span>{media.episodes} episodes</span></>}
          {media.averageScore && <><span>•</span><span>{media.averageScore}%</span></>}
        </div>
      </div>
      <Link href={`/media/${media.id}`}>
        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Eye className="mr-2 h-4 w-4" /> View
        </Button>
      </Link>
    </div>
  );
}
