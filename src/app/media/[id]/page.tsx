import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import { MediaDetailView } from '@/components/media-detail-view';
import type { Media } from '@/lib/types';
import { notFound } from 'next/navigation';

const MEDIA_DETAIL_QUERY = `
  query GetMediaDetail($id: Int) {
    Media(id: $id) {
      ...mediaFields
    }
  }
  ${mediaFragment}
`;

async function getMediaDetail(id: number): Promise<Media | null> {
    try {
        const result = await fetchAnilistData<{ Media: Media }>(MEDIA_DETAIL_QUERY, { id });
        return result.data.Media;
    } catch (error) {
        console.error(`Failed to fetch media detail for ID ${id}:`, error);
        return null;
    }
}

export default async function MediaDetailPage({ params }: { params: { id: string } }) {
  const mediaId = parseInt(params.id, 10);

  if (isNaN(mediaId)) {
    notFound();
  }

  const media = await getMediaDetail(mediaId);

  if (!media) {
    notFound();
  }

  return <MediaDetailView media={media} />;
}
