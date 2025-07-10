import { Header } from '@/components/header';
import { MangaView } from '@/components/manga-view';

export default function MangaPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <MangaView />
      </main>
    </div>
  );
}
