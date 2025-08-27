import type { Character } from '@/lib/types';
import Image from 'next/image';
import { Badge } from './ui/badge';

interface CharacterCardProps {
  character: Character;
  role: 'MAIN' | 'SUPPORTING' | 'BACKGROUND';
}

export function CharacterCard({ character, role }: CharacterCardProps) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2 transition-transform duration-300 group-hover:scale-110">
        <Image
          src={character.image.large}
          alt={character.name.full}
          fill
          className="object-cover"
          sizes="96px"
          data-ai-hint="anime character portrait"
        />
      </div>
      <h3 className="font-semibold text-sm">{character.name.full}</h3>
      <Badge className="mt-1 text-xs">{role}</Badge>
    </div>
  );
}
