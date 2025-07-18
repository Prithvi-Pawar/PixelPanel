import type { Character, VoiceActor } from '@/lib/types';
import Image from 'next/image';

interface CharacterVoiceActorCardProps {
  character: Character;
  voiceActor?: VoiceActor;
}

export function CharacterVoiceActorCard({ character, voiceActor }: CharacterVoiceActorCardProps) {
  return (
    <div className="bg-card/50 hover:bg-white/5 transition-colors rounded-xl p-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={character.image.large}
            alt={character.name.full}
            fill
            className="object-cover"
            sizes="48px"
            data-ai-hint="anime character"
          />
        </div>
        <p className="font-semibold">{character.name.full}</p>
      </div>
      
      {voiceActor && (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{voiceActor.name.full}</p>
            <p className="text-sm text-muted-foreground">Japanese</p>
          </div>
          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={voiceActor.image.large}
              alt={voiceActor.name.full}
              fill
              className="object-cover"
              sizes="48px"
              data-ai-hint="person portrait"
            />
          </div>
        </div>
      )}
    </div>
  );
}
