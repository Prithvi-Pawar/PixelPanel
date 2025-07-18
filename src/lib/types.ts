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

export interface VoiceActor {
    id: number;
    name: {
        full: string;
    };
    image: {
        large: string;
    }
}

export interface Character {
  id: number;
  name: {
    full: string;
  };
  image: {
    large: string;
  };
}

export interface CharacterEdge {
  role: 'MAIN' | 'SUPPORTING' | 'BACKGROUND';
  node: Character;
  voiceActors: VoiceActor[];
}

export interface RelatedMedia {
  id: number;
  title: {
    userPreferred: string;
  };
  coverImage: {
    large: string;
  };
  format: string;
  type: 'ANIME' | 'MANGA';
}

export interface RelatedMediaEdge {
  relationType: string;
  node: RelatedMedia;
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
  characters?: {
    edges: CharacterEdge[];
  };
  relations?: {
    edges: RelatedMediaEdge[];
  };
}
