import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LEAGUES, type LeagueId } from "@shared/schema";
import { Filter, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LeagueFilterProps {
  selectedLeagues: LeagueId[];
  onLeagueToggle: (leagueId: LeagueId) => void;
  onClearAll: () => void;
  className?: string;
}

export default function LeagueFilter({ 
  selectedLeagues, 
  onLeagueToggle, 
  onClearAll, 
  className 
}: LeagueFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLeagueToggle = (leagueId: LeagueId) => {
    onLeagueToggle(leagueId);
  };

  const handleClearAll = () => {
    onClearAll();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            data-testid="button-league-filter"
          >
            <Filter className="h-4 w-4" />
            Filter by League
            {selectedLeagues.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {selectedLeagues.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56 max-h-96 overflow-y-auto" align="start">
          {(() => {
            // Define the order of top leagues
            const topLeaguesOrder = [
              'premier-league',     // England 1st
              'championship-eng',   // England 2nd
              'ligue-1',           // France 1st
              'ligue-2',           // France 2nd
              'bundesliga',        // Germany 1st
              'bundesliga-2',      // Germany 2nd
              'serie-a',           // Italy 1st
              'serie-b',           // Italy 2nd
              'eredivisie',        // Netherlands 1st
              'eerste-divisie',    // Netherlands 2nd
              'liga-portugal',     // Portugal 1st
              'la-liga',           // Spain 1st
              'segunda-division',  // Spain 2nd
            ];
            
            // Get all league entries
            const allEntries = Object.entries(LEAGUES);
            
            // Separate top leagues from others
            const topLeagues = topLeaguesOrder
              .map(id => allEntries.find(([leagueId]) => leagueId === id))
              .filter((entry): entry is [string, typeof LEAGUES[keyof typeof LEAGUES]] => entry !== undefined);
            
            // Helper function to determine division level
            const getDivisionLevel = (name: string): number => {
              // Check for explicit division indicators
              if (name.includes('Premier') || name.includes('Super') || name.includes('Primera A') || 
                  name.includes('Série A') || name.includes('Liga 1') || name.includes('K League 1') ||
                  name.includes('J1') || name.includes('Ekstraklasa') || name.includes('Allsvenskan') ||
                  name.includes('Eliteserien') || name.includes('Premiership') || name.includes('Liga MX') ||
                  name.includes('Botola') || name.includes('Fortuna Liga') || name.includes('PrvaLiga') ||
                  name.includes('SuperLiga') || name.includes('Süper Lig') || name.includes('Liga I')) {
                return 1; // First division
              }
              if (name.includes('2') || name.includes('Second') || name.includes('Challenge') || 
                  name.includes('Primera B') || name.includes('Nacional') || name.includes('Série B') ||
                  name.includes('League One') || name.includes('1st Division') || name.includes('First Division') ||
                  name.includes('Expansión') || name.includes('Superettan') || name.includes('OBOS') ||
                  name.includes('Championship') || name.includes('1. Lig')) {
                return 2; // Second division
              }
              return 1; // Default to first division if unclear
            };
            
            // Get remaining leagues (not in top leagues)
            const otherLeagues = allEntries
              .filter(([leagueId]) => !topLeaguesOrder.includes(leagueId))
              .sort((a, b) => {
                // Sort alphabetically by country first
                const countryCompare = a[1].country.localeCompare(b[1].country);
                if (countryCompare !== 0) return countryCompare;
                
                // Within same country, sort by division level (1st before 2nd)
                const aDivision = getDivisionLevel(a[1].name);
                const bDivision = getDivisionLevel(b[1].name);
                if (aDivision !== bDivision) return aDivision - bDivision;
                
                // Same division level, sort by name
                return a[1].name.localeCompare(b[1].name);
              });
            
            // Combine top leagues first, then others
            return [...topLeagues, ...otherLeagues].map(([leagueId, league]) => (
              <DropdownMenuCheckboxItem
                key={leagueId}
                checked={selectedLeagues.includes(leagueId as LeagueId)}
                onCheckedChange={() => handleLeagueToggle(leagueId as LeagueId)}
                data-testid={`checkbox-league-${leagueId}`}
              >
                <span className="mr-2">{league.flag}</span>
                {league.name}
              </DropdownMenuCheckboxItem>
            ));
          })()}
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Selected Leagues Display */}
      {selectedLeagues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLeagues.map((leagueId) => {
            const league = LEAGUES[leagueId];
            return (
              <Badge 
                key={leagueId}
                variant="secondary" 
                className="flex items-center gap-1"
                data-testid={`badge-selected-league-${leagueId}`}
              >
                <span>{league.flag}</span>
                <span>{league.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleLeagueToggle(leagueId)}
                  data-testid={`button-remove-league-${leagueId}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="h-6 px-2 text-xs"
            data-testid="button-clear-all-leagues"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}