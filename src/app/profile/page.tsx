'use client';
// This page is not part of the new AniPlay dashboard design yet.
// It can be redesigned or removed later.

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Plus, Tv } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="flex-1 p-4 md:p-8 space-y-8">
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

            <Card>
                <CardHeader>
                    <CardTitle>My Lists</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This page will be redesigned to fit the new AniPlay theme.</p>
                </CardContent>
            </Card>
        </div>
    );
}
