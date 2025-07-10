'use client';

import type { Media } from '@/lib/types';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { MediaCard } from './media-card';

const AutoplayingBackground = ({ media, isActive }: { media: Media; isActive: boolean }) => {
  const trailerId = media.trailer?.site === 'youtube' ? media.trailer.id : null;

  return (
    <div
      className={cn(
        'absolute inset-0 h-full w-full overflow-hidden transition-opacity duration-700',
        isActive ? 'opacity-100' : 'opacity-0'
      )}
    >
      {isActive && trailerId ? (
        <iframe
          key={media.id}
          className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.75]"
          src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&loop=1&playlist=${trailerId}&playsinline=1`}
          title={`${media.title.userPreferred} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={false}
        ></iframe>
      ) : (
        media.bannerImage && (
          <Image
            src={media.bannerImage}
            alt={`Banner for ${media.title.userPreferred}`}
            fill
            className="object-cover"
            priority={isActive}
            sizes="100vw"
            data-ai-hint="anime background"
          />
        )
      )}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-lg" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
    </div>
  );
};


export function CinematicCarousel({ media, type }: { media: Media[]; type: 'ANIME' | 'MANGA' }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);
  

  if (!media || media.length === 0) {
    return (
      <div className="h-[70vh] flex items-center justify-center bg-card">
        <p>Could not load trending content.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[80vh] min-h-[600px] flex flex-col justify-center items-center overflow-hidden">
        {media.map((item, index) => (
            <AutoplayingBackground key={item.id} media={item} isActive={index === current} />
        ))}
      
        <Carousel setApi={setApi} opts={{ loop: true, align: 'center' }} className="w-full h-full relative z-10">
          <CarouselContent className="-ml-12 h-full" style={{ perspective: '1000px' }}>
            {media.map((item, index) => (
              <CarouselItem key={item.id} className="pl-12 basis-full md:basis-1/2 lg:basis-1/3">
                  <MediaCard media={item} type={type.toLowerCase() as 'anime' | 'manga'} isActive={index === current}/>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <CarouselPrevious className="relative translate-x-[-5px] bg-black/20 border-white/20 hover:bg-white/20 hover:text-white" />
            <CarouselNext className="relative translate-x-[5px] bg-black/20 border-white/20 hover:bg-white/20 hover:text-white" />
          </div>
        </Carousel>
    </div>
  );
}