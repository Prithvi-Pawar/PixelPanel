import { Header } from '@/components/header';

// This page can be removed or repurposed later as the new design
// focuses on a single homepage and sidebar navigation.
// For now, it will be an empty page with a header.

export default function MangaPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto py-8">
        <h1 className="text-4xl font-bold">Manga</h1>
        <p className="text-muted-foreground mt-2">This page will be updated with the new design.</p>
      </main>
    </div>
  );
}
