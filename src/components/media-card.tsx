import type { Media } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { PlayCircle } from 'lucide-react';

interface MediaCardProps {
  media: Media;
  type: 'anime' | 'manga';
  isActive: boolean;
}

function truncate(str: string, length: number) {
  if (!str) return '';
  const cleanedString = str.replace(/<br\s*\/?>/gi, ' ');
  if (cleanedString.length <= length) {
    return cleanedString;
  }
  return cleanedString.substring(0, length) + '...';
}

export function MediaCard({ media, type, isActive }: MediaCardProps) {
  const trailerId = type === 'anime' && media.trailer?.site === 'youtube' ? media.trailer.id : null;

  return (
    <div
      className={cn(
        'relative h-full w-full flex items-center justify-center transition-transform duration-500 ease-in-out',
        'transform-style-3d'
      )}
      style={{
        transform: isActive ? 'scale(1.1)' : 'scale(0.85)',
      }}
    >
      <div className="group relative aspect-[2/3] w-[300px] h-auto rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 ease-in-out hover:-translate-y-2.5">
          <Image
            src={media.coverImage.extraLarge}
            alt={media.title.userPreferred}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 300px"
            data-ai-hint="anime manga poster"
            priority={isActive}
          />

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="relative w-full h-full backdrop-blur-sm bg-black/20 rounded-xl p-4 flex flex-col justify-end border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-2">{media.title.userPreferred}</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                  {media.genres.slice(0, 3).map(genre => (
                      <Badge key={genre} variant="secondary" className="bg-white/10 text-white border-none text-xs">{genre}</Badge>
                  ))}
              </div>
              <p className="text-white/70 text-sm mb-4 h-10 overflow-hidden relative">
                  {truncate(media.description, 100)}
                  <span className="absolute bottom-0 right-0 w-full h-4 bg-gradient-to-t from-black/50 to-transparent" />
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}
