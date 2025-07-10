"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { Media } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface HeroProps {
  trending: Media[]
  type: 'ANIME' | 'MANGA'
}

export function Hero({ trending, type }: HeroProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', containScroll: false })
  const [tweenValues, setTweenValues] = useState<number[]>([])
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const onScroll = useCallback(() => {
    if (!emblaApi) return

    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopPoint) => {
          const target = loopPoint.target()
          if (index === loopPoint.index && target !== 0) {
            const sign = Math.sign(target)
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
          }
        })
      }
      const tweenValue = 1 - Math.abs(diffToTarget) * 2
      return Math.max(0, Math.min(1, tweenValue))
    })
    setTweenValues(styles)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onScroll()
    emblaApi.on('scroll', onScroll)
    emblaApi.on('reInit', onScroll)

    return () => {
        emblaApi.off('scroll', onScroll)
        emblaApi.off('reInit', onScroll)
    }
  }, [emblaApi, onScroll])
  
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const handleItemClick = (item: Media) => {
    setSelectedMedia(item);
  };

  const showBackgroundVideo = selectedMedia && type === 'ANIME' && selectedMedia.trailer?.site === 'youtube' && selectedMedia.trailer.id;

  if (!trending || trending.length === 0) {
    return <div className="h-screen w-full bg-background" />
  }

  return (
    <section className="group relative h-screen w-full overflow-hidden bg-background">
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            key={selectedMedia.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {showBackgroundVideo ? (
              <div className="absolute inset-0">
                <iframe
                  className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-125 pointer-events-none"
                  src={`https://www.youtube.com/embed/${selectedMedia.trailer!.id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${selectedMedia.trailer!.id}&vq=hd1080&playsinline=1`}
                  title="YouTube video player background"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                ></iframe>
              </div>
            ) : (
              selectedMedia.bannerImage && (
                <Image
                  src={selectedMedia.bannerImage}
                  alt={`Banner for ${selectedMedia.title.romaji}`}
                  fill
                  priority
                  className="object-cover"
                  data-ai-hint="anime manga background"
                />
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className={cn("absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500", selectedMedia ? "opacity-100" : "opacity-0")} />
      <div className={cn("absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-opacity duration-500", selectedMedia ? "opacity-100" : "opacity-0")} />

      <AnimatePresence>
        {selectedMedia && (
            <motion.div 
              className="absolute top-1/3 md:top-1/4 left-8 md:left-16 max-w-lg z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
                <h1 className="font-headline text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                    {selectedMedia.title.english || selectedMedia.title.romaji}
                </h1>
                <p
                    className="mt-4 text-sm md:text-base text-gray-300 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: selectedMedia.description || '' }}
                />
            </motion.div>
        )}
      </AnimatePresence>
      
      <div 
        className={cn(
            "relative z-10 h-full w-full flex flex-col items-center justify-end"
        )}
        style={{ perspective: '1000px' }}
      >
        <div 
          className={cn(
            "w-full overflow-hidden transition-all duration-700 ease-in-out",
            selectedMedia ? 'opacity-0 translate-y-full pointer-events-none' : 'opacity-100'
          )}
          ref={emblaRef}
        >
          <div 
            className={cn("flex items-center", "pb-24")} 
            style={{ transformStyle: 'preserve-3d' }}
          >
            {trending.map((item, index) => {
              const scale = 0.85 + (tweenValues[index] || 0) * 0.25;
              const yPos = -40 * (1 - (tweenValues[index] || 0));
               
              return (
                <motion.div
                  key={item.id}
                  className="relative flex-grow-0 flex-shrink-0 basis-full md:basis-2/3 lg:basis-1/3 px-4"
                   style={{ 
                    transform: `scale(${scale}) translateY(${yPos}px)`,
                   }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="group/card relative aspect-[2/3] w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 ease-in-out hover:-translate-y-2.5 cursor-pointer">
                    <Image
                      src={item.coverImage.extraLarge}
                      alt={item.title.romaji}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 33vw"
                      data-ai-hint="anime manga poster"
                    />
                    
                    <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl" />
                      <div className="relative z-10 flex flex-col justify-end p-5 h-full text-white">
                          <h3 className="text-xl font-bold">{item.title.english || item.title.romaji}</h3>
                          <div className="flex flex-wrap gap-1.5 my-2">
                              {(item.genres || []).slice(0, 3).map(genre => <Badge key={genre} variant="secondary" className="bg-white/20 border-none text-xs px-2 py-0.5">{genre}</Badge>)}
                          </div>
                          <p className="text-xs text-gray-200 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.description || '' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {!selectedMedia && (
            <div className="absolute bottom-10 z-20 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="icon" className="rounded-full bg-black/20 border-white/30 hover:bg-black/40 text-white hover:scale-110 transition-transform backdrop-blur-sm" onClick={scrollPrev}>
                    <ChevronLeft />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full bg-black/20 border-white/30 hover:bg-black/40 text-white hover:scale-110 transition-transform backdrop-blur-sm" onClick={scrollNext}>
                    <ChevronRight />
                </Button>
            </div>
        )}

        {selectedMedia && (
          <motion.div
            className="absolute bottom-10 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black/20 border-white/30 hover:bg-black/40 text-white hover:scale-110 transition-transform backdrop-blur-sm"
              onClick={() => setSelectedMedia(null)}
            >
              <ChevronUp className="h-5 w-5" />
              <span className="sr-only">Show carousel</span>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
