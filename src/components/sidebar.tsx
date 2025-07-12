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
          @keyframes spin-earth {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          .scene {
            width: 32px;
            height: 32px;
            perspective: 800px;
          }
          .globe {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            animation: spin-earth 12s linear infinite;
          }
          .globe-wrap {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            transform-style: preserve-3d;
          }
          .circle {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: transparent;
            border: 1px solid currentColor;
            opacity: 0.5;
          }
          .land {
            position: absolute;
            height: 12px;
            background: currentColor;
            border-radius: 6px;
            opacity: 0.7;
          }
          .land-1 { width: 20px; top: 10px; left: 5px; transform: rotate(20deg); }
          .land-2 { width: 15px; top: 2px; left: 15px; transform: rotate(-30deg); }
          .land-3 { width: 10px; bottom: 5px; left: 2px; transform: rotate(50deg); }

          .globe .globe-wrap:nth-child(1) { transform: rotateY(30deg); }
          .globe .globe-wrap:nth-child(2) { transform: rotateY(90deg); }
          .globe .globe-wrap:nth-child(3) { transform: rotateY(150deg); }
        `}
      </style>
      <div className="scene">
        <div className="globe">
          <div className="globe-wrap">
            <div className="circle"></div>
            <div className="land land-1"></div>
          </div>
          <div className="globe-wrap">
            <div className="circle"></div>
            <div className="land land-2"></div>
          </div>
          <div className="globe-wrap">
            <div className="circle"></div>
            <div className="land land-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}


export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 h-full w-20 flex flex-col items-center py-6 bg-card border-r border-border space-y-6">
      <Link href="/" className="text-primary flex items-center justify-center h-8 w-8">
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
