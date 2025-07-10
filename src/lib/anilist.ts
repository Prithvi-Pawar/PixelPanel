import type { Media, Page } from './types';

const ANILIST_API_URL = 'https://graphql.anilist.co';

export const mediaFragment = `
  fragment mediaFields on Media {
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
  }
`;

export async function fetchAnilistData<T>(query: string, variables?: Record<string, any>): Promise<{data: T}> {
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

    return json;
  } catch (error) {
    console.error("Failed to fetch from AniList API", error);
    throw error;
  }
}

const mediaListQuery = `
  query ($page: Int, $perPage: Int, $sort: [MediaSort], $type: MediaType) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
      }
      media(sort: $sort, type: $type, isAdult: false) {
        ...mediaFields
      }
    }
  }
  ${mediaFragment}
`;

export async function getMediaList(options: {
  sort: string;
  type: 'ANIME' | 'MANGA';
  page?: number;
  perPage?: number;
}): Promise<Media[]> {
  const { sort, type, page = 1, perPage = 10 } = options;
  const variables = { sort: [sort], type, page, perPage };
  const result = await fetchAnilistData<{ Page: Page }>(mediaListQuery, variables);
  return result.data.Page.media;
}

export async function getTrendingMedia(options: {
  type: 'ANIME' | 'MANGA';
  page?: number;
  perPage?: number;
}): Promise<Media[]> {
    return getMediaList({ ...options, sort: 'TRENDING_DESC' });
}
