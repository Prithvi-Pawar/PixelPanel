'use client';

import type { Media } from '@/lib/types';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { PlayCircle, Star, X } from 'lucide-react';
import Link from 'next/link';
import { MediaCard } from './media-card';
import { useState } from 'react';

function truncate(str: string, length: number) {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export function CinematicCarousel({ media, type }: { media: Media[]; type: 'ANIME' | 'MANGA' }) {
  const [showTrailer, setShowTrailer] = useState(true);

  if (!media || media.length === 0) {
    return (
      <div className="h-[70vh] flex items-center justify-center bg-card">
        <p>Could not load trending content.</p>
      </div>
    );
  }

  const featured = media[0];
  const carouselItems = media.slice(1, 6);
  const trailerId = type === 'ANIME' && featured.trailer?.id && featured.trailer.site === 'youtube' ? featured.trailer.id : null;

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      {showTrailer && trailerId ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full z-0"
          src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&loop=1&playlist=${trailerId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        featured.bannerImage && (
          <Image
            src={featured.bannerImage}
            alt={`Banner for ${featured.title.userPreferred}`}
            fill
            className="object-cover z-0"
            data-ai-hint="anime background"
            priority
          />
        )
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-10" />
      <div className="absolute inset-0 backdrop-blur-sm z-10" />

      <div className="container relative z-20 grid h-full grid-cols-1 md:grid-cols-3 lg:grid-cols-2 items-center gap-8 text-white">
        <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1 pt-16 md:pt-0">
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-shadow">
            {featured.title.userPreferred}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            {featured.averageScore && (
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-lg font-bold">{featured.averageScore} / 100</span>
              </div>
            )}
            <Badge variant="secondary" className="text-sm">{featured.format}</Badge>
            <Badge variant="secondary" className="text-sm">{featured.status?.replace(/_/g, ' ')}</Badge>
            {featured.startDate?.year && <Badge variant="secondary" className="text-sm">{featured.startDate.year}</Badge>}
          </div>
          <p className="text-foreground/80 text-base leading-relaxed max-w-prose">
            {truncate(featured.description.replace(/<br>/g, ''), 250)}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <Link href={`https://anilist.co/${type.toLowerCase()}/${featured.id}`} target="_blank" rel="noopener noreferrer">
                Explore Now
              </Link>
            </Button>
            {trailerId && (
              <Button variant="outline" size="lg" onClick={() => setShowTrailer(!showTrailer)}>
                {showTrailer ? <X className="mr-2 h-5 w-5" /> : <PlayCircle className="mr-2 h-5 w-5" />}
                {showTrailer ? 'Close Trailer' : 'Play Trailer'}
              </Button>
            )}
          </div>
        </div>

        <div className="hidden md:flex justify-center md:col-span-1 lg:col-span-1">
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="w-full max-w-xs"
          >
            <CarouselContent className="-ml-2">
              {carouselItems.map((item) => (
                <CarouselItem key={item.id} className="pl-2 basis-1/2 md:basis-1/2 lg:basis-1/3">
                  <MediaCard media={item} variant="carousel" type={type.toLowerCase() as 'anime' | 'manga'} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
