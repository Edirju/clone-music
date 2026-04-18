import React from 'react'

interface SkeletonProps {
  className: string;
}

export const Skeleton = ({className}: SkeletonProps) => {
  return (
    <div className={`animate-pulse bg-zinc-800 rounded-md ${className}`} />  
  )
}

// Un esqueleto especifico para las SongCards
export const SongCardSkeleton = () => {
  return (
    <div className="p-4 bg-zinc-900/40 rounded-xl flex flex-col gap-3">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  )
}
