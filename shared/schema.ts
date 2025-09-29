import { z } from "zod";

// Match result type
export type MatchResult = 'W' | 'D' | 'L';

// League definitions
export const LEAGUES = {
  // Argentina
  'primera-division-arg': { name: 'Primera División', country: 'Argentina', flag: '🇦🇷', logo: '🇦🇷' },
  'primera-nacional': { name: 'Primera Nacional', country: 'Argentina', flag: '🇦🇷', logo: '🇦🇷' },
  
  // Belgium
  'pro-league-b': { name: 'Challenger Pro League', country: 'Belgium', flag: '🇧🇪', logo: '🇧🇪' },
  
  // Brazil
  'serie-a-bra': { name: 'Série A', country: 'Brazil', flag: '🇧🇷', logo: '🇧🇷' },
  'serie-b-bra': { name: 'Série B', country: 'Brazil', flag: '🇧🇷', logo: '🇧🇷' },
  
  // Bulgaria
  'first-league-bgr': { name: 'First League', country: 'Bulgaria', flag: '🇧🇬', logo: '🇧🇬' },
  
  // Chile
  'primera-division-chl': { name: 'Primera División', country: 'Chile', flag: '🇨🇱', logo: '🇨🇱' },
  'primera-b-chl': { name: 'Primera B', country: 'Chile', flag: '🇨🇱', logo: '🇨🇱' },
  
  // China
  'super-league-chn': { name: 'Super League', country: 'China', flag: '🇨🇳', logo: '🇨🇳' },
  'league-one-chn': { name: 'League One', country: 'China', flag: '🇨🇳', logo: '🇨🇳' },
  
  // Colombia
  'primera-a-col': { name: 'Categoría Primera A', country: 'Colombia', flag: '🇨🇴', logo: '🇨🇴' },
  'primera-b-col': { name: 'Categoría Primera B', country: 'Colombia', flag: '🇨🇴', logo: '🇨🇴' },
  
  // Czech Republic
  'first-league-cze': { name: 'First League', country: 'Czech Republic', flag: '🇨🇿', logo: '🇨🇿' },
  
  // Denmark
  'superliga-dnk': { name: 'Superliga', country: 'Denmark', flag: '🇩🇰', logo: '🇩🇰' },
  'first-division-dnk': { name: '1st Division', country: 'Denmark', flag: '🇩🇰', logo: '🇩🇰' },
  
  // England
  'premier-league': { name: 'Premier League', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  
  // France
  'ligue-1': { name: 'Ligue 1', country: 'France', flag: '🇫🇷', logo: '🇫🇷' },
  'ligue-2': { name: 'Ligue 2', country: 'France', flag: '🇫🇷', logo: '🇫🇷' },
  
  // Germany
  'bundesliga': { name: 'Bundesliga', country: 'Germany', flag: '🇩🇪', logo: '🇩🇪' },
  'bundesliga-2': { name: '2. Bundesliga', country: 'Germany', flag: '🇩🇪', logo: '🇩🇪' },
  
  // Ireland
  'premier-division-irl': { name: 'Premier Division', country: 'Ireland', flag: '🇮🇪', logo: '🇮🇪' },
  'first-division-irl': { name: 'First Division', country: 'Ireland', flag: '🇮🇪', logo: '🇮🇪' },
  
  // Italy
  'serie-a': { name: 'Serie A', country: 'Italy', flag: '🇮🇹', logo: '🇮🇹' },
  'serie-b': { name: 'Serie B', country: 'Italy', flag: '🇮🇹', logo: '🇮🇹' },
  
  // Japan
  'j1-league': { name: 'J1 League', country: 'Japan', flag: '🇯🇵', logo: '🇯🇵' },
  'j2-league': { name: 'J2 League', country: 'Japan', flag: '🇯🇵', logo: '🇯🇵' },
  
  // Mexico
  'liga-mx': { name: 'Liga MX', country: 'Mexico', flag: '🇲🇽', logo: '🇲🇽' },
  'liga-expansion-mx': { name: 'Liga de Expansión MX', country: 'Mexico', flag: '🇲🇽', logo: '🇲🇽' },
  
  // Morocco
  'botola': { name: 'Botola', country: 'Morocco', flag: '🇲🇦', logo: '🇲🇦' },
  
  // Netherlands
  'eredivisie': { name: 'Eredivisie', country: 'Netherlands', flag: '🇳🇱', logo: '🇳🇱' },
  'eerste-divisie': { name: 'Eerste Divisie', country: 'Netherlands', flag: '🇳🇱', logo: '🇳🇱' },
  
  // North America
  'mls': { name: 'MLS', country: 'North America', flag: '🇺🇸', logo: '🇺🇸' },
  
  // Norway
  'eliteserien': { name: 'Eliteserien', country: 'Norway', flag: '🇳🇴', logo: '🇳🇴' },
  'obos-ligaen': { name: 'OBOS-ligaen', country: 'Norway', flag: '🇳🇴', logo: '🇳🇴' },
  
  // Peru
  'liga-1-per': { name: 'Liga 1', country: 'Peru', flag: '🇵🇪', logo: '🇵🇪' },
  
  // Poland
  'ekstraklasa': { name: 'Ekstraklasa', country: 'Poland', flag: '🇵🇱', logo: '🇵🇱' },
  
  // Portugal
  'liga-portugal': { name: 'Liga Portugal', country: 'Portugal', flag: '🇵🇹', logo: '🇵🇹' },
  
  // Romania
  'liga-1-rou': { name: 'Liga I', country: 'Romania', flag: '🇷🇴', logo: '🇷🇴' },
  
  // Scotland
  'premiership-sct': { name: 'Premiership', country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', logo: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  'championship': { name: 'Championship', country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', logo: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  
  // Serbia
  'superliga-srb': { name: 'SuperLiga', country: 'Serbia', flag: '🇷🇸', logo: '🇷🇸' },
  
  // Slovakia
  'fortuna-liga': { name: 'Fortuna Liga', country: 'Slovakia', flag: '🇸🇰', logo: '🇸🇰' },
  
  // Slovenia
  'prva-liga': { name: 'PrvaLiga', country: 'Slovenia', flag: '🇸🇮', logo: '🇸🇮' },
  
  // South Korea
  'k-league-1': { name: 'K League 1', country: 'South Korea', flag: '🇰🇷', logo: '🇰🇷' },
  'k-league-2': { name: 'K League 2', country: 'South Korea', flag: '🇰🇷', logo: '🇰🇷' },
  
  // Spain
  'la-liga': { name: 'La Liga', country: 'Spain', flag: '🇪🇸', logo: '🇪🇸' },
  'segunda-division': { name: 'Segunda División', country: 'Spain', flag: '🇪🇸', logo: '🇪🇸' },
  
  // Sweden
  'allsvenskan': { name: 'Allsvenskan', country: 'Sweden', flag: '🇸🇪', logo: '🇸🇪' },
  'superettan': { name: 'Superettan', country: 'Sweden', flag: '🇸🇪', logo: '🇸🇪' },
  
  // Switzerland
  'super-league-che': { name: 'Super League', country: 'Switzerland', flag: '🇨🇭', logo: '🇨🇭' },
  'challenge-league': { name: 'Challenge League', country: 'Switzerland', flag: '🇨🇭', logo: '🇨🇭' },
  
  // Turkey
  'super-lig': { name: 'Süper Lig', country: 'Turkey', flag: '🇹🇷', logo: '🇹🇷' },
  'lig-1': { name: '1. Lig', country: 'Turkey', flag: '🇹🇷', logo: '🇹🇷' },
} as const;

export type LeagueId = keyof typeof LEAGUES;

// Betting odds schema
export const bettingOddsSchema = z.object({
  bookmaker: z.string(),
  win: z.number(),
  draw: z.number(),
  loss: z.number(),
  doubleChance1X: z.number().optional(), // Home win or draw
  doubleChance12: z.number().optional(), // Home win or away win
  doubleChanceX2: z.number().optional(), // Draw or away win
  firstGoalscorer: z.number().optional(),
  anytimeGoalscorer: z.number().optional(),
});

// Next fixture schema
export const nextFixtureSchema = z.object({
  opponent: z.string(),
  date: z.string(), // ISO format
  venue: z.string(),
  odds: bettingOddsSchema,
});

// Team schema
export const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  leagueId: z.string() as z.ZodType<LeagueId>,
  recentMatches: z.array(z.object({
    date: z.string(),
    result: z.enum(['W', 'D', 'L']) as z.ZodType<MatchResult>,
    opponent: z.string(),
    score: z.string().optional(), // e.g., "2-1", "1-1", "0-2"
  })).length(6),
  nextFixture: nextFixtureSchema,
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
export type StreakType = 'winning' | 'drawing' | 'goalscorers';

// Player position type
export type PlayerPosition = 'DEF' | 'MID' | 'FWD';

// Player schema for goalscorer streaks
export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  clubName: z.string(),
  clubLogo: z.string(), // URL or icon
  leagueId: z.string() as z.ZodType<LeagueId>,
  position: z.enum(['DEF', 'MID', 'FWD']) as z.ZodType<PlayerPosition>,
  photoUrl: z.string(),
  consecutiveGoals: z.array(z.object({
    date: z.string(),
    opponent: z.string(),
    goals: z.number(),
  })),
  totalGoals: z.number(),
  nextFixture: nextFixtureSchema,
});

// Team with detected streak
export const teamWithStreakSchema = teamSchema.extend({
  streakPattern: z.string() as z.ZodType<StreakPattern>,
  streakType: z.enum(['winning', 'drawing']) as z.ZodType<StreakType>,
  streakDescription: z.string(),
});

// Player with goalscorer streak
export const playerWithStreakSchema = playerSchema.extend({
  streakDescription: z.string(),
  streakLength: z.number(),
});

export type Team = z.infer<typeof teamSchema>;
export type TeamWithStreak = z.infer<typeof teamWithStreakSchema>;
export type Player = z.infer<typeof playerSchema>;
export type PlayerWithStreak = z.infer<typeof playerWithStreakSchema>;
export type BettingOdds = z.infer<typeof bettingOddsSchema>;
export type NextFixture = z.infer<typeof nextFixtureSchema>;