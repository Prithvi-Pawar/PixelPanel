import type { Media } from '@/lib/types';
import { CharacterVoiceActorCard } from '../character-voice-actor-card';

export function CharactersTab({ media }: { media: Media }) {
  const characters = media.characters?.edges || [];

  if (characters.length === 0) {
    return <p className="text-muted-foreground">No character information available.</p>;
  }
  
  const mainCharacters = characters.filter(edge => edge.role === 'MAIN');
  const supportingCharacters = characters.filter(edge => edge.role === 'SUPPORTING');

  return (
    <div className="space-y-8">
      {mainCharacters.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Main Characters</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mainCharacters.map(edge => (
              <CharacterVoiceActorCard 
                key={edge.node.id} 
                character={edge.node} 
                voiceActor={edge.voiceActors[0]} 
              />
            ))}
          </div>
        </section>
      )}

      {supportingCharacters.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Supporting Characters</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {supportingCharacters.map(edge => (
               <CharacterVoiceActorCard 
                key={edge.node.id} 
                character={edge.node} 
                voiceActor={edge.voiceActors[0]} 
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
