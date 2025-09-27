import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type MatchResult } from "@shared/schema";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

interface StreakBadgeProps {
  result: MatchResult;
  opponent?: string;
  date?: string;
  className?: string;
}

export default function StreakBadge({ result, opponent, date, className }: StreakBadgeProps) {
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

  const getResultText = (result: MatchResult) => {
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

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
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
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="inline-block">
          {badge}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-sm">
          <div className="font-medium">{getResultText(result)}</div>
          {opponent && <div>vs {opponent}</div>}
          {date && <div className="text-muted-foreground">{formatDate(date)}</div>}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}