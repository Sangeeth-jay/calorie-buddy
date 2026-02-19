export const getWeekRange = () => {
  const today = new Date();

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(today);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };

}

export const formatDayLable = (date: Date): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

export const getMonthRange = () => {
  const today = new Date();

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 29);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(today);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };

}

export const formatDateLabel = (date: Date): string => {
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1
  const day = date.getDate();
  return `${month}/${day}`;
};


// ==================== TESTING HELPERS ====================

/**
 * Test function to verify date ranges (remove after testing)
 */
export const testDateRanges = () => {
  console.log('📅 WEEK RANGE (Last 7 days):');
  const { startDate: weekStart, endDate: weekEnd } = getWeekRange();
  console.log('Start:', weekStart.toLocaleDateString());
  console.log('End:', weekEnd.toLocaleDateString());

  // Show all 7 days with labels
  console.log('\nWeek days:');
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    console.log(`${formatDayLable(day)} - ${formatDateLabel(day)}`);
  }

  console.log('\n📅 MONTH RANGE (Last 30 days):');
  const { startDate: monthStart, endDate: monthEnd } = getMonthRange();
  console.log('Start:', monthStart.toLocaleDateString());
  console.log('End:', monthEnd.toLocaleDateString());

  // Show first 5 and last 5 days
  console.log('\nFirst 5 days:');
  for (let i = 0; i < 5; i++) {
    const day = new Date(monthStart);
    day.setDate(monthStart.getDate() + i);
    console.log(formatDateLabel(day));
  }
  console.log('...');
  console.log('Last 5 days:');
  for (let i = 25; i < 30; i++) {
    const day = new Date(monthStart);
    day.setDate(monthStart.getDate() + i);
    console.log(formatDateLabel(day));
  }
};

export const formatToLocalDateStr = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};