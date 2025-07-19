
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { EditProfileForm } from "@/components/edit-profile-form";
import type { Media } from "@/lib/types";

export interface UserProfile {
    name: string;
    bio: string;
    avatarUrl: string;
}

const defaultProfile: UserProfile = {
    name: "Username",
    bio: "Living one episode at a time.",
    avatarUrl: "https://placehold.co/100x100.png",
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [backgroundMedia, setBackgroundMedia] = useState<Media | null>(null);

    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }

        const likedAnime: Media[] = JSON.parse(localStorage.getItem('likedAnime') || '[]');
        const mediaWithTrailer = likedAnime.find(anime => anime.trailer?.id);
        if (mediaWithTrailer) {
            setBackgroundMedia(mediaWithTrailer);
        }

        const handleProfileUpdate = () => {
             const savedProfile = localStorage.getItem('userProfile');
            if (savedProfile) {
                setProfile(JSON.parse(savedProfile));
            }
        };

        window.addEventListener('profileUpdated', handleProfileUpdate);
        
        return () => {
            window.removeEventListener('profileUpdated', handleProfileUpdate);
        };

    }, []);

    const handleSave = (newProfile: UserProfile) => {
        setProfile(newProfile);
        localStorage.setItem('userProfile', JSON.stringify(newProfile));
        window.dispatchEvent(new CustomEvent('profileUpdated'));
        setIsEditDialogOpen(false);
    };

    const trailerId = backgroundMedia?.trailer?.id;

    return (
        <div className="flex-1 -m-8">
            <div className="relative h-64 md:h-80 w-full">
                {trailerId ? (
                    <iframe
                        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-[1.2] opacity-50"
                        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerId}`}
                        title="YouTube video player background"
                        frameBorder="0"
                        allow="autoplay; encrypted-media; loop"
                        allowFullScreen={false}
                    ></iframe>
                ) : (
                    <div className="absolute inset-0 bg-black"></div>
                )}
                 <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            <div className="relative px-4 sm:px-6 lg:px-8 pb-8">
                <div className="flex flex-col items-center -mt-20">
                     <div className="relative group">
                        <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background ring-4 ring-primary">
                            <AvatarImage src={profile.avatarUrl} data-ai-hint="anime avatar" />
                            <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                                 <Button variant="outline" size="icon" className="absolute bottom-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-sm">
                                    <Edit className="h-4 w-4"/>
                                    <span className="sr-only">Edit Profile</span>
                                </Button>
                            </DialogTrigger>
                             <DialogContent>
                                <EditProfileForm currentProfile={profile} onSave={handleSave} onCancel={() => setIsEditDialogOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="mt-4 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold">{profile.name}</h1>
                        <p className="text-muted-foreground mt-1 max-w-lg mx-auto">{profile.bio}</p>
                    </div>

                     <div className="mt-4 flex gap-2">
                       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
                            </DialogTrigger>
                             <DialogContent>
                                <EditProfileForm currentProfile={profile} onSave={handleSave} onCancel={() => setIsEditDialogOpen(false)} />
                            </DialogContent>
                        </Dialog>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add to List</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
