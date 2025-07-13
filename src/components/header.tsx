'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DigitalClock } from './digital-clock';
import { useEffect, useState } from 'react';
import type { UserProfile } from '@/app/profile/page';

const defaultAvatar = "https://placehold.co/40x40.png";

function AnimatedEarthLogo() {
  return (
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

    // Listen for changes to localStorage from other tabs/windows
    window.addEventListener('storage', updateAvatar);
    
    // Custom event to listen for changes from the same tab
    window.addEventListener('profileUpdated', updateAvatar);

    return () => {
      window.removeEventListener('storage', updateAvatar);
      window.removeEventListener('profileUpdated', updateAvatar);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
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
