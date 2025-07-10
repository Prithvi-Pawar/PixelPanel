import Link from 'next/link';
import { Button } from './ui/button';
import { Search, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 font-headline text-2xl font-bold text-white focus:outline-none rounded-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Panel<span className="text-lg text-primary">Pixel</span>
            <ChevronDown className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <Link href="/" passHref>
              <DropdownMenuItem className="cursor-pointer">
                Anime
              </DropdownMenuItem>
            </Link>
            <Link href="/manga" passHref>
              <DropdownMenuItem className="cursor-pointer">
                Manga
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
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
