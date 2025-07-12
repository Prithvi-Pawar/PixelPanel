import type { Media } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MediaCard } from './media-card';

interface ContentSliderProps {
  title: string;
  items: Media[];
  type: 'anime' | 'manga';
}

export function ContentSlider({ title, items, type }: ContentSliderProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold tracking-tight mb-6">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="relative"
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={item.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
               <MediaCard media={item} type={type} showEpisode={index === 0} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 hidden lg:flex" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 hidden lg:flex" />
      </Carousel>
    </div>
  );
}
