import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export function formatDate(isoDateString: string): string {
  try {
    const date = parseISO(isoDateString);
    return format(date, 'd MMM yyyy');
  } catch {
    return 'TBD';
  }
}

export function formatFixtureDateTime(isoDateString: string) {
  try {
    const date = parseISO(isoDateString);
    const madridTime = toZonedTime(date, 'Europe/Madrid');
    const formattedDate = format(madridTime, 'd MMM yyyy');
    const formattedTime = format(madridTime, 'HH:mm');
    return { date: formattedDate, time: formattedTime };
  } catch {
    return { date: 'TBD', time: 'TBD' };
  }
}

export function formatOdds(odds: number): string {
  return odds.toFixed(2);
}

export function getBookmakerUrl(bookmakerName: string): string {
  const bookmakerUrls: Record<string, string> = {
    'Bet365': 'https://www.bet365.com',
    'William Hill': 'https://www.williamhill.com',
    'Betfair': 'https://www.betfair.com',
    'Sisal': 'https://www.sisal.it',
    'Tipico': 'https://www.tipico.com',
    'PMU': 'https://www.pmu.fr',
    'Fortuna': 'https://www.ifortuna.sk',
    'Superbet': 'https://www.superbet.ro',
    'Mozzart': 'https://www.mozzartbet.rs',
    'Credit Suisse': 'https://www.credit-suisse.com',
    'Itau': 'https://www.itau.cl',
  };
  
  return bookmakerUrls[bookmakerName] || '#';
}

export function capitalizeTeamName(name: string): string {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function shortenTeamName(name: string): string {
  const shortenings: Record<string, string> = {
    'paris-saint-germain': 'PSG',
    'paris saint-germain': 'PSG',
    'paris saint germain': 'PSG',
    'manchester-city': 'Man. City',
    'manchester city': 'Man. City',
    'manchester-united': 'Man. United',
    'manchester united': 'Man. United',
    'newcastle-united': 'Newcastle Utd',
    'newcastle united': 'Newcastle Utd',
    'atletico-madrid': 'Atletico Madrid',
    'atletico madrid': 'Atletico Madrid',
    'bayern-munich': 'Bayern Munich',
    'bayern munich': 'Bayern Munich',
    'borussia-dortmund': 'Borussia Dortmund',
    'borussia dortmund': 'Borussia Dortmund',
    'real-madrid': 'Real Madrid',
    'real madrid': 'Real Madrid',
    'tottenham-hotspur': 'Tottenham',
    'tottenham hotspur': 'Tottenham',
    'brighton-and-hove-albion': 'Brighton',
    'brighton and hove albion': 'Brighton',
    'wolverhampton-wanderers': 'Wolves',
    'wolverhampton wanderers': 'Wolves',
    'west-ham-united': 'West Ham',
    'west ham united': 'West Ham',
    'nottingham-forest': 'Nottm Forest',
    'nottingham forest': 'Nottm Forest',
  };
  
  const normalized = name.toLowerCase();
  return shortenings[normalized] || capitalizeTeamName(name);
}

export function formatNextFixture(homeTeam: string, awayTeam: string): string {
  return `${shortenTeamName(homeTeam)} vs. ${shortenTeamName(awayTeam)}`;
}
