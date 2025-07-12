import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DigitalClock } from './digital-clock';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-2xl font-bold text-white">Pixel</span>
          <span className="font-headline text-2xl font-bold text-primary">Panel</span>
        </Link>
        <div className="flex items-center gap-4">
          <DigitalClock />
          <Avatar className="h-10 w-10 ring-2 ring-primary/50 ring-offset-4 ring-offset-background">
            <AvatarImage src="https://placehold.co/40x40.png" data-ai-hint="anime avatar" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
