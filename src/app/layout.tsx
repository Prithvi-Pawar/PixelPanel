'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Poppins, Roboto_Mono } from 'next/font/google';
import { Sidebar } from '@/components/sidebar';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { usePathname } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

// export const metadata: Metadata = {
//   title: 'PixelPanel',
//   description: 'Your Modern Anime Streaming Dashboard',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const isDetailPage = pathname.startsWith('/media/');

  const showLayout = !isLandingPage && !isDetailPage;

  return (
    <html lang="en" className={`dark ${poppins.variable} ${robotoMono.variable}`} suppressHydrationWarning>
       <head>
        <title>PixelPanel</title>
        <meta name="description" content="Your Modern Anime Streaming Dashboard" />
      </head>
      <body className={cn(
        "font-body antialiased bg-background text-foreground",
      )}>
        {showLayout ? (
           <>
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-5 md:p-8 space-y-8 overflow-y-auto">
                {children}
              </main>
            </div>
            <Toaster />
          </>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
