import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import StreakBadge from "./StreakBadge";
import { type TeamWithStreak, LEAGUES } from "@shared/schema";
import { formatFixtureDateTime, formatOdds, getBookmakerUrl, formatNextFixture } from "@shared/utils";
import { Clock, ExternalLink, TrendingUp, ArrowLeftRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TeamListItemProps {
  team: TeamWithStreak;
  className?: string;
}

export default function TeamListItem({ team, className }: TeamListItemProps) {
  const league = LEAGUES[team.leagueId];
  const { date: fixtureDate, time: fixtureTime } = formatFixtureDateTime(team.nextFixture.date);
  const bookmakerUrl = getBookmakerUrl(team.nextFixture.odds.bookmaker);
  const hasValidBookmakerUrl = bookmakerUrl !== '#';
  const isMobile = useIsMobile();
  
  // Get border color based on streak type
  const getBorderColor = () => {
    if (team.streakType === 'winning') return 'border-[#40af0f] bg-[#40af0f]/5';
    if (team.streakType === 'drawing') return 'border-[#efb609] bg-[#efb609]/5';
    return '';
  };
  
  return (
    <div 
      className={`border rounded-lg p-4 hover-elevate ${getBorderColor()} ${className}`} 
      data-testid={`list-team-${team.id}`}
    >
      <div className="space-y-3">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold break-words" data-testid={`text-team-name-${team.id}`}>
                {team.name}
              </h3>
              <Badge variant="outline" className="text-xs mt-1 w-fit">
                <span className="mr-1">{league.flag}</span>
                <span className="hidden sm:inline">{league.name}</span>
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {team.recentMatches.slice(0, 5).map((match, index) => (
                <StreakBadge 
                  key={index} 
                  result={match.result}
                  opponent={match.opponent}
                  date={match.date}
                  score={match.score}
                  teamName={team.name}
                  isHome={match.isHome}
                />
              ))}
            </div>
            <Link href={`/standings/${team.leagueId}?highlight=${team.id}`}>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs h-7"
                data-testid={`button-standings-${team.id}`}
              >
                {isMobile ? 'Table' : 'Standings'}
              </Button>
            </Link>
          </div>
        </div>

        {/* Next Fixture */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Next fixture</span>
            </div>
            <Link href={`/h2h/${team.id}/${team.nextFixture.opponent}`}>
              <Button 
                variant="outline" 
                size="sm"
                className="text-xs h-7"
                data-testid={`button-h2h-${team.id}`}
              >
                <ArrowLeftRight className="h-3 w-3 mr-1" />
                H2H
              </Button>
            </Link>
          </div>
          <div className="text-sm">
            <div className="font-medium break-words" data-testid={`text-next-fixture-${team.id}`}>
              {team.nextFixture.isHome 
                ? formatNextFixture(team.name, team.nextFixture.opponent)
                : formatNextFixture(team.nextFixture.opponent, team.name)
              }
            </div>
            <div className="text-muted-foreground text-xs mt-1">
              {fixtureDate} at {fixtureTime} CET
            </div>
          </div>
        </div>

        {/* Betting Odds */}
        {team.nextFixture.odds && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Odds ({team.nextFixture.odds.bookmaker}):
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {hasValidBookmakerUrl ? (
                <a href={bookmakerUrl} target="_blank" rel="noopener noreferrer">
                  <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer">
                    (1) {formatOdds(team.nextFixture.odds.win)}
                  </Badge>
                </a>
              ) : (
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  (1) {formatOdds(team.nextFixture.odds.win)}
                </Badge>
              )}
              {hasValidBookmakerUrl ? (
                <a href={bookmakerUrl} target="_blank" rel="noopener noreferrer">
                  <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer">
                    (X) {formatOdds(team.nextFixture.odds.draw)}
                  </Badge>
                </a>
              ) : (
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  (X) {formatOdds(team.nextFixture.odds.draw)}
                </Badge>
              )}
              {hasValidBookmakerUrl ? (
                <a href={bookmakerUrl} target="_blank" rel="noopener noreferrer">
                  <Badge variant="secondary" className="px-2 py-1 text-xs cursor-pointer">
                    (2) {formatOdds(team.nextFixture.odds.loss)}
                  </Badge>
                </a>
              ) : (
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  (2) {formatOdds(team.nextFixture.odds.loss)}
                </Badge>
              )}
              {team.nextFixture.odds.doubleChance1X && (
                <>
                  {hasValidBookmakerUrl ? (
                    <a href={bookmakerUrl} target="_blank" rel="noopener noreferrer">
                      <Badge variant="outline" className="px-2 py-1 text-xs cursor-pointer">
                        (1X) {formatOdds(team.nextFixture.odds.doubleChance1X)}
                      </Badge>
                    </a>
                  ) : (
                    <Badge variant="outline" className="px-2 py-1 text-xs">
                      (1X) {formatOdds(team.nextFixture.odds.doubleChance1X)}
                    </Badge>
                  )}
                </>
              )}
              {team.nextFixture.odds.doubleChance12 && (
                <>
                  {hasValidBookmakerUrl ? (
                    <a href={bookmakerUrl} target="_blank" rel="noopener noreferrer">
                      <Badge variant="outline" className="px-2 py-1 text-xs cursor-pointer">
                        (12) {formatOdds(team.nextFixture.odds.doubleChance12)}
                      </Badge>
                    </a>
                  ) : (
                    <Badge variant="outline" className="px-2 py-1 text-xs">
                      (12) {formatOdds(team.nextFixture.odds.doubleChance12)}
                    </Badge>
                  )}
                </>
              )}
              {team.nextFixture.odds.doubleChanceX2 && (
                <>
                  {hasValidBookmakerUrl ? (
                    <a href={bookmakerUrl} target="_blank" rel="noopener noreferrer">
                      <Badge variant="outline" className="px-2 py-1 text-xs cursor-pointer">
                        (X2) {formatOdds(team.nextFixture.odds.doubleChanceX2)}
                      </Badge>
                    </a>
                  ) : (
                    <Badge variant="outline" className="px-2 py-1 text-xs">
                      (X2) {formatOdds(team.nextFixture.odds.doubleChanceX2)}
                    </Badge>
                  )}
                </>
              )}
              {hasValidBookmakerUrl && (
                <a href={bookmakerUrl} target="_blank" rel="noopener noreferrer">
                  <Badge variant="outline" className="px-2 py-1 text-xs flex items-center gap-1 cursor-pointer">
                    More <ExternalLink className="h-3 w-3" />
                  </Badge>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
