export function KPICardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
    </div>
  );
}
