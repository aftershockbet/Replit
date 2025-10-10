import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import StreakBadge from "./StreakBadge";
import { type TeamWithStreak, LEAGUES } from "@shared/schema";
import { formatFixtureDateTime, formatOdds, getBookmakerUrl, formatNextFixture } from "@shared/utils";
import { Clock, ExternalLink, TrendingUp, ArrowLeftRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TeamCardProps {
  team: TeamWithStreak;
  className?: string;
}

export default function TeamCard({ team, className }: TeamCardProps) {
  const league = LEAGUES[team.leagueId];
  const { date: fixtureDate, time: fixtureTime } = formatFixtureDateTime(team.nextFixture.date);
  const bookmakerUrl = getBookmakerUrl(team.nextFixture.odds.bookmaker);
  const hasValidBookmakerUrl = bookmakerUrl !== '#';
  const isMobile = useIsMobile();
  
  // Calculate consecutive wins/draws for Invincibles/Unbreakables alerts
  const calculateConsecutiveCount = (resultType: 'W' | 'D') => {
    let count = 0;
    for (const match of team.recentMatches) {
      if (match.result === resultType) {
        count++;
      } else {
        break;
      }
    }
    return count;
  };
  
  const consecutiveWins = team.streakType === 'winning' ? calculateConsecutiveCount('W') : 0;
  const consecutiveDraws = team.streakType === 'drawing' ? calculateConsecutiveCount('D') : 0;
  const showInvinciblesCount = consecutiveWins >= 6 && consecutiveWins <= 10;
  const showUnbreakablesCount = consecutiveDraws >= 6 && consecutiveDraws <= 10;
  
  // Determine how many badges to show
  const badgesToShow = showInvinciblesCount ? consecutiveWins : 
                       showUnbreakablesCount ? consecutiveDraws : 5;
  
  // Get border color based on streak type
  const getBorderColor = () => {
    if (team.streakType === 'winning') return 'border-[#40af0f] bg-[#40af0f]/5';
    if (team.streakType === 'drawing') return 'border-[#efb609] bg-[#efb609]/5';
    return '';
  };
  
  return (
    <Card className={`hover-elevate ${getBorderColor()} ${className}`} data-testid={`card-team-${team.id}`}>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base sm:text-lg font-semibold break-words" data-testid={`text-team-name-${team.id}`}>
            {team.name}
          </h3>
          <Badge variant="outline" className="text-xs flex items-center gap-1 w-fit shrink-0" data-testid={`badge-league-${team.id}`}>
            <span>{league.flag}</span>
            <span className="whitespace-nowrap">{league.name}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Streak Pattern Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Recent Form
            </span>
            <Link href={`/standings/${team.leagueId}?highlight=${team.id}`}>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs h-7 shrink-0"
                data-testid={`button-standings-${team.id}`}
              >
                <span className="mr-1">{league.flag}</span>
                <ExternalLink className="h-3 w-3 mr-1" />
                {isMobile ? 'Table' : 'Standings'}
              </Button>
            </Link>
          </div>
          
          <div className="flex gap-1 justify-center flex-wrap" data-testid={`streak-pattern-${team.id}`}>
            {team.recentMatches.slice(0, badgesToShow).map((match, index) => (
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
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Next fixture</span>
            </div>
            <Link href={`/h2h/${team.id}/${team.nextFixture.opponent}`}>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs h-7 shrink-0"
                data-testid={`button-h2h-${team.id}`}
              >
                <ArrowLeftRight className="h-3 w-3 mr-1" />
                H2H
              </Button>
            </Link>
          </div>
          <div className="space-y-2">
            <div className="text-sm" data-testid={`text-next-fixture-${team.id}`}>
              <div className="font-medium break-words">
                {team.nextFixture.isHome 
                  ? formatNextFixture(team.name, team.nextFixture.opponent)
                  : formatNextFixture(team.nextFixture.opponent, team.name)
                }
              </div>
              <div className="text-muted-foreground text-xs mt-1">
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
                {hasValidBookmakerUrl ? (
                  <a 
                    href={bookmakerUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid={`link-odds-win-${team.id}`}
                  >
                    <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer">
                      (1) {formatOdds(team.nextFixture.odds.win)}
                    </Badge>
                  </a>
                ) : (
                  <Badge variant="secondary" className="px-2 py-1 text-xs" data-testid={`badge-odds-win-${team.id}`}>
                    (1) {formatOdds(team.nextFixture.odds.win)}
                  </Badge>
                )}
                {hasValidBookmakerUrl ? (
                  <a 
                    href={bookmakerUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid={`link-odds-draw-${team.id}`}
                  >
                    <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer">
                      (X) {formatOdds(team.nextFixture.odds.draw)}
                    </Badge>
                  </a>
                ) : (
                  <Badge variant="secondary" className="px-2 py-1 text-xs" data-testid={`badge-odds-draw-${team.id}`}>
                    (X) {formatOdds(team.nextFixture.odds.draw)}
                  </Badge>
                )}
                {hasValidBookmakerUrl ? (
                  <a 
                    href={bookmakerUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    data-testid={`link-odds-loss-${team.id}`}
                  >
                    <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer">
                      (2) {formatOdds(team.nextFixture.odds.loss)}
                    </Badge>
                  </a>
                ) : (
                  <Badge variant="secondary" className="px-2 py-1 text-xs" data-testid={`badge-odds-loss-${team.id}`}>
                    (2) {formatOdds(team.nextFixture.odds.loss)}
                  </Badge>
                )}
              </div>
              
              {/* Double Chance Odds */}
              {(team.nextFixture.odds.doubleChance1X || team.nextFixture.odds.doubleChance12 || team.nextFixture.odds.doubleChanceX2) && (
                <div className="flex flex-wrap gap-2 text-xs mt-2" data-testid={`double-chance-odds-${team.id}`}>
                  {team.nextFixture.odds.doubleChance1X && (
                    hasValidBookmakerUrl ? (
                      <a 
                        href={bookmakerUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        data-testid={`link-odds-1x-${team.id}`}
                      >
                        <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer">
                          (1X) {formatOdds(team.nextFixture.odds.doubleChance1X)}
                        </Badge>
                      </a>
                    ) : (
                      <Badge variant="secondary" className="px-2 py-1 text-xs" data-testid={`badge-odds-1x-${team.id}`}>
                        (1X) {formatOdds(team.nextFixture.odds.doubleChance1X)}
                      </Badge>
                    )
                  )}
                  {team.nextFixture.odds.doubleChance12 && (
                    hasValidBookmakerUrl ? (
                      <a 
                        href={bookmakerUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        data-testid={`link-odds-12-${team.id}`}
                      >
                        <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer">
                          (12) {formatOdds(team.nextFixture.odds.doubleChance12)}
                        </Badge>
                      </a>
                    ) : (
                      <Badge variant="secondary" className="px-2 py-1 text-xs" data-testid={`badge-odds-12-${team.id}`}>
                        (12) {formatOdds(team.nextFixture.odds.doubleChance12)}
                      </Badge>
                    )
                  )}
                  {team.nextFixture.odds.doubleChanceX2 && (
                    hasValidBookmakerUrl ? (
                      <a 
                        href={bookmakerUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        data-testid={`link-odds-x2-${team.id}`}
                      >
                        <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer">
                          (X2) {formatOdds(team.nextFixture.odds.doubleChanceX2)}
                        </Badge>
                      </a>
                    ) : (
                      <Badge variant="secondary" className="px-2 py-1 text-xs" data-testid={`badge-odds-x2-${team.id}`}>
                        (X2) {formatOdds(team.nextFixture.odds.doubleChanceX2)}
                      </Badge>
                    )
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