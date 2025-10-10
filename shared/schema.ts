import { z } from "zod";
import bulgariaFirstLeague from "@assets/Efbet_Bulgaria Liga_logo_1759315488379.png";
import chilePrimeraDiv from "@assets/Chile Primera Liga Itau logo_1759315488379.png";
import chilePrimeraB from "@assets/Chile Liga Ascenso Caixun logo_1759315488377.png";
import moroccoBotola from "@assets/Morocco Botola Pro logo_1759315488379.png";
import peruLiga1 from "@assets/Peru Liga 1 logo_1759315488379.png";
import polandEkstraklasa from "@assets/Poland Ekstraklasa logo_1759315488379.png";
import romaniaSuperLiga from "@assets/Romania SuperLiga_logo_1759315488379.png";
import serbiaSuperLiga from "@assets/Serbia_Mozzart_Bet_SuperLiga_1759315488379.png";
import slovakiaFortuna from "@assets/Slovakia Nike-liga-logo_1759315488380.png";
import sloveniaPrvaLiga from "@assets/Slovenian_PrvaLiga_logo_1759315488380.png";
import switzerlandSuper from "@assets/Switzerland Superleague logo_1759315488380.png";
import switzerlandChallenge from "@assets/Switzerland Challenge_League_1759315488380.png";
import turkeyLig1 from "@assets/Turkey 1.Lig_logo_1759315488380.png";

// Match result type
export type MatchResult = 'W' | 'D' | 'L';

