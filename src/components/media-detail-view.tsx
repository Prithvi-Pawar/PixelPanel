'use client';

import type { Media } from '@/lib/types';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function MediaDetailView({ media }: { media: Media }) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="relative h-64 md:h-80 w-full">
        {media.bannerImage && (
          <Image
            src={media.bannerImage}
            alt={`${media.title.userPreferred} banner`}
            fill
            className="object-cover rounded-2xl"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <Button onClick={() => router.back()} variant="ghost" size="icon" className="absolute top-4 left-4 rounded-full bg-background/50 backdrop-blur-sm">
            <ArrowLeft />
        </Button>
      </div>

      <div className="container mx-auto px-4 -mt-24 md:-mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-48 md:w-64">
            <Image
              src={media.coverImage.extraLarge}
              alt={media.title.userPreferred}
              width={260}
              height={390}
              className="rounded-2xl shadow-2xl aspect-[2/3]"
              data-ai-hint="anime manga poster"
            />
          </div>
          <div className="flex-grow pt-8 md:pt-24">
            <h1 className="text-3xl md:text-5xl font-bold font-headline">{media.title.userPreferred}</h1>
            <div className="flex flex-wrap gap-2 mt-4">
                {media.genres.map(genre => <Badge key={genre} variant="secondary">{genre}</Badge>)}
            </div>
            <p className="mt-6 text-muted-foreground prose prose-invert" dangerouslySetInnerHTML={{ __html: media.description?.replace(/\\n/g, '<br />') || 'No description available.' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
