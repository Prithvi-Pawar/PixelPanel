import { Suspense } from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimeSection } from '@/components/anime-section';
import { MangaSection } from '@/components/manga-section';
import { Skeleton } from '@/components/ui/skeleton';

function SectionSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-screen w-full rounded-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12">
        <div>
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Tabs defaultValue="anime" className="w-full flex flex-col">
        <header className="fixed top-0 z-50 w-full border-b border-transparent bg-transparent supports-[backdrop-filter]:bg-transparent">
          <div className="container flex h-16 max-w-screen-2xl items-center">
            <Link href="/" className="mr-6 flex items-baseline space-x-2">
              <span className="font-black text-2xl text-white tracking-tighter">Panel</span>
              <span className="font-semibold text-xl text-primary">Pixel</span>
            </Link>
            <div className="flex flex-1 items-center justify-end space-x-2">
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger value="anime" className="text-base font-medium transition-colors hover:text-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-primary data-[state=active]:shadow-none px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent text-white">Anime</TabsTrigger>
                <TabsTrigger value="manga" className="text-base font-medium transition-colors hover:text-primary focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-primary data-[state=active]:shadow-none px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary bg-transparent text-white">Manga</TabsTrigger>
              </TabsList>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <TabsContent value="anime" className="mt-0 border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
            <Suspense fallback={<SectionSkeleton />}>
              <AnimeSection />
            </Suspense>
          </TabsContent>
          <TabsContent value="manga" className="mt-0 border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
            <Suspense fallback={<SectionSkeleton />}>
              <MangaSection />
            </Suspense>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
