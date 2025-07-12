
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, History, LayoutGrid, Search, Sparkles } from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

export function GlobalSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-1.5 font-headline text-2xl font-bold text-white focus:outline-none rounded-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Panel<span className="text-lg text-primary">Pixel</span>
        </Link>
      </SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href="/search" passHref>
            <SidebarMenuButton tooltip="Search" isActive={isActive('/search')}>
              <Search />
              <span>Search</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/" passHref>
            <SidebarMenuButton tooltip="Dashboard" isActive={isActive('/')}>
              <LayoutGrid />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/recommendations" passHref>
            <SidebarMenuButton tooltip="Recommendations" isActive={isActive('/recommendations')}>
              <Sparkles />
              <span>Recommendations</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/favorites" passHref>
            <SidebarMenuButton tooltip="Favorites" isActive={isActive('/favorites')}>
              <Heart />
              <span>Favorite Anime</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Link href="/history" passHref>
            <SidebarMenuButton tooltip="History" isActive={isActive('/history')}>
              <History />
              <span>History</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarFooter>
         {/* Placeholder for future use like settings or logout */}
      </SidebarFooter>
    </Sidebar>
  )
}
