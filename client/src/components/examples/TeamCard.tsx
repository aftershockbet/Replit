import TeamCard from '../TeamCard';
import { type TeamWithStreak } from '@shared/schema';

export default function TeamCardExample() {
  // todo: remove mock functionality
  const mockTeam: TeamWithStreak = {
    id: 'man-city',
    name: 'Manchester City',
    leagueId: 'premier-league',
    recentMatches: [
      { date: '2024-01-15', result: 'W', opponent: 'Chelsea' },
      { date: '2024-01-10', result: 'W', opponent: 'Arsenal' },
      { date: '2024-01-05', result: 'W', opponent: 'Liverpool' },
      { date: '2024-01-01', result: 'D', opponent: 'Tottenham' },
      { date: '2023-12-28', result: 'W', opponent: 'Newcastle' },
      { date: '2023-12-23', result: 'W', opponent: 'Brighton' },
    ],
    streakPattern: 'W-W-W-D-W',
    streakType: 'winning',
    streakDescription: '3 wins, preceded by draw, preceded by win',
  };

  return (
    <div className="max-w-md">
      <TeamCard team={mockTeam} />
    </div>
  );
}