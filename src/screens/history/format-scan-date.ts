import type { Translations } from '@/i18n';

const formatters = new Map<string, { time: Intl.DateTimeFormat; date: Intl.DateTimeFormat }>();

function getFormatters(locale: string) {
  let entry = formatters.get(locale);
  if (!entry) {
    entry = {
      time: new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }),
      date: new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }),
    };
    formatters.set(locale, entry);
  }
  return entry;
}

/** "Hoje, 14:32" / "Today, 02:32 PM", "Ontem, 09:05", or a full date for older scans. */
export function formatScanDate(timestamp: number, t: Translations, now = new Date()) {
  const { time, date } = getFormatters(t.locale);
  const scannedAt = new Date(timestamp);
  const clock = time.format(scannedAt);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  if (scannedAt >= startOfToday) return `${t.history.today}, ${clock}`;
  if (scannedAt >= startOfYesterday) return `${t.history.yesterday}, ${clock}`;
  return `${date.format(scannedAt)}, ${clock}`;
}
