
'use client';

import type { Media } from '@/lib/types';
import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Play } from 'lucide-react';
import { YoutubeEmbed } from './youtube-embed';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { StarRating } from './star-rating';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
    {children}
  </a>
);

export function MediaDetailView({ media }: { media: Media }) {
  const router = useRouter();

  const director = media.staff?.edges.find(edge => edge.role.includes('Director'))?.node;
  const writer = media.staff?.edges.find(edge => edge.role.includes('Original Creator') || edge.role.includes('Script'))?.node;

  const fullDescription = media.description.replace(/<[^>]*>?/gm, '');

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-sans text-white bg-black">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full">
        <header className="absolute top-0 left-0 right-0 py-6 px-4 sm:px-6 lg:px-8 z-20">
          <nav className="flex items-center justify-center space-x-6">
             <NavLink href="/dashboard">Home</NavLink>
             <NavLink href="#">Characters</NavLink>
             <NavLink href="#">Related</NavLink>
             <NavLink href="#">Where to Watch</NavLink>
          </nav>
        </header>
        
        <main className="flex flex-col md:flex-row items-center justify-between w-full min-h-screen pt-20 md:pt-0">
          <div className="w-full md:w-1/2 lg:w-2/5 text-center md:text-left">
            <h1 className="text-[50px] font-serif font-bold tracking-tight text-shadow-lg" style={{filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))'}}>
              {media.title.english || media.title.romaji}
            </h1>
            <p className="text-xl lg:text-2xl font-light text-white/80 mt-2 tracking-widest">
              {media.title.native}
            </p>
            {media.trailer?.id && (
              <Dialog>
                <DialogTrigger asChild>
                   <Button variant="outline" className="mt-8 bg-white/10 border-white/20 backdrop-blur-sm text-white hover:bg-white/20 transition-all rounded-full px-6 py-3">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Trailer
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/80 border-white/20 p-0 max-w-4xl">
                  <YoutubeEmbed embedId={media.trailer.id} />
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          <div className="w-full md:w-1/2 lg:w-2/5 mt-12 md:mt-0 relative">
             <div className="absolute -right-20 -top-20 md:-right-40 md:-top-40 w-full h-full" style={{
                background: 'radial-gradient(circle, rgba(29, 161, 242, 0.1) 0%, rgba(29, 161, 242, 0) 60%)'
             }}></div>

            <div className="relative z-10 p-8 rounded-lg space-y-4">
                {director && (
                    <div>
                        <p className="text-white/70">Directed and Written by:</p>
                        <h2 className="text-2xl font-bold">{director.name.full}</h2>
                    </div>
                )}
                {writer && !director && (
                    <div>
                        <p className="text-white/70">Written by:</p>
                        <h2 className="text-2xl font-bold">{writer.name.full}</h2>
                    </div>
                )}

                <div className="flex items-center gap-4 text-white/70">
                   {media.averageScore && (
                     <>
                        <StarRating score={media.averageScore / 10} />
                        <span>{media.averageScore / 10}/10</span>
                     </>
                   )}
                </div>
                
                <div className="text-sm text-white/70 flex items-center gap-x-4">
                    <span>{media.startDate.year}</span>
                    {media.episodes && <span>{media.episodes} episodes</span>}
                    <span>{media.format}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                    {media.genres.slice(0, 3).map(genre => (
                        <div key={genre} className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm">
                            {genre}
                        </div>
                    ))}
                </div>

                <div className="text-white/90 pt-4 leading-relaxed">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="line-clamp-4 cursor-help">
                          {fullDescription}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md bg-black/80 text-white border-white/20 backdrop-blur-sm">
                        <p>{fullDescription}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
            </div>
          </div>
        </main>
      </div>

       <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          {media.coverImage?.extraLarge && (
            <Image
              src={media.coverImage.extraLarge}
              alt={media.title.userPreferred}
              width={500}
              height={750}
              className="object-contain w-auto h-auto max-h-[80vh] md:max-h-[90vh] -translate-y-4 filter drop-shadow-[0_25px_25px_rgba(0,0,0,0.75)]"
              priority
              data-ai-hint="anime manga character"
            />
          )}
        </div>
    </div>
  );
}
