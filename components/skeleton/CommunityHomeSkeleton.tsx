"use client";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface CommunityHomeSkeletonProps {
  className?: string;
}

function CommunityHomeSkeleton({ className }: CommunityHomeSkeletonProps) {
  return (
    <div className={cn("min-h-screen bg-slate-950 text-slate-50", className)}>
      {/* Navigation Bar Skeleton */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg bg-dark-800" />
            <Skeleton className="w-32 h-5 rounded bg-dark-800 hidden sm:block" />
            <Skeleton className="w-20 h-5 rounded-full bg-dark-800" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="w-16 h-5 rounded bg-dark-800" />
            <Skeleton className="w-16 h-9 rounded-full bg-dark-800" />
          </div>
        </div>
      </nav>

      {/* Hero Section Skeleton */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 bg-radial-green">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Skeleton className="w-3/4 h-12 rounded-lg bg-dark-800 mx-auto" />
          <Skeleton className="w-1/2 h-6 rounded bg-dark-800 mx-auto" />
          <Skeleton className="w-full max-w-2xl h-14 rounded-2xl bg-dark-800 mx-auto" />
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Skeleton className="w-28 h-9 rounded-full bg-dark-800" />
            <Skeleton className="w-32 h-9 rounded-full bg-dark-800" />
            <Skeleton className="w-28 h-9 rounded-full bg-dark-800" />
            <Skeleton className="w-28 h-9 rounded-full bg-dark-800" />
          </div>
        </div>
      </section>

      {/* Stats Bar Skeleton */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="w-12 h-6 rounded bg-dark-800" />
                <Skeleton className="w-16 h-4 rounded bg-dark-800" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section Skeleton */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="w-40 h-8 rounded bg-dark-800" />
            <Skeleton className="w-24 h-5 rounded bg-dark-800" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <Skeleton className="aspect-video bg-dark-800" />
                <div className="p-6 space-y-3">
                  <Skeleton className="w-20 h-5 rounded-full bg-dark-800" />
                  <Skeleton className="w-full h-5 rounded bg-dark-800" />
                  <Skeleton className="w-3/4 h-4 rounded bg-dark-800" />
                  <div className="flex items-center gap-2 pt-2">
                    <Skeleton className="w-6 h-6 rounded-full bg-dark-800" />
                    <Skeleton className="w-20 h-3 rounded bg-dark-800" />
                    <Skeleton className="w-12 h-3 rounded bg-dark-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Discussions Section Skeleton */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="w-44 h-8 rounded bg-dark-800" />
            <Skeleton className="w-24 h-5 rounded bg-dark-800" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Featured Discussion Skeleton */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <Skeleton className="w-24 h-5 rounded-full bg-dark-800" />
              <Skeleton className="w-full h-6 rounded bg-dark-800" />
              <Skeleton className="w-1/3 h-4 rounded bg-dark-800" />
              <div className="flex items-center gap-6 pt-2">
                <Skeleton className="w-16 h-4 rounded bg-dark-800" />
                <Skeleton className="w-16 h-4 rounded bg-dark-800" />
                <Skeleton className="w-16 h-4 rounded bg-dark-800" />
              </div>
            </div>

            {/* Discussion List Skeleton */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-4 p-4">
                  <div className="flex flex-col items-center px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-xl">
                    <Skeleton className="w-4 h-4 rounded bg-dark-800" />
                    <Skeleton className="w-6 h-4 rounded bg-dark-800 mt-1" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Skeleton className="w-16 h-4 rounded-full bg-dark-800" />
                    <Skeleton className="w-full h-4 rounded bg-dark-800" />
                    <Skeleton className="w-24 h-3 rounded bg-dark-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Skeleton */}
      <section className="py-16 bg-gradient-to-r from-emerald-900/20 to-slate-900 border-y border-emerald-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Skeleton className="w-64 h-8 rounded bg-dark-800 mx-auto" />
          <Skeleton className="w-96 h-5 rounded bg-dark-800 mx-auto" />
          <Skeleton className="w-40 h-11 rounded-full bg-dark-800 mx-auto" />
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="w-8 h-8 rounded bg-dark-800" />
                <Skeleton className="w-32 h-5 rounded bg-dark-800" />
              </div>
              <Skeleton className="w-48 h-4 rounded bg-dark-800" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-16 h-4 rounded bg-dark-800" />
                  <Skeleton className="w-20 h-3 rounded bg-dark-800" />
                  <Skeleton className="w-20 h-3 rounded bg-dark-800" />
                  <Skeleton className="w-20 h-3 rounded bg-dark-800" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800">
            <Skeleton className="w-32 h-4 rounded bg-dark-800 mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export { CommunityHomeSkeleton };