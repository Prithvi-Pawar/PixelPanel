import type { RelatedMediaEdge } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedMediaCardProps {
  relation: RelatedMediaEdge;
}

export function RelatedMediaCard({ relation }: RelatedMediaCardProps) {
  const { node, relationType } = relation;

  return (
    <div className="group">
      <Link href={`/media/${node.id}`} className="block">
        <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden mb-2 shadow-lg transition-transform duration-300 group-hover:scale-105">
          <Image
            src={node.coverImage.large}
            alt={node.title.userPreferred}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            data-ai-hint="anime manga poster"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
        </div>
      </Link>
      <p className="text-sm font-medium text-muted-foreground">{relationType.replace(/_/g, ' ')}</p>
      <Link href={`/media/${node.id}`} className="block">
        <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
            {node.title.userPreferred}
        </h3>
      </Link>
    </div>
  );
}
