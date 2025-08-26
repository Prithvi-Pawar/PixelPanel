'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SlideButton } from '@/components/ui/slide-button';

export default function LandingPage() {
  const [animationState, setAnimationState] = useState<'initial' | 'transitioning' | 'final'>('initial');
  const [loadVideo, setLoadVideo] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Lazy load the video after the initial animation to improve performance
    const timer = setTimeout(() => setLoadVideo(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setAnimationState('transitioning');
    setTimeout(() => {
      setAnimationState('final');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500); // Wait for text to be visible before navigating
    }, 1000); // Duration of zoom animation
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      {animationState !== 'final' && (
        <div className="w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full z-0">
            {loadVideo && (
              <iframe
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-[1.2]"
                src={`https://www.youtube.com/embed/zhDwjnYZiCo?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=zhDwjnYZiCo&start=50`}
                title="YouTube video player background"
                frameBorder="0"
                allow="autoplay; encrypted-media; loop"
                allowFullScreen={false}
              ></iframe>
            )}
          </div>
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative z-20 flex flex-col items-center text-center text-white p-4 h-full justify-center">
            <AnimatePresence>
              {animationState === 'initial' && (
                <motion.div
                  key="landing-content"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
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
                    className="mt-4 text-lg md:text-xl max-w-md"
                  >
                    Your Modern Anime Streaming Dashboard.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-8 relative flex items-center justify-center">
                <AnimatePresence>
                    {animationState === 'initial' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                        >
                            <SlideButton onComplete={handleComplete} />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <AnimatePresence>
                    {animationState === 'transitioning' && (
                        <motion.div
                            key="zoom-transition"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 80, opacity: 1 }}
                            transition={{ duration: 1, ease: 'easeIn' }}
                            className="absolute z-30 w-16 h-16 rounded-full bg-background"
                        />
                    )}
                </AnimatePresence>
            </div>
          </div>
        </div>
      )}
      
      {animationState === 'final' && (
         <div className="absolute inset-0 bg-background z-40 flex items-center justify-center">
            <motion.h1
              key="final-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white text-4xl font-headline"
            >
              PixelPanel
            </motion.h1>
          </div>
      )}
    </div>
  );
}
