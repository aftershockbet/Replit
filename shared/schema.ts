import { z } from "zod";

// Match result type
export type MatchResult = 'W' | 'D' | 'L';

// League definitions
export const LEAGUES = {
  'premier-league': { name: 'Premier League', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  'la-liga': { name: 'La Liga', country: 'Spain', flag: '🇪🇸' },
  'serie-a': { name: 'Serie A', country: 'Italy', flag: '🇮🇹' },
  'bundesliga': { name: 'Bundesliga', country: 'Germany', flag: '🇩🇪' },
  'ligue-1': { name: 'Ligue 1', country: 'France', flag: '🇫🇷' },
  'liga-portugal': { name: 'Liga Portugal', country: 'Portugal', flag: '🇵🇹' },
  'eredivisie': { name: 'Eredivisie', country: 'Netherlands', flag: '🇳🇱' },
  'mls': { name: 'MLS', country: 'North America', flag: '🇺🇸' },
} as const;

export type LeagueId = keyof typeof LEAGUES;

// Team schema
export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  leagueId: z.string() as z.ZodType<LeagueId>,
  recentMatches: z.array(z.object({
    date: z.string(),
    result: z.enum(['W', 'D', 'L']) as z.ZodType<MatchResult>,
    opponent: z.string(),
  })).length(6),
});

// Streak pattern definitions
export const STREAK_PATTERNS = {
  // Winning streaks
  'W-W-W-W-W': { id: '1.1', description: '5 consecutive wins', type: 'winning', priority: 1 },
  'W-W-W-W-D': { id: '1.2', description: '4 wins preceded by 1 draw', type: 'winning', priority: 2 },
  'W-W-W-W-L': { id: '1.3', description: '4 wins preceded by 1 loss', type: 'winning', priority: 3 },
  'W-W-W-D-D': { id: '1.4', description: '3 wins preceded by 2 draws', type: 'winning', priority: 4 },
  'W-W-W-L-L': { id: '1.5', description: '3 wins preceded by 2 losses', type: 'winning', priority: 5 },
  'W-W-W-D-W': { id: '1.6', description: '3 wins, preceded by draw, preceded by win', type: 'winning', priority: 6 },
  'W-W-W-D-L': { id: '1.7', description: '3 wins, preceded by draw, preceded by loss', type: 'winning', priority: 7 },
  'W-W-W-L-D': { id: '1.8', description: '3 wins, preceded by loss, preceded by draw', type: 'winning', priority: 8 },
  'W-W-W-W': { id: '1.9', description: '4 consecutive wins', type: 'winning', priority: 9 },
  'W-W-W-L': { id: '1.10', description: '3 wins preceded by 1 loss', type: 'winning', priority: 10 },
  'W-W-W-D': { id: '1.11', description: '3 wins preceded by 1 draw', type: 'winning', priority: 11 },
  'W-W-W': { id: '1.12', description: '3 consecutive wins', type: 'winning', priority: 12 },
  
  // Drawing streaks
  'D-D-D-D-D-D': { id: '2.1', description: '6 consecutive draws', type: 'drawing', priority: 1 },
  'D-D-D-D-D': { id: '2.2', description: '5 consecutive draws', type: 'drawing', priority: 2 },
  'D-D-D-D': { id: '2.3', description: '4 consecutive draws', type: 'drawing', priority: 3 },
  'D-D-D': { id: '2.4', description: '3 consecutive draws', type: 'drawing', priority: 4 },
  'D-D-D-D-W': { id: '2.5', description: '4 draws preceded by 1 win', type: 'drawing', priority: 5 },
  'D-D-D-D-L': { id: '2.6', description: '4 draws preceded by 1 loss', type: 'drawing', priority: 6 },
  'D-D-D-W-W': { id: '2.7', description: '3 draws preceded by 2 wins', type: 'drawing', priority: 7 },
  'D-D-D-L-L': { id: '2.8', description: '3 draws preceded by 2 losses', type: 'drawing', priority: 8 },
  'D-D-D-L-W': { id: '2.9', description: '3 draws, preceded by loss, preceded by win', type: 'drawing', priority: 9 },
  'D-D-D-W-L': { id: '2.10', description: '3 draws, preceded by win, preceded by loss', type: 'drawing', priority: 10 },
  'D-D-D-W-D': { id: '2.11', description: '3 draws, preceded by win, preceded by draw', type: 'drawing', priority: 11 },
  'D-D-D-L-D': { id: '2.12', description: '3 draws, preceded by loss, preceded by draw', type: 'drawing', priority: 12 },
  'D-D-D-W': { id: '2.13', description: '3 draws preceded by 1 win', type: 'drawing', priority: 13 },
  'D-D-D-L': { id: '2.14', description: '3 draws preceded by 1 loss', type: 'drawing', priority: 14 },
} as const;

export type StreakPattern = keyof typeof STREAK_PATTERNS;
export type StreakType = 'winning' | 'drawing';

// Team with detected streak
export const teamWithStreakSchema = teamSchema.extend({
  streakPattern: z.string() as z.ZodType<StreakPattern>,
  streakType: z.enum(['winning', 'drawing']) as z.ZodType<StreakType>,
  streakDescription: z.string(),
});

export type Team = z.infer<typeof teamSchema>;
export type TeamWithStreak = z.infer<typeof teamWithStreakSchema>;