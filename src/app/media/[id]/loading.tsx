import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="bg-background text-white">
      {/* Banner Section Skeleton */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] w-full flex flex-col items-center justify-center overflow-hidden">
        <Skeleton className="absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-end">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 flex-shrink-0">
              <Skeleton className="w-[200px] h-[300px] rounded-lg" />
            </div>
            <div className="text-center md:text-left space-y-3">
              <Skeleton className="h-10 w-80 rounded-md" />
              <Skeleton className="h-6 w-48 rounded-md" />
              <div className="flex items-center gap-3 mt-4 justify-center md:justify-start">
                <Skeleton className="h-10 w-32 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <div className="flex items-center gap-3 mt-3 justify-center md:justify-start">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Content Skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-8 border-b border-white/10 mb-8">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
             <Skeleton className="h-8 w-1/3 mb-4" />
             <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
             </div>
          </div>
          <div className="space-y-6">
            <div>
              <Skeleton className="h-6 w-1/2 mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
             <div>
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-5 w-2/3" />
            </div>
             <div>
              <Skeleton className="h-6 w-1/3 mb-2" />
              <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
