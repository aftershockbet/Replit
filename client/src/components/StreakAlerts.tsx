import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type TeamWithStreak, type PlayerWithStreak, LEAGUES } from "@shared/schema";
import { TrendingUp, X, Trophy, Target } from "lucide-react";

interface StreakAlertsProps {
  newTeams: TeamWithStreak[];
  newPlayers: PlayerWithStreak[];
  onDismissTeam: (teamId: string) => void;
  onDismissPlayer: (playerId: string) => void;
  className?: string;
}

export default function StreakAlerts({
  newTeams,
  newPlayers,
  onDismissTeam,
  onDismissPlayer,
  className
}: StreakAlertsProps) {
  if (newTeams.length === 0 && newPlayers.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`} data-testid="streak-alerts-container">
      {/* New Team Alerts */}
      {newTeams.map((team) => {
        const league = LEAGUES[team.leagueId];
        return (
          <Alert 
            key={team.id} 
            className="border-streak-win bg-streak-win/10"
            data-testid={`alert-new-team-${team.id}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="h-5 w-5 text-streak-win" />
                  <AlertTitle className="mb-0">New Team Streak!</AlertTitle>
                </div>
                <AlertDescription>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{team.name}</span>
                      <Badge variant="outline" className="text-xs">
                        <span className="mr-1">{league.flag}</span>
                        {league.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {team.streakDescription}
                    </p>
                  </div>
                </AlertDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={() => onDismissTeam(team.id)}
                data-testid={`button-dismiss-team-${team.id}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Alert>
        );
      })}

      {/* New Player Alerts */}
      {newPlayers.map((player) => {
        const league = LEAGUES[player.leagueId];
        return (
          <Alert 
            key={player.id} 
            className="border-[#c400ff] bg-[#c400ff]/10"
            data-testid={`alert-new-player-${player.id}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5" style={{ color: '#c400ff' }} />
                  <AlertTitle className="mb-0">New Goalscorer Streak!</AlertTitle>
                </div>
                <AlertDescription>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{player.name}</span>
                      <span className="text-muted-foreground text-sm">({player.clubName})</span>
                      <Badge variant="outline" className="text-xs">
                        <span className="mr-1">{league.flag}</span>
                        {league.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {player.streakDescription}
                    </p>
                  </div>
                </AlertDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={() => onDismissPlayer(player.id)}
                data-testid={`button-dismiss-player-${player.id}`}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Alert>
        );
      })}
    </div>
  );
}
