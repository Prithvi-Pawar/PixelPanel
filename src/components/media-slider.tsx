import type { Media } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MediaGridCard } from './media-grid-card';

interface MediaSliderProps {
  title: string;
  items: Media[];
}

export function MediaSlider({ title, items }: MediaSliderProps) {
  if (!items || items.length === 0) {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold font-headline tracking-wider text-foreground">{title}</h2>
            <p className="text-muted-foreground">Could not load this section.</p>
        </div>
    );
  }

  return (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold font-headline tracking-wider text-foreground">{title}</h2>
        <Carousel
            opts={{
            align: "start",
            loop: false,
            }}
            className="relative -mx-2"
        >
            <CarouselContent className="pl-2">
            {items.map((item) => (
                <CarouselItem key={item.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/8 pl-4">
                    <MediaGridCard media={item} />
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
    </div>
  );
}
