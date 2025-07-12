// This component is not used in the new design, which will feature a global sidebar.
// It is kept for now to support the /manga page, but can be removed later.
import Link from 'next/link';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            PanelPixel
        </Link>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>
        </div>
      </div>
    </header>
  );
}
