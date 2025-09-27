import { useState } from 'react';
import LeagueFilter from '../LeagueFilter';
import { type LeagueId } from '@shared/schema';

export default function LeagueFilterExample() {
  const [selectedLeagues, setSelectedLeagues] = useState<LeagueId[]>(['premier-league', 'la-liga']);

  const handleLeagueToggle = (leagueId: LeagueId) => {
    setSelectedLeagues(prev => 
      prev.includes(leagueId)
        ? prev.filter(id => id !== leagueId)
        : [...prev, leagueId]
    );
  };

  const handleClearAll = () => {
    setSelectedLeagues([]);
  };

  return (
    <div className="w-full max-w-md">
      <LeagueFilter 
        selectedLeagues={selectedLeagues}
        onLeagueToggle={handleLeagueToggle}
        onClearAll={handleClearAll}
      />
    </div>
  );
}