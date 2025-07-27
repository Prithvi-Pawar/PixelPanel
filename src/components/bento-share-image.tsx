
import { forwardRef } from 'react';
import type { Media } from '@/lib/types';
import type { UserProfile } from '@/app/profile/page';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BentoShareImageProps {
  media: Media;
  user: UserProfile;
}

export const BentoShareImage = forwardRef<HTMLDivElement, BentoShareImageProps>(({ media, user }, ref) => {
    const synopsis = media.description?.replace(/<[^>]*>?/gm, '').split(' ').slice(0, 50).join(' ') + '...';
    const statusText = media.type === 'MANGA' 
      ? (media.chapters ? `${media.chapters} Chapters` : (media.status === 'RELEASING' ? 'Releasing' : 'Finished'))
      : (media.episodes ? `${media.episodes} Episodes` : (media.status === 'RELEASING' ? 'Releasing' : 'Finished'));
    const statusLabel = media.type === 'MANGA' ? 'CHAPTERS' : 'EPISODES';

    return (
        <div
            ref={ref}
            className="w-[1080px] h-[1080px] bg-[#121212] p-12 font-sans flex flex-col"
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-6">
                
                {/* Top Left: Title & Year */}
                <div className="col-span-2 bg-[#1C1C1C] rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                    <div>
                        <p className="text-3xl text-gray-400">{media.startDate?.year}</p>
                        <h1 className="text-6xl font-bold text-white mt-2 break-words line-clamp-4">{media.title.userPreferred}</h1>
                    </div>
                </div>

                {/* Top Right: Synopsis */}
                <div className="row-span-2 bg-[#1C1C1C] rounded-3xl p-8 flex flex-col shadow-lg">
                   <div className="flex items-center gap-4 mb-6">
                     <div className="w-20 h-20 rounded-full overflow-hidden relative flex-shrink-0">
                        <Image
                            src={user.avatarUrl}
                            alt={user.name}
                            fill
                            className="object-cover"
                            unoptimized
                            data-ai-hint="user avatar"
                        />
                     </div>
                    <p className="text-3xl font-semibold text-white truncate">{user.name}</p>
                   </div>
                   <h2 className="text-2xl font-semibold text-gray-400 mb-4">SYNOPSIS</h2>
                    <p className="text-2xl text-gray-300 leading-relaxed line-clamp-[8]">
                        {synopsis}
                    </p>
                </div>
                
                {/* Center & Bottom Left: Cover Image */}
                <div className="row-span-2 col-span-2 row-start-2 relative rounded-3xl overflow-hidden shadow-lg">
                    <Image
                        src={media.coverImage.extraLarge}
                        alt={media.title.userPreferred}
                        fill
                        className="object-cover"
                        unoptimized
                        data-ai-hint="anime manga poster"
                    />
                </div>
                
                {/* Bottom Right: Details */}
                <div className="bg-[#1C1C1C] rounded-3xl p-8 flex flex-col justify-around shadow-lg">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-400 mb-2">GENRE</h3>
                        <p className="text-3xl text-white">{media.genres.slice(0, 2).join(' | ')}</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-400 mb-2">{statusLabel}</h3>
                        <p className="text-3xl text-white">{statusText}</p>
                    </div>
                </div>

            </div>
        </div>
    );
});

BentoShareImage.displayName = 'BentoShareImage';
