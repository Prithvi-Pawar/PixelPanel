
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="space-y-8">
       <Skeleton className="h-10 w-1/3" />
        <div className="space-y-4">
            <Skeleton className="h-8 w-1/4 mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
                        <Skeleton className="h-4 w-3/4 rounded" />
                    </div>
                ))}
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
            <div className="space-y-4">
                 <Skeleton className="h-8 w-1/4 mb-6" />
                 <div className="bg-card p-4 rounded-2xl space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-2 rounded-lg">
                            <Skeleton className="w-8 h-8" />
                            <Skeleton className="w-14 h-20 rounded-md" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
             <div className="space-y-4">
                 <Skeleton className="h-8 w-1/4 mb-6" />
                 <div className="bg-card p-4 rounded-2xl space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-2 rounded-lg">
                            <Skeleton className="w-8 h-8" />
                            <Skeleton className="w-14 h-20 rounded-md" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    </div>
  );
}
