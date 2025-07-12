'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaCard } from "@/components/media-card";
import { BarChart, Bar, ResponsiveContainer, LineChart, Line } from 'recharts';

import {
    Plus,
    Award,
    Heart,
    Tv,
    Check,
    ThumbsDown,
    Star,
    History,
    Settings,
    Clapperboard,
    BookOpen
} from "lucide-react";
import type { Media } from "@/lib/types";

const placeholderMedia: Media = {
    id: 1,
    title: {
        romaji: "Cowboy Bebop",
        english: "Cowboy Bebop",
        native: "カウボーイビバップ",
        userPreferred: "Cowboy Bebop",
    },
    coverImage: {
        extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1-CXLI_EX1iyR2.jpg",
        large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1-CXLI_EX1iyR2.jpg",
        medium: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXLI_EX1iyR2.jpg",
        color: "#f1d6d6"
    },
    description: "In the year 2071, humanity has colonized several of the planets and moons of the solar system leaving the now uninhabitable surface of planet Earth behind. The Inter Solar System Police attempts to keep peace in the galaxy, aided in part by outlaw bounty hunters, referred to as \"Cowboys.\" The ragtag team aboard the spaceship Bebop are two such individuals.",
    startDate: { year: 1998 },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1-T3PJUjFJyRwg.jpg",
    format: "TV",
    type: 'ANIME',
    status: "FINISHED",
    episodes: 26,
    chapters: null,
    averageScore: 88,
    genres: ["Action", "Adventure", "Sci-Fi"],
    trailer: null,
};

const watchingList = Array(4).fill(placeholderMedia).map((item, i) => ({ ...item, id: i + 10, title: { ...item.title, romaji: `${item.title.romaji} Vol. ${i+1}` }, status: 'RELEASING' }));
const completedList = Array(8).fill(placeholderMedia).map((item, i) => ({ ...item, id: i + 20, title: { ...item.title, romaji: `Classic Anime ${i+1}` }, status: 'FINISHED' }));


const statCardData = [
  { value: 12, change: 15, chartData: [{ v: 2 }, { v: 5 }, { v: 3 }, { v: 8 }, { v: 4 }, { v: 9 }] },
  { value: 24, change: 5, chartData: [{ v: 4 }, { v: 2 }, { v: 7 }, { v: 5 }, { v: 8 }, { v: 6 }] },
  { value: 15, change: -3, chartData: [{ v: 6 }, { v: 8 }, { v: 5 }, { v: 7 }, { v: 4 }, { v: 9 }] },
];

export default function ProfilePage() {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-64 hidden md:flex flex-col gap-4 border-r border-border/40 p-4">
                <nav className="flex flex-col gap-2">
                    <Button variant="ghost" className="justify-start gap-3"><Tv /> Watching</Button>
                    <Button variant="ghost" className="justify-start gap-3"><Check /> Completed</Button>
                    <Button variant="ghost" className="justify-start gap-3"><Clapperboard /> Plan to Watch</Button>
                    <Button variant="ghost" className="justify-start gap-3"><ThumbsDown /> Dropped</Button>
                    <Button variant="ghost" className="justify-start gap-3"><Heart /> Favorites</Button>
                    <Button variant="ghost" className="justify-start gap-3"><BookOpen /> My Reviews</Button>
                    <Button variant="ghost" className="justify-start gap-3"><History /> History</Button>
                    <Button variant="ghost" className="justify-start gap-3"><Settings /> Settings</Button>
                </nav>
            </aside>
            <main className="flex-1 p-4 md:p-8 space-y-8">
                {/* User Info Card */}
                <Card className="overflow-hidden">
                    <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="w-24 h-24 border-4 border-primary">
                            <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="anime avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold">Username</h2>
                            <p className="text-muted-foreground">Living one episode at a time.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button><Plus className="mr-2 h-4 w-4" /> Add Anime</Button>
                            <Button variant="outline"><Award className="mr-2 h-4 w-4" /> Achievements</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Stat Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Anime Watched</CardTitle>
                            <Tv className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">128</div>
                            <p className="text-xs text-muted-foreground">+5 from last month</p>
                            <div className="h-20 mt-2">
                               <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={statCardData[0].chartData}>
                                        <Bar dataKey="v" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Hours Watched</CardTitle>
                            <History className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,245</div>
                            <p className="text-xs text-muted-foreground">+30 hours from last month</p>
                             <div className="h-20 mt-2">
                               <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={statCardData[1].chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                                        <Line type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Top Genre</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Sci-Fi</div>
                            <p className="text-xs text-muted-foreground">Most watched category</p>
                             <div className="h-20 mt-2 flex items-center justify-center text-muted-foreground">
                                <p>Genre preference chart</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Tabs for lists */}
                <Tabs defaultValue="watching">
                    <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                        <TabsTrigger value="watching">Watching</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="watching">
                        <Card>
                            <CardContent className="p-4">
                               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
                                  {watchingList.map((item) => (
                                    <MediaCard key={item.id} media={item} type="anime" />
                                  ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="completed">
                         <Card>
                            <CardContent className="p-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
                                  {completedList.map((item) => (
                                    <MediaCard key={item.id} media={item} type="anime" />
                                  ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
