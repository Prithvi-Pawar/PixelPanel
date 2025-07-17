export interface PageInfo {
  hasNextPage: boolean;
}

export interface Page {
  media: Media[];
  pageInfo: PageInfo;
}

export interface Staff {
  id: number;
  name: {
    full: string;
  };
}

export interface StaffEdge {
  role: string;
  node: Staff;
}

export interface Media {
  id: number;
  title: {
    romaji: string;
    english: string | null;
    native: string;
    userPreferred: string;
  };
  description: string;
  startDate: {
    year: number | null;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string | null;
  };
  bannerImage: string | null;
  format: string;
  type: 'ANIME' | 'MANGA';
  status: string;
  episodes: number | null;
  chapters: number | null;
  averageScore: number | null;
  genres: string[];
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  } | null;
  nextAiringEpisode?: {
    airingAt: number;
    episode: number;
  } | null;
  staff?: {
    edges: StaffEdge[];
  };
}
