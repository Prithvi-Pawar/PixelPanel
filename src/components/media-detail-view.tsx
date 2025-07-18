'use client';

import type { Media } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Play } from 'lucide-react';
import { YoutubeEmbed } from './youtube-embed';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { OverviewTab } from './media/overview-tab';
import { CharactersTab } from './media/characters-tab';
import { RelatedTab } from './media/related-tab';
import { WatchTab } from './media/watch-tab';

const NavLink = ({
  children,
  onClick,
  isActive,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "text-sm font-medium text-white/60 hover:text-white transition-colors pb-2",
      isActive && "text-white border-b-2 border-primary"
    )}
  >
    {children}
  </button>
);

export function MediaDetailView({ media }: { media: Media }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="bg-background text-white">
      <div className="relative min-h-[60vh] md:min-h-[70vh] w-full flex flex-col items-center justify-center overflow-hidden font-sans">
        {media.trailer?.site === 'youtube' && media.trailer.id ? (
          <iframe
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-[1.2] opacity-30"
            src={`https://www.youtube.com/embed/${media.trailer.id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${media.trailer.id}`}
            title="YouTube video player background"
            frameBorder="0"
            allow="autoplay; encrypted-media; loop"
            allowFullScreen={false}
          ></iframe>
        ) : media.bannerImage && (
          <Image
            src={media.bannerImage}
            alt={`${media.title.userPreferred} banner`}
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-end">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 flex-shrink-0">
                     <Image
                        src={media.coverImage.extraLarge}
                        alt={media.title.userPreferred}
                        width={200}
                        height={300}
                        className="rounded-lg shadow-2xl shadow-black/50"
                        priority
                        data-ai-hint="anime manga poster"
                    />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-wide text-shadow-lg" style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'}}>
                        {media.title.english || media.title.romaji}
                    </h1>
                     <p className="text-lg font-light text-white/80 mt-1">
                        {media.title.native}
                    </p>
                    {media.trailer?.id && (
                        <Dialog>
                        <DialogTrigger asChild>
                             <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
                                <Play className="h-4 w-4" />
                                Watch Trailer
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-black/80 border-white/20 p-0 max-w-4xl">
                            <YoutubeEmbed embedId={media.trailer.id} />
                        </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center space-x-8 border-b border-white/10 mb-8">
          <NavLink onClick={() => setActiveTab('overview')} isActive={activeTab === 'overview'}>Overview</NavLink>
          <NavLink onClick={() => setActiveTab('characters')} isActive={activeTab === 'characters'}>Characters</NavLink>
          <NavLink onClick={() => setActiveTab('related')} isActive={activeTab === 'related'}>Related</NavLink>
          <NavLink onClick={() => setActiveTab('watch')} isActive={activeTab === 'watch'}>Where to Watch</NavLink>
        </nav>

        <div>
            {activeTab === 'overview' && <OverviewTab media={media} />}
            {activeTab === 'characters' && <CharactersTab media={media} />}
            {activeTab === 'related' && <RelatedTab media={media} />}
            {activeTab === 'watch' && <WatchTab media={media} />}
        </div>
      </div>
    </div>
  );
}
