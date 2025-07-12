import type { Media } from '@/lib/types';
import { MediaGridCard } from './media-grid-card';

interface MediaGridProps {
  media: Media[];
}

export function MediaGrid({ media }: MediaGridProps) {
    if (!media || media.length === 0) {
        return <p className="text-muted-foreground mt-4">No results found.</p>;
    }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-4">
      {media.map((item) => (
        <MediaGridCard key={item.id} media={item} />
      ))}
    </div>
  );
}