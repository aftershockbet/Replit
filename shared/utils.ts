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
