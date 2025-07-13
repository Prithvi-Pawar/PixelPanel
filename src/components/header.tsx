'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DigitalClock } from './digital-clock';
import { useEffect, useState } from 'react';
import type { UserProfile } from '@/app/profile/page';

const defaultAvatar = "https://placehold.co/40x40.png";

function AnimatedEarthLogo() {
  return (
    <>
      <style>
        {`
          @keyframes spin-earth {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          .scene {
            width: 32px;
            height: 32px;
            perspective: 800px;
          }
          .globe {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            animation: spin-earth 12s linear infinite;
          }
          .globe-wrap {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            transform-style: preserve-3d;
          }
          .circle {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: transparent;
            border: 1px solid currentColor;
            opacity: 0.5;
          }
          .land {
            position: absolute;
            height: 12px;
            background: currentColor;
            border-radius: 6px;
            opacity: 0.7;
          }
          .land-1 { width: 20px; top: 10px; left: 5px; transform: rotate(20deg); }
          .land-2 { width: 15px; top: 2px; left: 15px; transform: rotate(-30deg); }
          .land-3 { width: 10px; bottom: 5px; left: 2px; transform: rotate(50deg); }

          .globe .globe-wrap:nth-child(1) { transform: rotateY(30deg); }
          .globe .globe-wrap:nth-child(2) { transform: rotateY(90deg); }
          .globe .globe-wrap:nth-child(3) { transform: rotateY(150deg); }
        `}
      </style>
      <div className="scene">
        <div className="globe">
          <div className="globe-wrap">
            <div className="circle"></div>
            <div className="land land-1"></div>
          </div>
          <div className="globe-wrap">
            <div className="circle"></div>
            <div className="land land-2"></div>
          </div>
          <div className="globe-wrap">
            <div className="circle"></div>
            <div className="land land-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Header() {
  const [avatarUrl, setAvatarUrl] = useState<string>(defaultAvatar);

  useEffect(() => {
    const updateAvatar = () => {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profile: UserProfile = JSON.parse(savedProfile);
        setAvatarUrl(profile.avatarUrl);
      } else {
        setAvatarUrl(defaultAvatar);
      }
    };

    updateAvatar();

    window.addEventListener('storage', updateAvatar);
    window.addEventListener('profileUpdated', updateAvatar);

    return () => {
      window.removeEventListener('storage', updateAvatar);
      window.removeEventListener('profileUpdated', updateAvatar);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <AnimatedEarthLogo />
          <div className="flex items-center">
            <span className="font-headline text-2xl font-bold text-white">Pixel</span>
            <span className="font-headline text-2xl font-bold text-primary">Panel</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <DigitalClock />
          <Avatar className="h-10 w-10 ring-2 ring-primary/50 ring-offset-4 ring-offset-background">
            <AvatarImage src={avatarUrl} data-ai-hint="anime avatar" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
