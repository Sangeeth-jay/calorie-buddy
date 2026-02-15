// Calendar constants
export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Get week dates for a specific offset
export function getWeekDates(weeksAgo: number) {
  const today = new Date();
  today.setDate(today.getDate() - weeksAgo * 7);
  const currentDay = today.getDay();
  const week = [];

  const todayISO = new Date().toISOString().slice(0, 10);

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - currentDay + i);
    const dateISO = date.toISOString().slice(0, 10);

    week.push({
      date: date.getDate(),
      dayName: DAY_NAMES[i],
      fullDate: date,
      dateISO: dateISO,
      isFuture: dateISO > todayISO,
    });
  }
  return week;
}

// Get the display month for a week (uses middle day)
export function getWeekMonthName(weekDates: any[]) {
  return MONTH_NAMES[weekDates[3].fullDate.getMonth()];
}