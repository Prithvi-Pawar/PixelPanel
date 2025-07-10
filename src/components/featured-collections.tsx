import type { Media } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface Collection {
  title: string;
  items: Media[];
}

interface FeaturedCollectionsProps {
  collections: Collection[];
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((collection, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg">
            <Link href="#" className="block">
              <div className="aspect-video relative">
                {collection.items[0]?.bannerImage && (
                  <Image
                    src={collection.items[0].bannerImage}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="text-2xl font-bold text-white text-center drop-shadow-lg">{collection.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
