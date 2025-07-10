import type { Media, Page } from './types';

const ANILIST_API_URL = 'https://graphql.anilist.co';

const MEDIA_QUERY_FIELDS = `
  id
  title {
    romaji
    english
    native
    userPreferred
  }
  description(asHtml: false)
  startDate { year month day }
  coverImage { extraLarge large medium color }
  bannerImage
  format
  type
  status
  episodes
  chapters
  averageScore
  genres
  trailer { id site thumbnail }
`;

async function fetcher<T>(query: string, variables: Record<string, any>): Promise<T> {
  try {
    const res = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.error('AniList API request failed with status:', res.status);
      const errorBody = await res.text();
      console.error('Error body:', errorBody);
      throw new Error(`AniList API Error: ${res.statusText}`);
    }
    
    const json = await res.json();
    
    if (json.errors) {
      console.error('AniList API returned errors:', json.errors);
      throw new Error(`GraphQL Error: ${json.errors.map((e: any) => e.message).join(', ')}`);
    }

    return json.data;
  } catch (error) {
    console.error("Failed to fetch from AniList API", error);
    // Return a default structure or throw to be caught by an error boundary
    return { Page: { media: [] } } as any;
  }
}

type MediaType = 'ANIME' | 'MANGA';
type MediaSort = 'TRENDING_DESC' | 'SCORE_DESC' | 'START_DATE_DESC';

interface GetMediaListOptions {
  type: MediaType;
  sort: MediaSort;
  page?: number;
  perPage?: number;
}

export async function getMediaList({
  type,
  sort,
  page = 1,
  perPage = 12,
}: GetMediaListOptions): Promise<Media[]> {
  const query = `
    query ($page: Int, $perPage: Int, $type: MediaType, $sort: [MediaSort]) {
      Page(page: $page, perPage: $perPage) {
        media(type: $type, sort: $sort, isAdult: false) {
          ${MEDIA_QUERY_FIELDS}
        }
      }
    }
  `;

  const data = await fetcher<{ Page: Page }>(query, {
    page,
    perPage,
    type,
    sort: [sort],
  });

  return data.Page?.media || [];
}

export async function getTrendingMedia({
  type,
  perPage = 10,
}: {
  type: MediaType;
  perPage?: number;
}): Promise<Media[]> {
  return getMediaList({ type, sort: 'TRENDING_DESC', perPage });
}
