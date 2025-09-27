import { Badge } from "@/components/ui/badge";
import { type MatchResult } from "@shared/schema";
import { cn } from "@/lib/utils";

interface StreakBadgeProps {
  result: MatchResult;
  className?: string;
}

export default function StreakBadge({ result, className }: StreakBadgeProps) {
  const getBadgeVariant = (result: MatchResult) => {
    switch (result) {
      case 'W':
        return 'default';
      case 'D':
        return 'secondary';
      case 'L':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getBadgeColor = (result: MatchResult) => {
    switch (result) {
      case 'W':
        return 'bg-streak-win text-white';
      case 'D':
        return 'bg-streak-draw text-black';
      case 'L':
        return 'bg-streak-loss text-white';
      default:
        return '';
    }
  };

  return (
    <Badge 
      variant={getBadgeVariant(result)}
      className={cn(
        "h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold",
        getBadgeColor(result),
        className
      )}
      data-testid={`badge-${result.toLowerCase()}`}
    >
      {result}
    </Badge>
  );
}