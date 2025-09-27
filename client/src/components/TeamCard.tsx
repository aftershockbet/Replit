import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StreakBadge from "./StreakBadge";
import { type TeamWithStreak, LEAGUES } from "@shared/schema";
import { Clock } from "lucide-react";

interface TeamCardProps {
  team: TeamWithStreak;
  className?: string;
}

export default function TeamCard({ team, className }: TeamCardProps) {
  const league = LEAGUES[team.leagueId];
  
  return (
    <Card className={`hover-elevate ${className}`} data-testid={`card-team-${team.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold" data-testid={`text-team-name-${team.id}`}>
              {team.name}
            </span>
          </div>
          <Badge variant="outline" className="text-xs" data-testid={`badge-league-${team.id}`}>
            <span className="mr-1">{league.flag}</span>
            {league.name}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Streak Pattern Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Recent Form
            </span>
            <Badge 
              variant={team.streakType === 'winning' ? 'default' : 'secondary'}
              className="text-xs"
              data-testid={`badge-streak-type-${team.id}`}
            >
              {team.streakType === 'winning' ? 'Winning' : 'Drawing'} Streak
            </Badge>
          </div>
          
          <div className="flex gap-1 justify-center" data-testid={`streak-pattern-${team.id}`}>
            {team.recentMatches.slice(0, 5).map((match, index) => (
              <StreakBadge 
                key={index} 
                result={match.result}
                opponent={match.opponent}
                date={match.date}
                className="transition-transform hover:scale-110"
              />
            ))}
          </div>
          
          <p className="text-sm text-center text-muted-foreground" data-testid={`text-streak-description-${team.id}`}>
            {team.streakDescription}
          </p>
        </div>
        
        {/* Next Fixture - Mock for now */}
        <div className="border-t pt-3 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Next fixture</span>
          </div>
          <div className="text-sm" data-testid={`text-next-fixture-${team.id}`}>
            <span className="font-medium">vs {team.recentMatches[0]?.opponent || 'TBD'}</span>
            <span className="text-muted-foreground ml-2">
              {/* todo: remove mock functionality */}
              Tomorrow 15:00
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}