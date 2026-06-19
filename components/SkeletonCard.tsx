'use client';

export default function SkeletonCard() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-pulse">
      <div className="p-8 sm:p-10 space-y-8">
        
        {/* Header Skeleton */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-3 w-1/3">
            <div className="h-10 bg-slate-200 dark:bg-slate-850 rounded-xl w-3/4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-850 rounded-lg w-1/2" />
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-850 rounded-2xl" />
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-850 rounded-2xl" />
          </div>
        </div>

        {/* Urdu Meaning Card Skeleton */}
        <div className="h-28 bg-slate-200 dark:bg-slate-850 rounded-[2rem]" />

        {/* Examples Section Skeleton */}
        <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="h-4 bg-slate-200 dark:bg-slate-850 rounded-lg w-1/5" />
          
          <div className="bg-slate-100/50 dark:bg-slate-850/30 p-6 rounded-[2rem] border border-transparent space-y-5">
            <div className="flex justify-between items-center gap-4">
              <div className="space-y-2 w-2/3">
                <div className="h-5 bg-slate-200 dark:bg-slate-850 rounded-lg" />
                <div className="h-3 bg-slate-200 dark:bg-slate-850 rounded-lg w-1/3" />
              </div>
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-850 rounded-lg" />
            </div>
            
            <div className="border-t border-slate-200 dark:border-slate-800" />
            
            <div className="flex justify-between items-center gap-4">
              <div className="w-8 h-8 bg-slate-200 dark:bg-slate-850 rounded-lg" />
              <div className="space-y-2 w-2/3 text-right">
                <div className="h-6 bg-slate-200 dark:bg-slate-850 rounded-lg ml-auto w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-850 rounded-lg ml-auto w-1/4" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
