"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { Media } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { Badge } from './ui/badge'

interface HeroProps {
  trending: Media[]
  type: 'ANIME' | 'MANGA'
}

export function Hero({ trending, type }: HeroProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', containScroll: false })
  const [activeIndex, setActiveIndex] = useState(0)
  const [tweenValues, setTweenValues] = useState<number[]>([])
  const [videoPlaying, setVideoPlaying] = useState<number | null>(null)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const newActiveIndex = emblaApi.selectedScrollSnap()
    setActiveIndex(newActiveIndex)
    // Automatically play video for the active slide if it's anime with a trailer
    const activeMedia = trending[newActiveIndex]
    if (type === 'ANIME' && activeMedia?.trailer?.id) {
      setVideoPlaying(activeMedia.id)
    } else {
      setVideoPlaying(null)
    }
  }, [emblaApi, trending, type])

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
    onSelect()
    onScroll()
    emblaApi.on('select', onSelect)
    emblaApi.on('scroll', onScroll)
    emblaApi.on('reInit', onScroll)

    return () => {
        emblaApi.off('select', onSelect)
        emblaApi.off('scroll', onScroll)
        emblaApi.off('reInit', onScroll)
    }
  }, [emblaApi, onSelect, onScroll])

  const handleCardClick = (media: Media) => {
    if (type === 'ANIME' && media.trailer?.id) {
      setVideoPlaying(media.id)
    }
  }
  
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const activeMedia = trending[activeIndex]

  if (!trending || trending.length === 0) {
    return <div className="h-screen w-full bg-background" />
  }

  return (
    <section className="group relative h-screen w-full overflow-hidden bg-background">
      <AnimatePresence>
        {trending.map((media) => {
          const showVideo = videoPlaying === media.id && type === 'ANIME' && media.trailer?.site === 'youtube' && media.trailer.id;
          const showBanner = !showVideo && (videoPlaying === media.id || (videoPlaying === null && media.id === activeMedia?.id)) && media.bannerImage
          
          return (
            (showVideo || showBanner) && (
              <motion.div
                key={`${media.id}-${showVideo ? 'video' : 'banner'}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              >
                {showVideo ? (
                  <div className="absolute inset-0 pointer-events-none">
                    <iframe
                      className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-[1.7]"
                      src={`https://www.youtube.com/embed/${media.trailer.id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${media.trailer.id}&vq=hd1080&playsinline=1`}
                      title="YouTube video player background"
                      frameBorder="0"
                      allow="autoplay; encrypted-media; picture-in-picture"
                    ></iframe>
                  </div>
                ) : (
                  media.bannerImage && (
                    <Image
                      src={media.bannerImage}
                      alt={`Banner for ${media.title.romaji}`}
                      fill
                      priority={media.id === activeMedia.id}
                      className="object-cover"
                      data-ai-hint="anime manga background"
                    />
                  )
                )}
              </motion.div>
            )
          )
        })}
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      
      <div className="relative z-20 h-full w-full flex flex-col items-center justify-end" style={{ perspective: '1000px' }}>
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className="flex items-center pb-24" style={{ transformStyle: 'preserve-3d' }}>
            {trending.map((item, index) => {
              const scale = activeIndex === index ? 1.1 : 0.85
              const rotateY = -40 * (1 - (tweenValues[index] || 0));
              const isCentered = activeIndex === index;
              return (
                <motion.div
                  key={item.id}
                  className="relative flex-grow-0 flex-shrink-0 basis-full md:basis-1/2 lg:basis-1/3 px-4"
                   style={{ 
                    transform: `scale(${isCentered ? 1 + (tweenValues[index] - 0.5) * 0.2 : 0.85 + tweenValues[index] * 0.1}) rotateY(${activeIndex > index ? rotateY : -rotateY}deg)`,
                   }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  onClick={() => handleCardClick(item)}
                >
                  <div className="group/card relative aspect-[2/3] w-full max-w-xs mx-auto overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 ease-in-out hover:-translate-y-2.5">
                    <Image
                      src={item.coverImage.extraLarge}
                      alt={item.title.romaji}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      data-ai-hint="anime manga poster"
                      priority={index >= activeIndex -1 && index <= activeIndex + 1}
                    />
                    
                    <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl" />
                      <div className="relative z-10 flex flex-col justify-end p-5 h-full text-white">
                          <h3 className="text-2xl font-bold">{item.title.english || item.title.romaji}</h3>
                          <div className="flex flex-wrap gap-1.5 my-2">
                              {(item.genres || []).slice(0, 3).map(genre => <Badge key={genre} variant="secondary" className="bg-white/20 border-none text-xs px-2 py-0.5">{genre}</Badge>)}
                          </div>
                          <p className="text-sm text-gray-200 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.description || '' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="absolute bottom-10 z-20 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="outline" size="icon" className="rounded-full bg-black/20 border-white/30 hover:bg-black/40 text-white hover:scale-110 transition-transform backdrop-blur-sm" onClick={scrollPrev}>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full bg-black/20 border-white/30 hover:bg-black/40 text-white hover:scale-110 transition-transform backdrop-blur-sm" onClick={scrollNext}>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  )
}
