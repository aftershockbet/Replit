import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type TeamWithStreak, type PlayerWithStreak, type StreakType, LEAGUES } from "@shared/schema";
import { TrendingUp, X, Trophy, Target, Crosshair, Bell } from "lucide-react";

interface FavoriteVictimAlert {
  player: PlayerWithStreak;
  favoriteVictimTeam: string;
  goalsScored: number;
}

interface StreakAlertsProps {
  newTeams: TeamWithStreak[];
  newPlayers: PlayerWithStreak[];
  favoriteVictimMatches?: FavoriteVictimAlert[];
  onDismissTeam: (teamId: string) => void;
  onDismissPlayer: (playerId: string) => void;
  onDismissFavoriteVictim?: (playerId: string) => void;
  activeTab: StreakType;
  onNavigateToGoalscorers?: () => void;
  className?: string;
}

export default function StreakAlerts({
  newTeams,
  newPlayers,
  favoriteVictimMatches = [],
  onDismissTeam,
  onDismissPlayer,
  onDismissFavoriteVictim,
  activeTab,
  onNavigateToGoalscorers,
  className
}: StreakAlertsProps) {
  if (newTeams.length === 0 && newPlayers.length === 0 && favoriteVictimMatches.length === 0) {
    return null;
  }

  // Show bell icon on Winning/Drawing tabs, full alerts on Goalscorers tab
  const showBellIcon = (activeTab === 'winning' || activeTab === 'drawing') && favoriteVictimMatches.length > 0;

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
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <span>{league.flag}</span>
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
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <span>{league.flag}</span>
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

      {/* Favorite Victim Alerts - Bell Icon on Winning/Drawing */}
      {showBellIcon && (
        <Button
          variant="outline"
          size="sm"
          onClick={onNavigateToGoalscorers}
          className="border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 text-foreground relative"
          data-testid="button-favorite-victim-bell"
        >
          <Bell className="h-5 w-5 text-amber-500 mr-2" />
          <span>Favorite Victim Alerts</span>
          <Badge variant="default" className="ml-2 bg-amber-500 text-white">
            {favoriteVictimMatches.length}
          </Badge>
        </Button>
      )}

      {/* Favorite Victim Alerts - Full Cards on Goalscorers Tab */}
      {activeTab === 'goalscorers' && favoriteVictimMatches.map((alert) => {
        const league = LEAGUES[alert.player.leagueId];
        return (
          <Alert 
            key={alert.player.id} 
            className="border-amber-500 bg-amber-500/10"
            data-testid={`alert-favorite-victim-${alert.player.id}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Crosshair className="h-5 w-5 text-amber-500" />
                  <AlertTitle className="mb-0">Favorite Victim Alert!</AlertTitle>
                </div>
                <AlertDescription>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{alert.player.name}</span>
                      <span className="text-muted-foreground text-sm">({alert.player.clubName})</span>
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <span>{league.flag}</span>
                        {league.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Playing against <span className="font-semibold text-foreground">{alert.favoriteVictimTeam}</span> - {alert.goalsScored} goals scored historically!
                    </p>
                  </div>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        );
      })}
    </div>
  );
}
