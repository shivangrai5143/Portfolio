/**
 * SkeletonCard — animated shimmer placeholder
 *
 * Usage:
 *   <SkeletonCard lines={3} className="mb-4" />
 */

interface SkeletonCardProps {
  lines?: number;
  className?: string;
}

const SkeletonCard = ({ lines = 3, className = "" }: SkeletonCardProps) => {
  return (
    <div className={`animate-pulse ${className}`} aria-hidden="true">
      {/* Title line */}
      <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded-md w-2/3 mb-3" />
      {/* Body lines */}
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <div
          key={i}
          className={`h-3.5 bg-gray-200 dark:bg-slate-700 rounded-md mb-2 ${
            i === lines - 2 ? "w-4/5" : "w-full"
          }`}
        />
      ))}
    </div>
  );
};

/**
 * SkeletonPill — single tag-shaped skeleton
 */
interface SkeletonPillProps {
  width?: string;
}

export const SkeletonPill = ({ width = "w-16" }: SkeletonPillProps) => (
  <div
    className={`h-6 ${width} bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse`}
    aria-hidden="true"
  />
);

/**
 * SkeletonStat — number + label skeleton for stat cards
 */
export const SkeletonStat = () => (
  <div
    className="flex flex-col items-center gap-3 animate-pulse"
    aria-hidden="true"
  >
    <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-slate-700" />
    <div className="h-10 w-20 bg-gray-200 dark:bg-slate-700 rounded-md" />
    <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded-md" />
  </div>
);

export default SkeletonCard;
