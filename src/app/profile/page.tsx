'use client';
// This page is not part of the new AniPlay dashboard design yet.
// It can be redesigned or removed later.

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="flex-1 p-4 md:p-8 space-y-8">
            <Card className="overflow-hidden">
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <div className="relative group">
                        <Avatar className="w-24 h-24 border-4 border-primary">
                            <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="anime avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-sm">
                            <Edit className="h-4 w-4"/>
                            <span className="sr-only">Edit Image</span>
                        </Button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold">Username</h2>
                        <p className="text-muted-foreground">Living one episode at a time.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
                        <Button><Plus className="mr-2 h-4 w-4" /> Add to List</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Favorite Anime/Manga</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This section will be populated with the user's favorite anime and manga.</p>
                </CardContent>
            </Card>
        </div>
    );
}
