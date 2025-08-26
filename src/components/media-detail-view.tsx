
'use client';

import type { Media } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Play, Heart, Share2, Download, X, Image as ImageIcon, LayoutGrid } from 'lucide-react';
import { YoutubeEmbed } from './youtube-embed';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from './ui/dialog';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { OverviewTab } from './media/overview-tab';
import { CharactersTab } from './media/characters-tab';
import { RelatedTab } from './media/related-tab';
import { WatchTab } from './media/watch-tab';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import type { UserProfile } from '@/app/profile/page';
import { BentoShareImage } from './bento-share-image';
import { MinimalShareImage } from './minimal-share-image';
import { toPng } from 'html-to-image';


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
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const bentoRef = useRef<HTMLDivElement>(null);
  const minimalRef = useRef<HTMLDivElement>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isShareOptionsOpen, setIsShareOptionsOpen] = useState(false);


  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
    }
    const likedAnime: Media[] = JSON.parse(localStorage.getItem('likedAnime') || '[]');
    const isAlreadyLiked = likedAnime.some(anime => anime.id === media.id);
    setIsLiked(isAlreadyLiked);
  }, [media.id]);

  const toggleLike = () => {
    const likedAnime: Media[] = JSON.parse(localStorage.getItem('likedAnime') || '[]');
    const isAlreadyLiked = likedAnime.some(anime => anime.id === media.id);
    
    let updatedLikedAnime: Media[];

    if (isAlreadyLiked) {
      updatedLikedAnime = likedAnime.filter(anime => anime.id !== media.id);
      localStorage.setItem('likedAnime', JSON.stringify(updatedLikedAnime));
      setIsLiked(false);
      toast({ title: "Removed from Likes" });
    } else {
      if (likedAnime.length > 0) {
        toast({
          title: "You can only like one anime.",
          description: "Please unlike the other anime to like this one.",
          variant: "destructive"
        });
        return;
      }
      updatedLikedAnime = [media];
      localStorage.setItem('likedAnime', JSON.stringify(updatedLikedAnime));
      setIsLiked(true);
      toast({ title: "Added to Likes" });
    }
  };

  const generateImage = async (style: 'aesthetic' | 'minimal') => {
    const targetRef = style === 'aesthetic' ? bentoRef : minimalRef;
    if (!targetRef.current) return;
    
    setIsGenerating(true);
    setIsShareOptionsOpen(false);

    try {
        const dataUrl = await toPng(targetRef.current, { 
            cacheBust: true,
            pixelRatio: 2,
             style: {
                opacity: '1',
                transform: 'scale(1)',
                position: 'relative',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0'
            }
        });
        setPreviewImage(dataUrl);
        setIsPreviewOpen(true);
    } catch (err) {
        console.error('Failed to generate image', err);
        toast({
            variant: 'destructive',
            title: "Image Generation Failed",
            description: "Could not create the shareable image.",
        });
    } finally {
        setIsGenerating(false);
    }
  };


  const handleDownload = () => {
    if (!previewImage) return;
    const link = document.createElement('a');
    link.download = `${media.title.romaji.toLowerCase().replace(/ /g, '-')}-share.png`;
    link.href = previewImage;
    link.click();
    toast({
        title: "Image Downloading",
        description: "Your shareable image is being downloaded."
    });
  };


  return (
    <>
      <div style={{ position: 'fixed', top: '-2000px', left: '-2000px', opacity: 0 }}>
        <BentoShareImage 
            ref={bentoRef} 
            media={media} 
            user={userProfile || { name: 'Anonymous', avatarUrl: 'https://placehold.co/100x100.png', bio: '' }} 
        />
        <MinimalShareImage ref={minimalRef} media={media} />
      </div>

      <Dialog open={isShareOptionsOpen} onOpenChange={setIsShareOptionsOpen}>
        <DialogContent className="bg-background/80 border-white/20 p-6 max-w-sm">
            <DialogHeader>
                <DialogTitle>Choose a Share Style</DialogTitle>
                <DialogDescription>Select a style for your shareable image.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 pt-4">
                <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => generateImage('aesthetic')} disabled={isGenerating}>
                    <LayoutGrid className="h-6 w-6" />
                    Aesthetic
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2" onClick={() => generateImage('minimal')} disabled={isGenerating}>
                    <ImageIcon className="h-6 w-6" />
                    Minimal
                </Button>
            </div>
        </DialogContent>
      </Dialog>


      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="bg-background/80 border-white/20 p-4 max-w-3xl">
          <DialogHeader>
            <DialogTitle>Share Preview</DialogTitle>
          </DialogHeader>
          {previewImage && (
            <div className="flex items-center justify-center p-4">
              <Image 
                src={previewImage} 
                alt="Share preview" 
                width={1080} 
                height={1350} 
                className="rounded-lg max-w-full h-auto"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: '70vh'
                }}
              />
            </div>
          )}
          <DialogFooter className="sm:justify-between gap-2">
            <DialogClose asChild>
                <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-background text-white">
        <div className="relative min-h-[60vh] md:min-h-[70vh] w-full flex flex-col items-center justify-center overflow-hidden font-sans">
          {media.trailer?.site === 'youtube' && media.trailer.id ? (
            <iframe
              className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
              style={{ minWidth: '177.77vw', minHeight: '100vh' }}
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
                      <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
                          {media.trailer?.id && (
                              <Dialog>
                              <DialogTrigger asChild>
                                  <Button variant="outline" className="rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                                      <Play className="h-4 w-4" />
                                      Watch Trailer
                                  </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-black/80 border-white/20 p-0 max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle className="sr-only">{media.title.userPreferred} Trailer</DialogTitle>
                                  </DialogHeader>
                                  <YoutubeEmbed embedId={media.trailer.id} />
                              </DialogContent>
                              </Dialog>
                          )}
                          <a href={`https://anilist.co/anime/${media.id}`} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="icon" className="rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 p-2">
                                  <Image src="https://logo.svgcdn.com/s/anilist-dark.png" alt="Anilist Logo" width={24} height={24} className="object-contain" />
                                  <span className="sr-only">View on AniList</span>
                              </Button>
                          </a>
                      </div>
                      <div className="flex items-center gap-3 mt-3 justify-center md:justify-start">
                          <Button variant="outline" size="icon" className="rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20" onClick={toggleLike}>
                              <Heart className={cn("h-5 w-5", isLiked && "fill-red-500 text-red-500")} />
                              <span className="sr-only">Like</span>
                          </Button>
                          <Button variant="outline" size="icon" className="rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20" onClick={() => setIsShareOptionsOpen(true)} disabled={isGenerating}>
                            {isGenerating ? <Download className="h-5 w-5 animate-pulse" /> : <Share2 className="h-5 w-5" />}
                              <span className="sr-only">Share</span>
                          </Button>
                      </div>
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
    </>
  );
}

    

    