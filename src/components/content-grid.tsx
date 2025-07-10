import type { Media } from '@/lib/types';
import { MediaGrid } from './media-grid';

interface ContentGridProps {
  title: string;
  items: Media[];
}

export function ContentGrid({ title, items }: ContentGridProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <MediaGrid title={title} media={items} type="anime" />
    </div>
  );
}
