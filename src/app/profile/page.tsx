'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { EditProfileForm } from "@/components/edit-profile-form";

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

    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            setProfile(JSON.parse(savedProfile));
        }
    }, []);

    const handleSave = (newProfile: UserProfile) => {
        setProfile(newProfile);
        localStorage.setItem('userProfile', JSON.stringify(newProfile));
        // Dispatch a custom event to notify other components (like the header)
        window.dispatchEvent(new CustomEvent('profileUpdated'));
        setIsEditDialogOpen(false);
    };

    return (
        <div className="flex-1 p-4 md:p-8 space-y-8">
            <Card className="overflow-hidden">
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative group">
                        <Avatar className="w-24 h-24 border-4 border-primary">
                            <AvatarImage src={profile.avatarUrl} data-ai-hint="anime avatar" />
                            <AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-sm">
                                    <Edit className="h-4 w-4"/>
                                    <span className="sr-only">Edit Image</span>
                                </Button>
                            </DialogTrigger>
                             <DialogContent>
                                <EditProfileForm currentProfile={profile} onSave={handleSave} onCancel={() => setIsEditDialogOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <p className="text-muted-foreground">{profile.bio}</p>
                    </div>
                    <div className="flex gap-2">
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
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Favorite Anime/Manga</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This section will be populated with the user's favorite anime and manga.</p>
                </CardContent>
            </Card>
        </div>
    );
}
