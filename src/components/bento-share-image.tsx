
import { forwardRef } from 'react';
import type { Media } from '@/lib/types';
import type { UserProfile } from '@/app/profile/page';
import Image from 'next/image';

interface BentoShareImageProps {
  media: Media;
  user: UserProfile;
}

export const BentoShareImage = forwardRef<HTMLDivElement, BentoShareImageProps>(({ media, user }, ref) => {
    const synopsis = media.description?.replace(/<[^>]*>?/gm, '').split(' ').slice(0, 50).join(' ') + '...';
    const statusText = media.episodes ? `${media.episodes} Episodes` : (media.status === 'RELEASING' ? 'Releasing' : 'Finished');

    return (
        <div
            ref={ref}
            className="w-[1080px] h-[1080px] bg-[#121212] p-12 font-sans flex flex-col"
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            <div className="flex-1 grid grid-cols-2 grid-rows-3 gap-6">
                
                {/* Top Left: Title */}
                <div className="bg-[#1C1C1C] rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                    <div>
                        <p className="text-3xl text-gray-400">{media.startDate?.year}</p>
                        <h1 className="text-6xl font-bold text-white mt-2 break-words line-clamp-4">{media.title.userPreferred}</h1>
                    </div>
                </div>

                {/* Top Right: Synopsis */}
                <div className="row-span-2 bg-[#1C1C1C] rounded-3xl p-8 flex flex-col shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-400 mb-4">SYNOPSIS</h2>
                    <p className="text-2xl text-gray-300 leading-relaxed line-clamp-[10]">
                        {synopsis}
                    </p>
                </div>

                {/* Center Left: Cover Image */}
                <div className="row-span-2 col-start-1 row-start-2 relative rounded-3xl overflow-hidden shadow-lg">
                    <Image
                        src={media.coverImage.extraLarge}
                        alt={media.title.userPreferred}
                        fill
                        className="object-cover"
                        style={{ width: '100%', height: '100%' }}
                        unoptimized
                        data-ai-hint="anime manga poster"
                    />
                </div>

                {/* Bottom Right: Details */}
                <div className="bg-[#1C1C1C] rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-400 mb-2">GENRE</h3>
                        <p className="text-3xl text-white">{media.genres.slice(0, 3).join(' | ')}</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-400 mb-2">{media.type === 'MANGA' ? 'CHAPTERS' : 'EPISODES'}</h3>
                        <p className="text-3xl text-white">{statusText}</p>
                    </div>
                </div>
            </div>
            
            {/* Footer: User Info */}
            <div className="mt-8 flex items-center gap-4">
                 <div className="w-20 h-20 rounded-full overflow-hidden relative">
                    <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        fill
                        className="object-cover"
                        unoptimized
                        data-ai-hint="user avatar"
                    />
                 </div>
                <p className="text-4xl font-semibold text-white">{user.name}</p>
            </div>
        </div>
    );
});

BentoShareImage.displayName = 'BentoShareImage';
