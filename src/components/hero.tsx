"use client"

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { Media } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Plus } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface HeroProps {
  trending: Media[]
  type: 'ANIME' | 'MANGA'
}

export function Hero({ trending, type }: HeroProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [activeIndex, setActiveIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setActiveIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])
  
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const activeMedia = trending[activeIndex]

  if (!trending || trending.length === 0) {
    return <div className="h-[70vh] w-full bg-background" />
  }

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {trending.map((item) => (
            <div key={item.id} className="relative flex-grow-0 flex-shrink-0 w-full h-full">
              {item.bannerImage && (
                <Image
                  src={item.bannerImage}
                  alt={`Banner for ${item.title.romaji}`}
                  fill
                  priority={item.id === activeMedia.id}
                  className="object-cover"
                  data-ai-hint="anime manga background"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMedia.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
              {activeMedia.title.english || activeMedia.title.romaji}
            </h1>
            <p
                className="mt-4 text-sm md:text-base text-gray-300 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: activeMedia.description || '' }}
            />
            <div className="mt-6 flex gap-4">
              <Button size="lg" className="bg-primary/90 hover:bg-primary text-primary-foreground font-semibold">
                <Play className="mr-2 h-5 w-5"/>
                Watch Trailer
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                <Plus className="mr-2 h-5 w-5" />
                Add to Watchlist
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 right-8 z-10 flex gap-2">
        <Button variant="outline" size="icon" className="rounded-full bg-black/20 border-white/30 hover:bg-black/40 text-white" onClick={scrollPrev}>
          <ChevronLeft />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full bg-black/20 border-white/30 hover:bg-black/40 text-white" onClick={scrollNext}>
          <ChevronRight />
        </Button>
      </div>
    </section>
  )
}
