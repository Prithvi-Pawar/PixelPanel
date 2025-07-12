"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, Film, Calendar, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/trending", label: "Trending", icon: TrendingUp },
  { href: "/movies", label: "Movies", icon: Film },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/profile", label: "Profile", icon: User },
];

function AnimatedEarthLogo() {
  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
          .earth-logo {
            animation: spin 8s linear infinite;
            transform-style: preserve-3d;
          }
        `}
      </style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="h-8 w-8 earth-logo"
      >
        <circle cx="50" cy="50" r="48" fill="transparent" stroke="currentColor" strokeWidth="4" />
        <path
          d="M30,70 Q40,50 50,30 T70,70"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M25,50 C40,65 60,65 75,50"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M28,35c10,5,20,10,45,0"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </>
  );
}


export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 h-full w-20 flex flex-col items-center py-6 bg-card border-r border-border space-y-6">
      <Link href="/" className="text-primary transform-style-3d">
        <AnimatedEarthLogo />
        <span className="sr-only">AniPlay</span>
      </Link>
      
      <TooltipProvider delayDuration={0}>
        <nav className="flex flex-col items-center gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full h-12 w-12 transition-colors duration-200",
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                      )}
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="sr-only">{item.label}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </TooltipProvider>
    </aside>
  );
}
