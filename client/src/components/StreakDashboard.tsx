import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TeamCard from "./TeamCard";
import SearchBar from "./SearchBar";
import LeagueFilter from "./LeagueFilter";
import StreakTabs from "./StreakTabs";
import StatusIndicator from "./StatusIndicator";
import ThemeToggle from "./ThemeToggle";
import { type TeamWithStreak, type LeagueId, type StreakType } from "@shared/schema";
import { AlertCircle } from "lucide-react";

interface StreakDashboardProps {
  teams: TeamWithStreak[];
  lastUpdated: Date;
  isLoading?: boolean;
  className?: string;
}

export default function StreakDashboard({ 
  teams, 
  lastUpdated, 
  isLoading = false, 
  className 
}: StreakDashboardProps) {
  const [activeTab, setActiveTab] = useState<StreakType>('winning');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeagues, setSelectedLeagues] = useState<LeagueId[]>([]);

  // Filter teams based on current filters
  const filteredTeams = useMemo(() => {
    return teams.filter(team => {
      // Filter by streak type
      if (team.streakType !== activeTab) return false;
      
      // Filter by search query
      if (searchQuery && !team.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by selected leagues
      if (selectedLeagues.length > 0 && !selectedLeagues.includes(team.leagueId)) {
        return false;
      }
      
      return true;
    });
  }, [teams, activeTab, searchQuery, selectedLeagues]);

  // Count teams by streak type
  const counts = useMemo(() => {
    return {
      winning: teams.filter(t => t.streakType === 'winning').length,
      drawing: teams.filter(t => t.streakType === 'drawing').length,
    };
  }, [teams]);

  // Group teams by league for better organization
  const groupedTeams = useMemo(() => {
    const groups: Record<string, TeamWithStreak[]> = {};
    filteredTeams.forEach(team => {
      if (!groups[team.leagueId]) {
        groups[team.leagueId] = [];
      }
      groups[team.leagueId].push(team);
    });
    return groups;
  }, [filteredTeams]);

  const handleLeagueToggle = (leagueId: LeagueId) => {
    setSelectedLeagues(prev => 
      prev.includes(leagueId)
        ? prev.filter(id => id !== leagueId)
        : [...prev, leagueId]
    );
  };

  const handleClearAllLeagues = () => {
    setSelectedLeagues([]);
  };

  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground" data-testid="text-app-title">
                Elite Streaks
              </h1>
              <p className="text-sm text-muted-foreground">
                Football team performance tracking across elite leagues
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <StatusIndicator 
                lastUpdated={lastUpdated}
                isLoading={isLoading}
                className="hidden sm:flex"
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Controls */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar 
              onSearch={setSearchQuery}
              className="flex-1"
            />
            <LeagueFilter 
              selectedLeagues={selectedLeagues}
              onLeagueToggle={handleLeagueToggle}
              onClearAll={handleClearAllLeagues}
            />
          </div>
          
          {/* Mobile Status Indicator */}
          <StatusIndicator 
            lastUpdated={lastUpdated}
            isLoading={isLoading}
            className="sm:hidden"
          />
        </div>

        {/* Streak Tabs and Content */}
        <StreakTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          winningCount={counts.winning}
          drawingCount={counts.drawing}
        >
          {/* Results */}
          {filteredTeams.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2" data-testid="text-no-results">
                  No teams found
                </h3>
                <p className="text-muted-foreground">
                  No teams are currently on {activeTab} streaks matching your filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedTeams).map(([leagueId, leagueTeams]) => {
                if (leagueTeams.length === 0) return null;
                
                return (
                  <div key={leagueId} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {leagueTeams.map(team => (
                        <TeamCard 
                          key={team.id} 
                          team={team}
                          className="w-full"
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </StreakTabs>
      </main>
    </div>
  );
}