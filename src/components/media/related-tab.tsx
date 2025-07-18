import type { Media } from '@/lib/types';
import { RelatedMediaCard } from '../related-media-card';

export function RelatedTab({ media }: { media: Media }) {
  const relatedMedia = media.relations?.edges || [];

  const filteredMedia = relatedMedia.filter(
    edge => edge.relationType === 'SEQUEL' || edge.relationType === 'PREQUEL'
  );

  if (filteredMedia.length === 0) {
    return <p className="text-muted-foreground">No sequels or prequels found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredMedia.map(edge => <RelatedMediaCard key={`${edge.relationType}-${edge.node.id}`} relation={edge} />)}
    </div>
  );
}
