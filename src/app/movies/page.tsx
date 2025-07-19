
'use client';

import { useEffect, useState, useMemo } from 'react';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import type { Media } from '@/lib/types';
import { MediaGrid } from '@/components/media-grid';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

const MOVIES_QUERY = `
  query (
    $page: Int, 
    $perPage: Int, 
    $search: String, 
    $sort: [MediaSort], 
    $seasonYear: Int, 
    $genre_in: [String]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
      }
      media(
        search: $search, 
        sort: $sort, 
        seasonYear: $seasonYear, 
        genre_in: $genre_in,
        type: ANIME,
        format: MOVIE
      ) {
        ...mediaFields
      }
    }
  }
  ${mediaFragment}
`;

const GENRES = ["Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Horror", "Mahou Shoujo", "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"];
const YEARS = Array.from({ length: new Date().getFullYear() - 1939 }, (_, i) => (new Date().getFullYear() - i).toString());

export default function MoviesPage() {
  const [results, setResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  
  // Filters state
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState("POPULARITY_DESC");
  const [year, setYear] = useState<string | undefined>(undefined);

  const debouncedSearch = useDebounce(search, 500);

  const variables = useMemo(() => ({
    page,
    perPage: 30,
    search: debouncedSearch || undefined,
    sort: sortBy,
    seasonYear: year ? parseInt(year) : undefined,
    genre_in: genre ? [genre] : undefined,
  }), [page, debouncedSearch, sortBy, year, genre]);

  useEffect(() => {
    setLoading(true);
    fetchAnilistData<{ Page: { media: Media[], pageInfo: any } }>(MOVIES_QUERY, variables)
      .then(res => {
        setResults(res.data.Page.media);
        setLastPage(res.data.Page.pageInfo.lastPage);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [variables]);

  const resetFilters = () => {
    setSearch("");
    setGenre(undefined);
    setSortBy("POPULARITY_DESC");
    setYear(undefined);
    setPage(1);
  };
  
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const sideButtons = 2; // buttons on each side of the current page

    if (lastPage <= maxVisiblePages) {
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let startPage = Math.max(2, page - sideButtons);
      let endPage = Math.min(lastPage - 1, page + sideButtons);
      
      if (page <= sideButtons + 1) {
        endPage = Math.min(lastPage - 1, maxVisiblePages - 1);
      }
      
      if (page >= lastPage - sideButtons) {
        startPage = Math.max(2, lastPage - maxVisiblePages + 2);
      }
      
      if (startPage > 2) {
        pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < lastPage - 1) {
        pages.push('...');
      }
      
      pages.push(lastPage);
    }
    
    return pages.map((p, index) => (
      <Button
        key={`${p}-${index}`}
        variant={page === p ? 'default' : 'ghost'}
        size="icon"
        onClick={() => typeof p === 'number' && setPage(p)}
        disabled={typeof p !== 'number'}
        className={`rounded-full ${page === p ? 'bg-primary' : 'bg-muted'}`}
      >
        {p}
      </Button>
    ));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline tracking-wider">Movies</h1>
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search Movies" 
              className="pl-10" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Any Genre" />
            </SelectTrigger>
            <SelectContent>
              {GENRES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="POPULARITY_DESC">Popularity</SelectItem>
              <SelectItem value="SCORE_DESC">Score</SelectItem>
              <SelectItem value="TRENDING_DESC">Trending</SelectItem>
              <SelectItem value="START_DATE_DESC">Release Date</SelectItem>
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-full md:w-[120px]">
              <SelectValue placeholder="Any Year" />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={resetFilters}>
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-4">
            {[...Array(18)].map((_, i) => (
              <div key={i} className="space-y-2">
                  <div className="aspect-[2/3] w-full rounded-2xl bg-muted animate-pulse"></div>
                  <div className="h-4 w-3/4 rounded bg-muted animate-pulse"></div>
              </div>
            ))}
        </div>
      ) : (
        <MediaGrid media={results} />
      )}

      {/* Pagination */}
      {results.length > 0 && lastPage > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-full"
          >
            <ChevronLeft />
          </Button>
          {renderPagination()}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPage(p => Math.min(lastPage, p + 1))}
            disabled={page === lastPage}
            className="rounded-full"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
