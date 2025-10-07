import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type PlayerWithStreak, LEAGUES } from "@shared/schema";
import { formatDate, formatFixtureDateTime, formatOdds } from "@shared/utils";
import { Clock, Target } from "lucide-react";

interface PlayerListItemProps {
  player: PlayerWithStreak;
  className?: string;
}

export default function PlayerListItem({ player, className }: PlayerListItemProps) {
  const league = LEAGUES[player.leagueId];
  const { date: fixtureDate, time: fixtureTime } = formatFixtureDateTime(player.nextFixture.date);
  
  const getPositionColor = (position: string) => {
    switch (position) {
      case 'DEF':
        return 'bg-blue-600';
      case 'MID':
        return 'bg-green-600';
      case 'FWD':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div 
      className={`border rounded-lg p-4 hover-elevate border-[#c60000] bg-[#c60000]/5 ${className}`} 
      data-testid={`list-player-${player.id}`}
    >
      <div className="space-y-3">
        {/* Header Row */}
        <div className="flex items-start gap-3 flex-wrap">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarImage src={player.photoUrl} alt={player.name} />
            <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold break-words" data-testid={`text-player-name-${player.id}`}>
                {player.name}
              </h3>
              <Badge 
                className={`text-white text-[10px] px-1.5 py-0 h-4 ${getPositionColor(player.position)} shrink-0`}
                data-testid={`badge-position-${player.id}`}
              >
                {player.position}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
              <span>{player.clubLogo}</span>
              <span className="truncate">{player.clubName}</span>
            </div>
            
            <Badge variant="outline" className="text-xs w-fit">
              <span className="mr-1">{league.flag}</span>
              <span className="hidden sm:inline">{league.name}</span>
            </Badge>
          </div>
        </div>

        {/* Scoring Streak */}
        <div className="space-y-2 border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Scoring Streak
            </span>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold">{player.totalGoals} goals</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground" data-testid={`text-streak-description-${player.id}`}>
            {player.streakDescription}
          </p>
          
          <div className="flex flex-wrap gap-1" data-testid={`goals-streak-${player.id}`}>
            {player.consecutiveGoals.map((goalGame, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-2 py-1"
                title={`${goalGame.goals} goal${goalGame.goals > 1 ? 's' : ''} vs ${goalGame.opponent} on ${formatDate(goalGame.date)}`}
              >
                ⚽ {goalGame.goals} vs {goalGame.opponent}
              </Badge>
            ))}
          </div>
        </div>

        {/* Favorite Victim */}
        {player.favoriteVictim && (
          <div className="flex items-center gap-2 border-t pt-3">
            <Target className="h-4 w-4 text-amber-500 shrink-0" />
            <span className="text-xs text-muted-foreground">
              Favorite Victim: <span className="font-medium text-foreground">{player.favoriteVictim.teamName}</span> ({player.favoriteVictim.goalsScored} goals)
            </span>
          </div>
        )}

        {/* Next Fixture */}
        <div className="space-y-2 border-t pt-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Next fixture</span>
          </div>
          <div className="text-sm">
            <div className="font-medium break-words" data-testid={`text-next-fixture-${player.id}`}>
              {player.nextFixture.isHome 
                ? `${player.clubName} vs ${player.nextFixture.opponent}`
                : `${player.nextFixture.opponent} vs ${player.clubName}`
              }
            </div>
            <div className="text-muted-foreground text-xs mt-1">
              {fixtureDate} at {fixtureTime} CET
            </div>
          </div>
        </div>

        {/* Goalscorer Odds */}
        {(player.nextFixture.odds.firstGoalscorer || player.nextFixture.odds.anytimeGoalscorer || player.nextFixture.odds.twoOrMoreGoals) && (
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">
              Goalscorer Odds ({player.nextFixture.odds.bookmaker}):
            </span>
            <div className="flex flex-wrap gap-2" data-testid={`goalscorer-odds-${player.id}`}>
              {player.nextFixture.odds.firstGoalscorer && (
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  1st Goal {formatOdds(player.nextFixture.odds.firstGoalscorer)}
                </Badge>
              )}
              {player.nextFixture.odds.anytimeGoalscorer && (
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  Anytime {formatOdds(player.nextFixture.odds.anytimeGoalscorer)}
                </Badge>
              )}
              {player.nextFixture.odds.twoOrMoreGoals && (
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  2+ Goals {formatOdds(player.nextFixture.odds.twoOrMoreGoals)}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
