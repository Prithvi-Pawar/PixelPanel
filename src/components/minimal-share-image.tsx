
import { forwardRef } from 'react';
import type { Media } from '@/lib/types';
import Image from 'next/image';
import { getDayOfWeekFromDate } from '@/lib/date-utils';

interface MinimalShareImageProps {
  media: Media;
}

export const MinimalShareImage = forwardRef<HTMLDivElement, MinimalShareImageProps>(({ media }, ref) => {
    const { startDate, title, description, coverImage } = media;
    const releaseDate = startDate?.year && startDate?.month && startDate?.day
        ? new Date(startDate.year, startDate.month - 1, startDate.day)
        : null;

    const formattedDate = releaseDate
        ? `${String(releaseDate.getDate()).padStart(2, '0')} ${releaseDate.toLocaleString('en-US', { month: 'long' })} / ${releaseDate.getFullYear()}`
        : 'N/A';
    
    const releaseDay = releaseDate ? getDayOfWeekFromDate(releaseDate).toUpperCase() : 'SOMEDAY';
    
    const shortDescription = description?.replace(/<[^>]*>?/gm, '').split(' ').slice(0, 25).join(' ') + '...';

    return (
        <div
            ref={ref}
            className="w-[1080px] h-[1920px] bg-white text-black p-16 flex flex-col font-serif"
            style={{ fontFamily: "'Roboto Mono', monospace" }}
        >
            {/* Header */}
            <header className="flex justify-between items-center w-full">
                <h1 className="text-2xl tracking-[0.2em] font-light uppercase">{title.native}</h1>
                <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                    <span className="w-2 h-2 rounded-full bg-black"></span>
                </div>
            </header>

            {/* Main Image */}
            <div className="relative w-full h-[960px] my-12">
                <Image
                    src={coverImage.extraLarge}
                    alt={title.userPreferred}
                    fill
                    className="object-cover"
                    unoptimized
                    data-ai-hint="anime manga poster"
                />
            </div>

            {/* Content Body */}
            <div className="flex-1 flex justify-between items-start w-full">
                <div className="w-1/2 pr-8">
                    <h2 className="text-7xl font-bold font-sans leading-tight">{title.english || title.romaji}</h2>
                </div>
                <div className="w-1/2 pl-8 pt-2">
                    <p className="text-2xl font-serif text-gray-700 leading-relaxed">
                       {shortDescription}
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full mt-auto pt-12 flex justify-between items-end">
                <div>
                     <p className="text-3xl">
                        <span className="font-bold">{formattedDate.split(' ')[0]}</span>
                        <span className="font-light"> {formattedDate.substring(formattedDate.indexOf(' '))}</span>
                    </p>
                    <p className="text-xl text-gray-500 mt-2 font-sans">
                        archive by: PixelPanel
                    </p>
                </div>
                <div className="text-3xl tracking-[0.3em] font-light">
                    {releaseDay}
                </div>
            </footer>
        </div>
    );
});

MinimalShareImage.displayName = 'MinimalShareImage';

    