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
    console.log('League toggled:', leagueId); // todo: remove mock functionality
  };

  const handleClearAll = () => {
    onClearAll();
    console.log('All leagues cleared'); // todo: remove mock functionality
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
          {Object.entries(LEAGUES)
            .sort((a, b) => {
              // Sort by country first, then by league name
              const countryCompare = a[1].country.localeCompare(b[1].country);
              if (countryCompare !== 0) return countryCompare;
              return a[1].name.localeCompare(b[1].name);
            })
            .map(([leagueId, league]) => (
              <DropdownMenuCheckboxItem
                key={leagueId}
                checked={selectedLeagues.includes(leagueId as LeagueId)}
                onCheckedChange={() => handleLeagueToggle(leagueId as LeagueId)}
                data-testid={`checkbox-league-${leagueId}`}
              >
                <span className="mr-2">{league.flag}</span>
                {league.name}
              </DropdownMenuCheckboxItem>
            ))}
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