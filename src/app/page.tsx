'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <iframe
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-[1.2]"
          src={`https://www.youtube.com/embed/kDCXBwzSI-4?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=kDCXBwzSI-4`}
          title="YouTube video player background"
          frameBorder="0"
          allow="autoplay; encrypted-media; loop"
          allowFullScreen={false}
        ></iframe>
      </div>
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 flex flex-col items-center text-center text-white p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center"
        >
          <span className="font-headline text-6xl md:text-8xl font-bold text-white">Pixel</span>
          <span className="font-headline text-6xl md:text-8xl font-bold text-primary">Panel</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="mt-4 text-lg md:text-xl text-muted-foreground"
        >
          Your Modern Anime Streaming Dashboard.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
          className="mt-8"
        >
          <Link href="/dashboard">
            <Button size="lg" className="h-12 px-8 text-lg">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
