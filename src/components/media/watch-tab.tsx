import type { Media } from '@/lib/types';

const platforms = [
  { name: "aniplay.lol", url: "https://aniplay.lol" },
  { name: "animeonsen.xyz", url: "https://animeonsen.xyz" },
  { name: "enimoe.live", url: "https://enimoe.live" },
  { name: "miruro.to", url: "https://www.miruro.to" },
  { name: "animetsu.cc", url: "https://animetsu.cc" },
  { name: "aninow.tv", url: "https://aninow.tv" },
];

function generatePlatformUrl(platformName: string, platformUrl: string, anilistId: number, slug: string): string {
  switch (platformName) {
    case 'aniplay.lol':
      return `${platformUrl}/anime/info/${anilistId}`;
    case 'animeonsen.xyz':
      return platformUrl; // Links to homepage
    case 'enimoe.live':
      return `https://enimoe.live/watch?type=anime&id=${anilistId}`;
    case 'miruro.to':
      return `https://www.miruro.to/watch?id=${anilistId}`;
    case 'animetsu.cc':
      return `https://animetsu.cc/anime/${anilistId}`;
    case 'aninow.tv':
      return `https://aninow.tv/a/${slug}`;
    default:
      return platformUrl;
  }
}

export function WatchTab({ media }: { media: Media }) {
  const slug = media.title.romaji.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {platforms.map(platform => {
        const url = generatePlatformUrl(platform.name, platform.url, media.id, slug);
        return (
          <a
            key={platform.name}
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
  );
}
