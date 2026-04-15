export function BlogCardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-48 bg-gray-800/50 rounded-lg" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-800/50 rounded w-3/4" />
        <div className="h-3 bg-gray-800/50 rounded w-1/2" />
      </div>
    </div>
  );
}

export function BlogSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-64 bg-gray-800/50 rounded-lg" />
      <div className="space-y-2">
        <div className="h-5 bg-gray-800/50 rounded w-2/3" />
        <div className="h-3 bg-gray-800/50 rounded w-full" />
        <div className="h-3 bg-gray-800/50 rounded w-5/6" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="h-screen bg-gradient-to-b from-black-100 to-black-100/80 flex items-center justify-center animate-pulse">
      <div className="w-full max-w-2xl px-4 space-y-4">
        <div className="h-12 bg-gray-800/50 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-800/50 rounded w-2/3 mx-auto" />
        <div className="h-10 bg-gray-800/50 rounded w-32 mx-auto" />
      </div>
    </div>
  );
}
