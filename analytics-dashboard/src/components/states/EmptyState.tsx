interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No data found" }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 text-center">
      <span className="text-4xl">🔍</span>
      <p className="text-gray-500 font-medium">{message}</p>
    </div>
  );
}
