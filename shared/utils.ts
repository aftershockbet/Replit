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
