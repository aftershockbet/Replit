import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";
import { type PlayerWithStreak, LEAGUES } from "@shared/schema";
import { formatDate, formatFixtureDateTime, formatOdds } from "@shared/utils";
import { Clock, ExternalLink, TrendingUp, Target } from "lucide-react";
import { parseISO } from "date-fns";

interface PlayerCardProps {
  player: PlayerWithStreak;
  className?: string;
}

export default function PlayerCard({ player, className }: PlayerCardProps) {
  const league = LEAGUES[player.leagueId];
  const { date: fixtureDate, time: fixtureTime } = formatFixtureDateTime(player.nextFixture.date);
  
  // Get position color
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
    <Card className={`hover-elevate ${className}`} data-testid={`card-player-${player.id}`}>
      <CardHeader className="pb-3">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            {/* Player Photo */}
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage src={player.photoUrl} alt={player.name} />
              <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold break-words" data-testid={`text-player-name-${player.id}`}>
                {player.name}
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground flex-wrap">
                <span className="mr-1">{player.clubLogo}</span>
                <span className="truncate">{player.clubName}</span>
                <Badge 
                  className={`text-white text-xs ${getPositionColor(player.position)} shrink-0`}
                  data-testid={`badge-position-${player.id}`}
                >
                  {player.position}
                </Badge>
              </div>
            </div>
            
            <Badge variant="outline" className="text-xs flex items-center gap-1 shrink-0 w-fit" data-testid={`badge-league-${player.id}`}>
              {'logoUrl' in league && league.logoUrl ? (
                <img src={league.logoUrl} alt={league.name} className="h-4 w-4 object-contain" />
              ) : (
                <span>{league.flag}</span>
              )}
              <span className="whitespace-nowrap hidden sm:inline">{league.name}</span>
            </Badge>
          </div>
          
          {player.favoriteVictim && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs h-7 w-full"
              data-testid={`button-favorite-victim-${player.id}`}
            >
              <Target className="h-3 w-3 mr-1 text-amber-500 shrink-0" />
              <span className="truncate">Favorite Victim: {player.favoriteVictim.teamName} ({player.favoriteVictim.goalsScored})</span>
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Scoring Streak Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Scoring Streak
            </span>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold">{player.totalGoals} goals</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-center text-muted-foreground" data-testid={`text-streak-description-${player.id}`}>
              {player.streakDescription}
            </p>
            
            {/* Consecutive Goals Display */}
            <div className="flex flex-wrap gap-1 justify-center" data-testid={`goals-streak-${player.id}`}>
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
        </div>
        
        {/* Next Fixture with Goalscorer Odds */}
        <div className="border-t pt-3 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Next fixture</span>
          </div>
          <div className="space-y-2">
            <div className="text-sm" data-testid={`text-next-fixture-${player.id}`}>
              <div className="font-medium break-words">
                {player.nextFixture.isHome 
                  ? `${player.clubName} vs ${player.nextFixture.opponent}`
                  : `${player.nextFixture.opponent} vs ${player.clubName}`
                }
              </div>
              <div className="text-muted-foreground text-xs mt-1">
                {fixtureDate} at {fixtureTime} CET
              </div>
            </div>
            
            {/* Goalscorer Betting Odds */}
            {(player.nextFixture.odds.firstGoalscorer || player.nextFixture.odds.anytimeGoalscorer || player.nextFixture.odds.twoOrMoreGoals) && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Goalscorer Odds ({player.nextFixture.odds.bookmaker}):
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs" data-testid={`goalscorer-odds-${player.id}`}>
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
      </CardContent>
    </Card>
  );
}