export function getDayRangeISO(dayISO?: string) {
  const base = dayISO ? new Date(dayISO + "T00:00:00") : new Date();

  const start = new Date(base);
  start.setHours(0, 0, 0, 0);

  const end = new Date(base);
  end.setHours(23, 59, 59, 999);

  return { startISO: start.toISOString(), endISO: end.toISOString() };
}
