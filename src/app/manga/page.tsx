import { Suspense } from 'react';
import { MangaSection } from '@/components/manga-section';
import { SectionSkeleton } from '@/components/section-skeleton';
import { Header } from '@/components/header';

export default function MangaPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<SectionSkeleton />}>
          <MangaSection />
        </Suspense>
      </main>
    </div>
  );
}
