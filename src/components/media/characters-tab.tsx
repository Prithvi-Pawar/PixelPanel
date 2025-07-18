import type { Media } from '@/lib/types';
import { CharacterCard } from '../character-card';

export function CharactersTab({ media }: { media: Media }) {
  const mainCharacters = media.characters?.edges.filter(edge => edge.role === 'MAIN') || [];
  const supportingCharacters = media.characters?.edges.filter(edge => edge.role === 'SUPPORTING') || [];

  if (mainCharacters.length === 0 && supportingCharacters.length === 0) {
    return <p className="text-muted-foreground">No character information available.</p>;
  }

  return (
    <div className="space-y-8">
      {mainCharacters.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Main Characters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {mainCharacters.map(edge => <CharacterCard key={edge.node.id} character={edge.node} role={edge.role} />)}
          </div>
        </section>
      )}
      {supportingCharacters.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold font-headline mb-4">Supporting Characters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {supportingCharacters.map(edge => <CharacterCard key={edge.node.id} character={edge.node} role={edge.role} />)}
          </div>
        </section>
      )}
    </div>
  );
}
