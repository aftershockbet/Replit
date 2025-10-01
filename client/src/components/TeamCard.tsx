import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import StreakBadge from "./StreakBadge";
import { type TeamWithStreak, LEAGUES } from "@shared/schema";
import { formatFixtureDateTime, formatOdds, getBookmakerUrl } from "@shared/utils";
import { Clock, ExternalLink, TrendingUp } from "lucide-react";

interface TeamCardProps {
  team: TeamWithStreak;
  className?: string;
}

export default function TeamCard({ team, className }: TeamCardProps) {
  const league = LEAGUES[team.leagueId];
  const { date: fixtureDate, time: fixtureTime } = formatFixtureDateTime(team.nextFixture.date);
  
  return (
    <Card className={`hover-elevate ${className}`} data-testid={`card-team-${team.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold" data-testid={`text-team-name-${team.id}`}>
              {team.name}
            </span>
          </div>
          <Badge variant="outline" className="text-xs flex items-center gap-1" data-testid={`badge-league-${team.id}`}>
            {'logoUrl' in league && league.logoUrl ? (
              <img src={league.logoUrl} alt={league.name} className="h-4 w-4 object-contain" />
            ) : (
              <span>{league.flag}</span>
            )}
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
            <Link href={`/standings/${team.leagueId}?highlight=${team.id}`}>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs h-7"
                data-testid={`button-standings-${team.id}`}
              >
                {'logoUrl' in league && league.logoUrl ? (
                  <img src={league.logoUrl} alt={league.name} className="h-4 w-4 mr-1 object-contain" />
                ) : (
                  <span className="mr-1">{league.flag}</span>
                )}
                <ExternalLink className="h-3 w-3 mr-1" />
                Standings
              </Button>
            </Link>
          </div>
          
          <div className="flex gap-1 justify-center" data-testid={`streak-pattern-${team.id}`}>
            {team.recentMatches.slice(0, 5).map((match, index) => (
              <StreakBadge 
                key={index} 
                result={match.result}
                opponent={match.opponent}
                date={match.date}
                score={match.score}
                teamName={team.name}
                isHome={match.isHome}
                className="transition-transform hover:scale-110"
              />
            ))}
          </div>
        </div>
        
        {/* Next Fixture with Betting Odds */}
        <div className="border-t pt-3 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Next fixture</span>
          </div>
          <div className="space-y-2">
            <div className="text-sm" data-testid={`text-next-fixture-${team.id}`}>
              <div className="font-medium">
                {team.nextFixture.isHome 
                  ? `${team.name} vs ${team.nextFixture.opponent}`
                  : `${team.nextFixture.opponent} vs ${team.name}`
                }
              </div>
              <div className="text-muted-foreground text-xs">
                {fixtureDate} at {fixtureTime} CET
              </div>
            </div>
            
            {/* Betting Odds */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Odds ({team.nextFixture.odds.bookmaker}):
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs" data-testid={`betting-odds-${team.id}`}>
                <a 
                  href={getBookmakerUrl(team.nextFixture.odds.bookmaker)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid={`link-odds-win-${team.id}`}
                >
                  <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer hover-elevate active-elevate-2">
                    (1) {formatOdds(team.nextFixture.odds.win)}
                  </Badge>
                </a>
                <a 
                  href={getBookmakerUrl(team.nextFixture.odds.bookmaker)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid={`link-odds-draw-${team.id}`}
                >
                  <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer hover-elevate active-elevate-2">
                    (X) {formatOdds(team.nextFixture.odds.draw)}
                  </Badge>
                </a>
                <a 
                  href={getBookmakerUrl(team.nextFixture.odds.bookmaker)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-testid={`link-odds-loss-${team.id}`}
                >
                  <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer hover-elevate active-elevate-2">
                    (2) {formatOdds(team.nextFixture.odds.loss)}
                  </Badge>
                </a>
              </div>
              
              {/* Double Chance Odds */}
              {(team.nextFixture.odds.doubleChance1X || team.nextFixture.odds.doubleChance12 || team.nextFixture.odds.doubleChanceX2) && (
                <div className="flex flex-wrap gap-2 text-xs mt-2" data-testid={`double-chance-odds-${team.id}`}>
                  {team.nextFixture.odds.doubleChance1X && (
                    <a 
                      href={getBookmakerUrl(team.nextFixture.odds.bookmaker)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      data-testid={`link-odds-1x-${team.id}`}
                    >
                      <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer hover-elevate active-elevate-2">
                        (1X) {formatOdds(team.nextFixture.odds.doubleChance1X)}
                      </Badge>
                    </a>
                  )}
                  {team.nextFixture.odds.doubleChance12 && (
                    <a 
                      href={getBookmakerUrl(team.nextFixture.odds.bookmaker)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      data-testid={`link-odds-12-${team.id}`}
                    >
                      <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer hover-elevate active-elevate-2">
                        (12) {formatOdds(team.nextFixture.odds.doubleChance12)}
                      </Badge>
                    </a>
                  )}
                  {team.nextFixture.odds.doubleChanceX2 && (
                    <a 
                      href={getBookmakerUrl(team.nextFixture.odds.bookmaker)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      data-testid={`link-odds-x2-${team.id}`}
                    >
                      <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer hover-elevate active-elevate-2">
                        (X2) {formatOdds(team.nextFixture.odds.doubleChanceX2)}
                      </Badge>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}