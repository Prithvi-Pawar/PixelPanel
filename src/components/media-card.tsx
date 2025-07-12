import type { Media } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface MediaCardProps {
  media: Media;
}

export function MediaCard({ media }: MediaCardProps) {
  return (
    <div className="flex-shrink-0 w-[130px] space-y-2 group">
      <Link href={`https://anilist.co/anime/${media.id}`} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[130/190] w-[130px] h-[190px] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-primary/20">
            <Image
                src={media.coverImage.extraLarge}
                alt={media.title.userPreferred}
                fill
                className="object-cover"
                sizes="130px"
                data-ai-hint="anime manga poster"
            />
        </div>
      </Link>
      <Link href={`https://anilist.co/anime/${media.id}`} target="_blank" rel="noopener noreferrer" className="block">
        <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {media.title.userPreferred}
        </h3>
      </Link>
    </div>
  );
}
