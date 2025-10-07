import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type MatchResult } from "@shared/schema";
import { formatDate } from "@shared/utils";
import { cn } from "@/lib/utils";

interface StreakBadgeProps {
  result: MatchResult;
  opponent?: string;
  date?: string;
  score?: string;
  className?: string;
  teamName?: string;
  isHome?: boolean;
}

export default function StreakBadge({ result, opponent, date, score, className, teamName, isHome }: StreakBadgeProps) {
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

  const getResultText = (result: MatchResult, score?: string) => {
    if (score) {
      switch (result) {
        case 'W':
          return `Won ${score}`;
        case 'D':
          return `Drew ${score}`;
        case 'L':
          return `Lost ${score}`;
        default:
          return score;
      }
    }
    switch (result) {
      case 'W':
        return 'Win';
      case 'D':
        return 'Draw';
      case 'L':
        return 'Loss';
      default:
        return result;
    }
  };


  const badge = (
    <Badge 
      variant={getBadgeVariant(result)}
      className={cn(
        "h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold cursor-help",
        getBadgeColor(result),
        className
      )}
      data-testid={`badge-${result.toLowerCase()}`}
    >
      {result}
    </Badge>
  );

  // If no additional details provided, return badge without tooltip
  if (!opponent && !date) {
    return badge;
  }

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <button 
          className="inline-block focus:outline-none touch-manipulation" 
          type="button"
          onTouchStart={(e) => e.stopPropagation()}
        >
          {badge}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="z-50">
        <div className="text-sm">
          <div className="font-medium">{getResultText(result, score)}</div>
          {opponent && teamName && typeof isHome !== 'undefined' && (
            <div>
              {isHome ? `${teamName} vs ${opponent}` : `${opponent} vs ${teamName}`}
            </div>
          )}
          {opponent && !teamName && <div>vs {opponent}</div>}
          {date && <div className="text-muted-foreground">{formatDate(date)}</div>}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}