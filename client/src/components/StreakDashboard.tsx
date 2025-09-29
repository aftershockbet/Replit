import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TeamCard from "./TeamCard";
import PlayerCard from "./PlayerCard";
import SearchBar from "./SearchBar";
import LeagueFilter from "./LeagueFilter";
import StreakTabs from "./StreakTabs";
import StatusIndicator from "./StatusIndicator";
import ThemeToggle from "./ThemeToggle";
import { type TeamWithStreak, type PlayerWithStreak, type LeagueId, type StreakType } from "@shared/schema";
import { AlertCircle } from "lucide-react";

interface StreakDashboardProps {
  teams: TeamWithStreak[];
  players?: PlayerWithStreak[];
  lastUpdated: Date;
  isLoading?: boolean;
  className?: string;
}

export default function StreakDashboard({ 
  teams, 
  players = [], 
  lastUpdated, 
  isLoading = false, 
  className 
}: StreakDashboardProps) {
  const [activeTab, setActiveTab] = useState<StreakType>('winning');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeagues, setSelectedLeagues] = useState<LeagueId[]>([]);

  // Filter teams based on current filters
  const filteredTeams = useMemo(() => {
    if (activeTab === 'goalscorers') return [];
    
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
  
  // Filter players based on current filters
  const filteredPlayers = useMemo(() => {
    if (activeTab !== 'goalscorers') return [];
    
    return players.filter(player => {
      // Filter by search query
      if (searchQuery && !player.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !player.clubName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by selected leagues
      if (selectedLeagues.length > 0 && !selectedLeagues.includes(player.leagueId)) {
        return false;
      }
      
      return true;
    });
  }, [players, activeTab, searchQuery, selectedLeagues]);

  // Count teams and players by streak type
  const counts = useMemo(() => {
    return {
      winning: teams.filter(t => t.streakType === 'winning').length,
      drawing: teams.filter(t => t.streakType === 'drawing').length,
      goalscorers: players.length,
    };
  }, [teams, players]);

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
  
  // Group players by league for better organization
  const groupedPlayers = useMemo(() => {
    const groups: Record<string, PlayerWithStreak[]> = {};
    filteredPlayers.forEach(player => {
      if (!groups[player.leagueId]) {
        groups[player.leagueId] = [];
      }
      groups[player.leagueId].push(player);
    });
    return groups;
  }, [filteredPlayers]);

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
          goalscorersCount={counts.goalscorers}
        >
          {/* Results */}
          {activeTab === 'goalscorers' ? (
            // Goalscorer Results
            filteredPlayers.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2" data-testid="text-no-results">
                    No goalscorers found
                  </h3>
                  <p className="text-muted-foreground">
                    No players are currently on scoring streaks matching your filters.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedPlayers).map(([leagueId, leaguePlayers]) => {
                  if (leaguePlayers.length === 0) return null;
                  
                  return (
                    <div key={leagueId} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {leaguePlayers.map(player => (
                          <PlayerCard 
                            key={player.id} 
                            player={player}
                            className="w-full"
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            // Team Results
            filteredTeams.length === 0 ? (
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
            )
          )}
        </StreakTabs>
      </main>
    </div>
  );
}