// League definitions
export const LEAGUES = {
  // Argentina
  'primera-division-arg': { name: 'Primera División', country: 'Argentina', flag: '🇦🇷', logoUrl: '/src/assets/leagues/primera-division-arg.png' },
  'primera-nacional': { name: 'Primera Nacional', country: 'Argentina', flag: '🇦🇷' },
  
  // Belgium
  'jupiter-pro-league': { name: 'Jupiter Pro League', country: 'Belgium', flag: '🇧🇪', logoUrl: '/src/assets/leagues/jupiter-pro-league.png' },
  'pro-league-b': { name: 'Challenger Pro League', country: 'Belgium', flag: '🇧🇪', logoUrl: '/src/assets/leagues/challenger-pro-league.png' },
  
  // Brazil
  'serie-a-bra': { name: 'Série A', country: 'Brazil', flag: '🇧🇷', logoUrl: '/src/assets/leagues/serie-a-bra.png' },
  'serie-b-bra': { name: 'Série B', country: 'Brazil', flag: '🇧🇷', logoUrl: '/src/assets/leagues/serie-b-bra.png' },
  
  // Bulgaria
  'first-league-bgr': { name: 'First League', country: 'Bulgaria', flag: '🇧🇬', logoUrl: bulgariaFirstLeague },
  
  // Chile
  'primera-division-chl': { name: 'Primera División', country: 'Chile', flag: '🇨🇱', logoUrl: chilePrimeraDiv },
  'primera-b-chl': { name: 'Primera B', country: 'Chile', flag: '🇨🇱', logoUrl: chilePrimeraB },
  
  // China
  'super-league-chn': { name: 'Super League', country: 'China', flag: '🇨🇳' },
  'league-one-chn': { name: 'League One', country: 'China', flag: '🇨🇳' },
  
  // Colombia
  'primera-a-col': { name: 'Primera A', country: 'Colombia', flag: '🇨🇴' },
  'primera-b-col': { name: 'Primera B', country: 'Colombia', flag: '🇨🇴' },
  
  // Czech Republic
  'first-league-cze': { name: 'First League', country: 'Czech Republic', flag: '🇨🇿' },
  
  // Denmark
  'superliga-dnk': { name: 'Superliga', country: 'Denmark', flag: '🇩🇰' },
  'first-division-dnk': { name: '1st Division', country: 'Denmark', flag: '🇩🇰' },
  
  // England
  'premier-league': { name: 'Premier League', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', logoUrl: '/src/assets/leagues/premier-league.png' },
  'championship-eng': { name: 'Championship', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', logoUrl: '/src/assets/leagues/championship-eng.png' },
  
  // France
  'ligue-1': { name: 'Ligue 1', country: 'France', flag: '🇫🇷', logoUrl: '/src/assets/leagues/ligue-1.png' },
  'ligue-2': { name: 'Ligue 2', country: 'France', flag: '🇫🇷', logoUrl: '/src/assets/leagues/ligue-2.png' },
  
  // Germany
  'bundesliga': { name: 'Bundesliga', country: 'Germany', flag: '🇩🇪', logoUrl: '/src/assets/leagues/bundesliga.png' },
  'bundesliga-2': { name: '2. Bundesliga', country: 'Germany', flag: '🇩🇪', logoUrl: '/src/assets/leagues/bundesliga-2.png' },
  
  // Ireland
  'premier-division-irl': { name: 'Premier Division', country: 'Ireland', flag: '🇮🇪' },
  'first-division-irl': { name: 'First Division', country: 'Ireland', flag: '🇮🇪' },
  
  // Italy
  'serie-a': { name: 'Serie A', country: 'Italy', flag: '🇮🇹', logoUrl: '/src/assets/leagues/serie-a.png' },
  'serie-b': { name: 'Serie B', country: 'Italy', flag: '🇮🇹', logoUrl: '/src/assets/leagues/serie-b.png' },
  
  // Japan
  'j1-league': { name: 'J1 League', country: 'Japan', flag: '🇯🇵' },
  'j2-league': { name: 'J2 League', country: 'Japan', flag: '🇯🇵' },
  
  // Mexico
  'liga-mx': { name: 'Liga MX', country: 'Mexico', flag: '🇲🇽' },
  'liga-expansion-mx': { name: 'Liga de Expansión MX', country: 'Mexico', flag: '🇲🇽' },
  
  // Morocco
  'botola': { name: 'Botola', country: 'Morocco', flag: '🇲🇦', logoUrl: moroccoBotola },
  
  // Netherlands
  'eredivisie': { name: 'Eredivisie', country: 'Netherlands', flag: '🇳🇱', logoUrl: '/src/assets/leagues/eredivisie.png' },
  'eerste-divisie': { name: 'Eerste Divisie', country: 'Netherlands', flag: '🇳🇱', logoUrl: '/src/assets/leagues/eerste-divisie.png' },
  
  // North America
  'mls': { name: 'MLS', country: 'North America', flag: '🇺🇸', logoUrl: '/src/assets/leagues/mls.png' },
  
  // Norway
  'eliteserien': { name: 'Eliteserien', country: 'Norway', flag: '🇳🇴' },
  'obos-ligaen': { name: 'OBOS-ligaen', country: 'Norway', flag: '🇳🇴' },
  
  // Peru
  'liga-1-per': { name: 'Liga 1', country: 'Peru', flag: '🇵🇪', logoUrl: peruLiga1 },
  
  // Poland
  'ekstraklasa': { name: 'Ekstraklasa', country: 'Poland', flag: '🇵🇱', logoUrl: polandEkstraklasa },
  
  // Portugal
  'liga-portugal': { name: 'Liga Portugal', country: 'Portugal', flag: '🇵🇹', logoUrl: '/src/assets/leagues/liga-portugal.png' },
  
  // Romania
  'liga-1-rou': { name: 'Liga I', country: 'Romania', flag: '🇷🇴', logoUrl: romaniaSuperLiga },
  
  // Scotland
  'premiership-sct': { name: 'Premiership', country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  'championship': { name: 'Championship', country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', logoUrl: '/src/assets/leagues/championship.png' },
  
  // Serbia
  'superliga-srb': { name: 'SuperLiga', country: 'Serbia', flag: '🇷🇸', logoUrl: serbiaSuperLiga },
  
  // Slovakia
  'fortuna-liga': { name: 'Fortuna Liga', country: 'Slovakia', flag: '🇸🇰', logoUrl: slovakiaFortuna },
  
  // Slovenia
  'prva-liga': { name: 'PrvaLiga', country: 'Slovenia', flag: '🇸🇮', logoUrl: sloveniaPrvaLiga },
  
  // South Korea
  'k-league-1': { name: 'K League 1', country: 'South Korea', flag: '🇰🇷' },
  'k-league-2': { name: 'K League 2', country: 'South Korea', flag: '🇰🇷' },
  
  // Spain
  'la-liga': { name: 'La Liga', country: 'Spain', flag: '🇪🇸', logoUrl: '/src/assets/leagues/la-liga.png' },
  'segunda-division': { name: 'Segunda División', country: 'Spain', flag: '🇪🇸', logoUrl: '/src/assets/leagues/segunda-division.png' },
  
  // Sweden
  'allsvenskan': { name: 'Allsvenskan', country: 'Sweden', flag: '🇸🇪' },
  'superettan': { name: 'Superettan', country: 'Sweden', flag: '🇸🇪' },
  
  // Switzerland
  'super-league-che': { name: 'Super League', country: 'Switzerland', flag: '🇨🇭', logoUrl: switzerlandSuper },
  'challenge-league': { name: 'Challenge League', country: 'Switzerland', flag: '🇨🇭', logoUrl: switzerlandChallenge },
  
  // Turkey
  'super-lig': { name: 'Süper Lig', country: 'Turkey', flag: '🇹🇷', logoUrl: '/src/assets/leagues/super-lig.png' },
  'lig-1': { name: '1. Lig', country: 'Turkey', flag: '🇹🇷', logoUrl: turkeyLig1 },
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
  twoOrMoreGoals: z.number().optional(), // Player to score 2 or more goals
});

// Next fixture schema
export const nextFixtureSchema = z.object({
  opponent: z.string(),
  date: z.string(), // ISO format
  venue: z.string(),
  isHome: z.boolean(), // Whether the team/player's team is hosting
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
    isHome: z.boolean(), // Whether the team played at home
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
    isHome: z.boolean(), // Whether the player's team played at home
  })),
  totalGoals: z.number(),
  nextFixture: nextFixtureSchema,
  favoriteVictim: z.object({
    teamName: z.string(),
    goalsScored: z.number(), // Total goals scored against this team historically
  }).optional(),
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