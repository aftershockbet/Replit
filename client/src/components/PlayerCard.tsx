import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type PlayerWithStreak, LEAGUES } from "@shared/schema";
import { Clock, ExternalLink, TrendingUp, Target } from "lucide-react";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

interface PlayerCardProps {
  player: PlayerWithStreak;
  className?: string;
}

export default function PlayerCard({ player, className }: PlayerCardProps) {
  const league = LEAGUES[player.leagueId];
  
  // Format date and time for CET/CEST (Madrid timezone)
  const formatFixtureDateTime = (isoDateString: string) => {
    try {
      const date = parseISO(isoDateString);
      const madridTime = toZonedTime(date, 'Europe/Madrid');
      const formattedDate = format(madridTime, 'dd/MM/yyyy');
      const formattedTime = format(madridTime, 'HH:mm');
      return { date: formattedDate, time: formattedTime };
    } catch {
      return { date: 'TBD', time: 'TBD' };
    }
  };
  
  // Format betting odds to 2 decimal places
  const formatOdds = (odds: number) => odds.toFixed(2);
  
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Player Photo */}
            <Avatar className="h-12 w-12">
              <AvatarImage src={player.photoUrl} alt={player.name} />
              <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col">
              <span className="text-lg font-semibold" data-testid={`text-player-name-${player.id}`}>
                {player.name}
              </span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="mr-1">{player.clubLogo}</span>
                <span>{player.clubName}</span>
                <Badge 
                  className={`text-white text-xs ${getPositionColor(player.position)}`}
                  data-testid={`badge-position-${player.id}`}
                >
                  {player.position}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline" className="text-xs" data-testid={`badge-league-${player.id}`}>
              <span className="mr-1">{league.flag}</span>
              {league.name}
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              className="text-xs h-7"
              data-testid={`button-topscorers-${player.id}`}
              onClick={() => {
                // todo: remove mock functionality - implement real topscorers link
                window.open(`/topscorers/${player.leagueId}`, '_blank');
              }}
            >
              <span className="mr-1">{league.logo}</span>
              <ExternalLink className="h-3 w-3 mr-1" />
              Top Scorers
            </Button>
          </div>
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
                  title={`${goalGame.goals} goal${goalGame.goals > 1 ? 's' : ''} vs ${goalGame.opponent} on ${format(parseISO(goalGame.date), 'dd/MM/yyyy')}`}
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
              <div className="font-medium">
                vs {player.nextFixture.opponent}
              </div>
              <div className="text-muted-foreground text-xs">
                {fixtureDate} at {fixtureTime} CET
              </div>
              <div className="text-muted-foreground text-xs">
                Venue: {player.nextFixture.venue}
              </div>
            </div>
            
            {/* Goalscorer Betting Odds */}
            {(player.nextFixture.odds.firstGoalscorer || player.nextFixture.odds.anytimeGoalscorer) && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Goalscorer Odds ({player.nextFixture.odds.bookmaker}):
                  </span>
                </div>
                <div className="flex gap-2 text-xs" data-testid={`goalscorer-odds-${player.id}`}>
                  {player.nextFixture.odds.firstGoalscorer && (
                    <Badge variant="secondary" className="px-2 py-1">
                      1st Goal {formatOdds(player.nextFixture.odds.firstGoalscorer)}
                    </Badge>
                  )}
                  {player.nextFixture.odds.anytimeGoalscorer && (
                    <Badge variant="secondary" className="px-2 py-1">
                      Anytime {formatOdds(player.nextFixture.odds.anytimeGoalscorer)}
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