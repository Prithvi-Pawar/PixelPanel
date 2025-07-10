import type { Media } from '@/lib/types';
import { MediaCard } from './media-card';

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
      {title && <h2 className="text-2xl font-bold tracking-tight mb-6">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
        {media.map((item) => (
          <MediaCard key={item.id} media={item} type={type} />
        ))}
      </div>
    </section>
  );
}
