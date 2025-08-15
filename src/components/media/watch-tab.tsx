
import type { Media } from '@/lib/types';
import { Separator } from '../ui/separator';

const platforms = [
  { name: "Aniplay", key: "aniplay.lol", url: "https://aniplay.lol" },
  { name: "ANIMEONSEN", key: "animeonsen.xyz", url: "https://animeonsen.xyz" },
  { name: "Enimoe", key: "enimoe.live", url: "https://enimoe.live" },
  { name: "Miruro", key: "miruro.to", url: "https://www.miruro.to" },
  { name: "Gojo.live", key: "gojo.live", url: "https://gojo.live" },
  { name: "AniNow", key: "aninow.tv", url: "https://aninow.tv" },
];

function generatePlatformUrl(platformKey: string, platformUrl: string, anilistId: number, slug: string): string {
  switch (platformKey) {
    case 'aniplay.lol':
      return `${platformUrl}/anime/info/${anilistId}`;
    case 'animeonsen.xyz':
      return platformUrl; // Links to homepage
    case 'enimoe.live':
      return `https://enimoe.live/watch?type=anime&id=${anilistId}`;
    case 'miruro.to':
      return `https://www.miruro.to/watch?id=${anilistId}`;
    case 'gojo.live':
       return `${platformUrl}/anime/${slug}`;
    case 'aninow.tv':
      return `https://aninow.tv/a/${slug}`;
    default:
      return platformUrl;
  }
}

export function WatchTab({ media }: { media: Media }) {
  const slug = media.title.romaji.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map(platform => {
          const url = generatePlatformUrl(platform.key, platform.url, media.id, slug);
          return (
            <a
              key={platform.key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card/50 p-4 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <span className="font-semibold text-lg group-hover:underline">{platform.name}</span>
            </a>
          );
        })}
      </div>
      <Separator />
       <a
          href="https://kawaiines.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-card/50 p-4 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg group-hover:underline">Kawaiines</span>
            <span className="text-muted-foreground font-medium">(Hindi)</span>
          </div>
        </a>
    </div>
  );
}
