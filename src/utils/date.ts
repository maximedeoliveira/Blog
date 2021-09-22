import { DateTime } from 'luxon';

export function formatFromTimestamp(date: string): string {
    const d = DateTime.fromMillis(parseInt(date));

    return `Le ${d.setLocale('fr').toFormat('dd LLLL yyyy à HH:mm')}`;
}
