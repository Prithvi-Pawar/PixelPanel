import type { Media } from '@/lib/types';
import { StarRating } from '../star-rating';
import { Badge } from '../ui/badge';

export function OverviewTab({ media }: { media: Media }) {
  const director = media.staff?.edges.find(edge => edge.role.includes('Director'))?.node;
  const writer = media.staff?.edges.find(edge => edge.role.includes('Original Creator') || edge.role.includes('Script'))?.node;
  const fullDescription = media.description.replace(/<[^>]*>?/gm, '');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold font-headline">Synopsis</h2>
        <p className="text-white/80 leading-relaxed">{fullDescription}</p>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 font-headline">Information</h3>
          <div className="space-y-1 text-sm text-white/80">
            {director && <p><strong>Director:</strong> {director.name.full}</p>}
            {writer && <p><strong>Writer:</strong> {writer.name.full}</p>}
            <p><strong>Format:</strong> {media.format}</p>
            {media.episodes && <p><strong>Episodes:</strong> {media.episodes}</p>}
            <p><strong>Status:</strong> {media.status.replace(/_/g, ' ')}</p>
            <p><strong>Year:</strong> {media.startDate.year}</p>
          </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-2 font-headline">Rating</h3>
            <div className="flex items-center gap-2">
            {media.averageScore && (
              <>
                <StarRating score={media.averageScore / 10} />
                <span className="text-white/80">{media.averageScore / 10}/10</span>
              </>
            )}
            </div>
        </div>
         <div>
            <h3 className="text-lg font-semibold mb-2 font-headline">Genres</h3>
            <div className="flex flex-wrap gap-2">
                {media.genres.map(genre => (
                    <Badge key={genre} className="px-3 py-1 text-sm bg-white/10 text-white/80 backdrop-blur-sm">
                        {genre}
                    </Badge>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
