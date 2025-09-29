import StreakDashboard from '../StreakDashboard';
import { type TeamWithStreak } from '@shared/schema';

export default function StreakDashboardExample() {
  // todo: remove mock functionality
  const mockTeams: TeamWithStreak[] = [
    {
      id: 'man-city',
      name: 'Manchester City',
      leagueId: 'premier-league',
      recentMatches: [
        { date: '2024-01-15', result: 'W', opponent: 'Chelsea' },
        { date: '2024-01-10', result: 'W', opponent: 'Arsenal' },
        { date: '2024-01-05', result: 'W', opponent: 'Liverpool' },
        { date: '2024-01-01', result: 'W', opponent: 'Tottenham' },
        { date: '2023-12-28', result: 'W', opponent: 'Newcastle' },
        { date: '2023-12-23', result: 'W', opponent: 'Brighton' },
      ],
      nextFixture: {
        opponent: 'Wolves',
        date: '2024-01-22T15:00:00Z',
        venue: 'Etihad Stadium',
        odds: {
          bookmaker: 'Bet365',
          win: 1.35,
          draw: 5.20,
          loss: 8.50,
        },
      },
      streakPattern: 'W-W-W-W-W',
      streakType: 'winning',
      streakDescription: '5 consecutive wins',
    },
    {
      id: 'arsenal',
      name: 'Arsenal',
      leagueId: 'premier-league',
      recentMatches: [
        { date: '2024-01-15', result: 'W', opponent: 'West Ham' },
        { date: '2024-01-10', result: 'W', opponent: 'Crystal Palace' },
        { date: '2024-01-05', result: 'W', opponent: 'Brighton' },
        { date: '2024-01-01', result: 'D', opponent: 'Liverpool' },
        { date: '2023-12-28', result: 'W', opponent: 'Luton' },
        { date: '2023-12-23', result: 'W', opponent: 'Brighton' },
      ],
      nextFixture: {
        opponent: 'Burnley',
        date: '2024-01-23T20:00:00Z',
        venue: 'Emirates Stadium',
        odds: {
          bookmaker: 'William Hill',
          win: 1.22,
          draw: 6.75,
          loss: 12.00,
        },
      },
      streakPattern: 'W-W-W-D-W',
      streakType: 'winning',
      streakDescription: '3 wins, preceded by draw, preceded by win',
    },
    {
      id: 'real-madrid',
      name: 'Real Madrid',
      leagueId: 'la-liga',
      recentMatches: [
        { date: '2024-01-15', result: 'W', opponent: 'Barcelona' },
        { date: '2024-01-10', result: 'W', opponent: 'Atletico' },
        { date: '2024-01-05', result: 'W', opponent: 'Sevilla' },
        { date: '2024-01-01', result: 'W', opponent: 'Valencia' },
        { date: '2023-12-28', result: 'D', opponent: 'Getafe' },
        { date: '2023-12-23', result: 'W', opponent: 'Alaves' },
      ],
      nextFixture: {
        opponent: 'Athletic Bilbao',
        date: '2024-01-21T21:00:00Z',
        venue: 'Santiago Bernabéu',
        odds: {
          bookmaker: 'Betfair',
          win: 1.45,
          draw: 4.80,
          loss: 6.25,
        },
      },
      streakPattern: 'W-W-W-W-D',
      streakType: 'winning',
      streakDescription: '4 wins preceded by 1 draw',
    },
    {
      id: 'napoli',
      name: 'Napoli',
      leagueId: 'serie-a',
      recentMatches: [
        { date: '2024-01-15', result: 'D', opponent: 'Juventus' },
        { date: '2024-01-10', result: 'D', opponent: 'Inter' },
        { date: '2024-01-05', result: 'D', opponent: 'Milan' },
        { date: '2024-01-01', result: 'D', opponent: 'Roma' },
        { date: '2023-12-28', result: 'D', opponent: 'Lazio' },
        { date: '2023-12-23', result: 'W', opponent: 'Fiorentina' },
      ],
      nextFixture: {
        opponent: 'Bologna',
        date: '2024-01-20T20:45:00Z',
        venue: 'Diego Armando Maradona Stadium',
        odds: {
          bookmaker: 'Sisal',
          win: 2.10,
          draw: 3.40,
          loss: 3.70,
        },
      },
      streakPattern: 'D-D-D-D-D',
      streakType: 'drawing',
      streakDescription: '5 consecutive draws',
    },
    {
      id: 'bayern',
      name: 'Bayern Munich',
      leagueId: 'bundesliga',
      recentMatches: [
        { date: '2024-01-15', result: 'D', opponent: 'Dortmund' },
        { date: '2024-01-10', result: 'D', opponent: 'Leipzig' },
        { date: '2024-01-05', result: 'D', opponent: 'Leverkusen' },
        { date: '2024-01-01', result: 'W', opponent: 'Stuttgart' },
        { date: '2023-12-28', result: 'W', opponent: 'Wolfsburg' },
        { date: '2023-12-23', result: 'L', opponent: 'Frankfurt' },
      ],
      nextFixture: {
        opponent: 'Augsburg',
        date: '2024-01-22T18:30:00Z',
        venue: 'Allianz Arena',
        odds: {
          bookmaker: 'Tipico',
          win: 1.18,
          draw: 7.50,
          loss: 15.00,
        },
      },
      streakPattern: 'D-D-D-W-W',
      streakType: 'drawing',
      streakDescription: '3 draws preceded by 2 wins',
    },
    {
      id: 'psg',
      name: 'Paris Saint-Germain',
      leagueId: 'ligue-1',
      recentMatches: [
        { date: '2024-01-15', result: 'W', opponent: 'Marseille' },
        { date: '2024-01-10', result: 'W', opponent: 'Lyon' },
        { date: '2024-01-05', result: 'W', opponent: 'Monaco' },
        { date: '2024-01-01', result: 'L', opponent: 'Nice' },
        { date: '2023-12-28', result: 'W', opponent: 'Lille' },
        { date: '2023-12-23', result: 'W', opponent: 'Rennes' },
      ],
      nextFixture: {
        opponent: 'Brest',
        date: '2024-01-21T17:00:00Z',
        venue: 'Parc des Princes',
        odds: {
          bookmaker: 'PMU',
          win: 1.28,
          draw: 6.10,
          loss: 11.50,
        },
      },
      streakPattern: 'W-W-W-L',
      streakType: 'winning',
      streakDescription: '3 wins preceded by 1 loss',
    },
  ];

  const lastUpdated = new Date();

  return (
    <StreakDashboard 
      teams={mockTeams}
      lastUpdated={lastUpdated}
      isLoading={false}
    />
  );
}