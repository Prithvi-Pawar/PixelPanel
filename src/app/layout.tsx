import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Poppins } from 'next/font/google';
import { Sidebar } from '@/components/sidebar';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'AniPlay',
  description: 'Your Modern Anime Streaming Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${poppins.variable}`} suppressHydrationWarning>
      <body className={cn(
        "font-body antialiased bg-background text-foreground",
        "flex min-h-screen"
      )}>
        <Sidebar />
        <main className="flex-1 flex flex-col pl-20">
          <div className="flex-1 p-5 md:p-8 space-y-8 overflow-y-auto">
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
