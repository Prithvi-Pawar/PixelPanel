// src/app/search/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { fetchAnilistData, mediaFragment } from '@/lib/anilist';
import type { Media } from '@/lib/types';
import { MediaGrid } from '@/components/media-grid';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon, Trash2, ChevronLeft, ChevronRight, ChevronsUpDown, EyeOff, Eye } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

const SEARCH_QUERY = `
  query (
    $page: Int, 
    $perPage: Int, 
    $search: String, 
    $sort: [MediaSort], 
    $season: MediaSeason, 
    $seasonYear: Int, 
    $format: MediaFormat,
    $status: MediaStatus,
    $countryOfOrigin: CountryCode,
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
        season: $season, 
        seasonYear: $seasonYear, 
        format: $format,
        status: $status,
        countryOfOrigin: $countryOfOrigin,
        genre_in: $genre_in,
        type: ANIME
      ) {
        ...mediaFields
      }
    }
  }
  ${mediaFragment}
`;

const GENRES = ["Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Horror", "Mahou Shoujo", "Mecha", "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"];
const YEARS = Array.from({ length: new Date().getFullYear() - 1939 }, (_, i) => (new Date().getFullYear() - i).toString());
const ALL_ACCORDION_ITEMS = ['season', 'format', 'status', 'origin'];

export default function SearchPage() {
  const [results, setResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  
  // Filters state
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState("POPULARITY_DESC");
  const [year, setYear] = useState<string | undefined>(undefined);
  const [season, setSeason] = useState<string | undefined>(undefined);
  const [format, setFormat] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [origin, setOrigin] = useState<string | undefined>(undefined);
  const [openAccordions, setOpenAccordions] = useState<string[]>(ALL_ACCORDION_ITEMS);
  const [showFilters, setShowFilters] = useState(true);

  const debouncedSearch = useDebounce(search, 500);

  const variables = useMemo(() => ({
    page,
    perPage: 30,
    search: debouncedSearch || undefined,
    sort: sortBy,
    season: season || undefined,
    seasonYear: year ? parseInt(year) : undefined,
    format: format || undefined,
    status: status || undefined,
    countryOfOrigin: origin || undefined,
    genre_in: genre ? [genre] : undefined,
  }), [page, debouncedSearch, sortBy, season, year, format, status, origin, genre]);

  useEffect(() => {
    setLoading(true);
    fetchAnilistData<{ Page: { media: Media[], pageInfo: any } }>(SEARCH_QUERY, variables)
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
    setSeason(undefined);
    setFormat(undefined);
    setStatus(undefined);
    setOrigin(undefined);
    setPage(1);
  };
  
  const toggleAllAccordions = () => {
    if (openAccordions.length === ALL_ACCORDION_ITEMS.length) {
      setOpenAccordions([]);
    } else {
      setOpenAccordions(ALL_ACCORDION_ITEMS);
    }
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
    <div className="flex flex-1">
      {/* Left Sidebar Filters */}
      {showFilters && (
        <aside className="w-64 hidden md:block space-y-4 p-4 md:p-8 border-r border-border">
          <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={toggleAllAccordions} className="text-muted-foreground">
                  <ChevronsUpDown className="mr-2 h-4 w-4" />
                  {openAccordions.length > 0 ? 'Collapse' : 'Expand'}
              </Button>
          </div>
          <Accordion type="multiple" value={openAccordions} onValueChange={setOpenAccordions} className="w-full">
            <AccordionItem value="season">
              <AccordionTrigger className="font-semibold">Season</AccordionTrigger>
              <AccordionContent>
                <RadioGroup value={season} onValueChange={setSeason}>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="WINTER" id="s-winter" /><Label htmlFor="s-winter">Winter</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="SPRING" id="s-spring" /><Label htmlFor="s-spring">Spring</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="SUMMER" id="s-summer" /><Label htmlFor="s-summer">Summer</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="FALL" id="s-fall" /><Label htmlFor="s-fall">Fall</Label></div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="format">
              <AccordionTrigger className="font-semibold">Format</AccordionTrigger>
              <AccordionContent>
                <RadioGroup value={format} onValueChange={setFormat}>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="TV" id="f-tv" /><Label htmlFor="f-tv">TV</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="TV_SHORT" id="f-tv-short" /><Label htmlFor="f-tv-short">TV Short</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="MOVIE" id="f-movie" /><Label htmlFor="f-movie">Movie</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="SPECIAL" id="f-special" /><Label htmlFor="f-special">Special</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="OVA" id="f-ova" /><Label htmlFor="f-ova">OVA</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="ONA" id="f-ona" /><Label htmlFor="f-ona">ONA</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="MUSIC" id="f-music" /><Label htmlFor="f-music">Music</Label></div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="status">
               <AccordionTrigger className="font-semibold">Status</AccordionTrigger>
               <AccordionContent>
                <RadioGroup value={status} onValueChange={setStatus}>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="FINISHED" id="st-finished" /><Label htmlFor="st-finished">Finished</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="RELEASING" id="st-releasing" /><Label htmlFor="st-releasing">Releasing</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="NOT_YET_RELEASED" id="st-not-yet" /><Label htmlFor="st-not-yet">Not Yet Released</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="CANCELLED" id="st-cancelled" /><Label htmlFor="st-cancelled">Cancelled</Label></div>
                </RadioGroup>
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="origin">
               <AccordionTrigger className="font-semibold">Origin</AccordionTrigger>
               <AccordionContent>
                  <RadioGroup value={origin} onValueChange={setOrigin}>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="JP" id="o-jp" /><Label htmlFor="o-jp">Japan</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="KR" id="o-kr" /><Label htmlFor="o-kr">South Korea</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="CN" id="o-cn" /><Label htmlFor="o-cn">China</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="TW" id="o-tw" /><Label htmlFor="o-tw">Taiwan</Label></div>
                  </RadioGroup>
               </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 space-y-6 p-4 md:p-8">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setShowFilters(prev => !prev)}>
            {showFilters ? <EyeOff /> : <Eye />}
          </Button>
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search" 
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
          <Button variant="outline" className="hidden md:inline-flex" onClick={() => setShowFilters(prev => !prev)}>
            {showFilters ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
            {showFilters ? 'Hide Filters' : 'Show Filters'}
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
    </div>
  );
}
