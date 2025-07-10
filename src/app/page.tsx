import { Header } from '@/components/header';
import { AnimeView } from '@/components/anime-view';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <AnimeView />
      </main>
    </div>
  );
}
