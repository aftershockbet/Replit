import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy } from "lucide-react";
import { LEAGUES } from "@shared/schema";

interface H2HMatch {
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  result: 'W' | 'D' | 'L';
  competition: string;
}

export default function H2H() {
  const params = useParams();
  const teamId = params.teamId || '';
  const opponentId = params.opponentId || '';

  // Mock team names - in a real app these would come from an API
  const teamName = teamId;
  const opponentName = opponentId;

  // Mock H2H data - in a real app this would come from an API
  // showing last 10 encounters (or fewer if not available)
  const h2hMatches: H2HMatch[] = [
    {
      date: "2024-03-15",
      homeTeam: teamName,
      awayTeam: opponentName,
      score: "2-1",
      result: 'W',
      competition: "Premier League"
    },
    {
      date: "2023-11-22",
      homeTeam: opponentName,
      awayTeam: teamName,
      score: "1-1",
      result: 'D',
      competition: "Premier League"
    },
    {
      date: "2023-04-08",
      homeTeam: teamName,
      awayTeam: opponentName,
      score: "0-2",
      result: 'L',
      competition: "Premier League"
    },
    {
      date: "2022-12-03",
      homeTeam: opponentName,
      awayTeam: teamName,
      score: "3-1",
      result: 'L',
      competition: "Premier League"
    },
    {
      date: "2022-08-19",
      homeTeam: teamName,
      awayTeam: opponentName,
      score: "2-0",
      result: 'W',
      competition: "Premier League"
    },
  ];

  const getResultBadgeColor = (result: 'W' | 'D' | 'L') => {
    if (result === 'W') return 'bg-[#40af0f] text-white hover:bg-[#40af0f]/90';
    if (result === 'D') return 'bg-[#efb609] text-white hover:bg-[#efb609]/90';
    return 'bg-[#c60000] text-white hover:bg-[#c60000]/90';
  };

  const stats = {
    wins: h2hMatches.filter(m => m.result === 'W').length,
    draws: h2hMatches.filter(m => m.result === 'D').length,
    losses: h2hMatches.filter(m => m.result === 'L').length,
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-h2h-title">
              Head-to-Head
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {teamName} vs {opponentName}
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="hover-elevate">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Wins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#40af0f]" data-testid="text-wins">
                {stats.wins}
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Draws
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#efb609]" data-testid="text-draws">
                {stats.draws}
              </div>
            </CardContent>
          </Card>
          <Card className="hover-elevate">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Losses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#c60000]" data-testid="text-losses">
                {stats.losses}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Match History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Encounters
            </CardTitle>
          </CardHeader>
          <CardContent>
            {h2hMatches.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No previous encounters found in this competition
              </p>
            ) : (
              <div className="space-y-3">
                {h2hMatches.map((match, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 p-4 border rounded-lg hover-elevate"
                    data-testid={`match-item-${index}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge 
                          className={getResultBadgeColor(match.result)} 
                          data-testid={`badge-result-${index}`}
                        >
                          {match.result}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(match.date).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className={match.homeTeam === teamName ? 'font-semibold' : ''}>
                          {match.homeTeam}
                        </span>
                        <span className="mx-2 font-bold">{match.score}</span>
                        <span className={match.awayTeam === teamName ? 'font-semibold' : ''}>
                          {match.awayTeam}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {match.competition}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Note about limited data */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              📊 Showing last {h2hMatches.length} encounters in the same domestic competition
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
