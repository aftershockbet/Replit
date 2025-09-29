import { useRoute, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LEAGUES } from "@shared/schema";
import { ArrowLeft } from "lucide-react";

export default function Standings() {
  const [, params] = useRoute("/standings/:leagueId");
  const [, setLocation] = useLocation();
  
  const leagueId = params?.leagueId;
  const league = leagueId ? LEAGUES[leagueId as keyof typeof LEAGUES] : null;
  
  if (!league || !leagueId) {
    return (
      <div className="min-h-screen bg-background p-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground">League not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => setLocation("/")}
            className="mb-4"
            data-testid="button-back-to-home"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Streaks
          </Button>
          
          <div className="flex items-center gap-3">
            <span className="text-4xl">{league.flag}</span>
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-league-name">
                {league.name}
              </h1>
              <p className="text-muted-foreground">League Standings</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>League Table</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                League standings data will be integrated here
              </p>
              <p className="text-sm text-muted-foreground">
                This page will display the current league table with team positions, points, goals, and form
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
