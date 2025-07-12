import type { Media } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MediaCard } from './media-card';

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
            className="relative -mx-4"
        >
            <CarouselContent className="pl-4">
            {items.map((item) => (
                <CarouselItem key={item.id} className="basis-auto">
                    <MediaCard media={item} />
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex" />
            <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex" />
        </Carousel>
    </div>
  );
}
