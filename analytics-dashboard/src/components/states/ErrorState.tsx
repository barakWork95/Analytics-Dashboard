interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Something went wrong",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-100 flex flex-col items-center justify-center gap-3 text-center">
      <span className="text-4xl">⚠️</span>
      <p className="text-gray-700 font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
}
