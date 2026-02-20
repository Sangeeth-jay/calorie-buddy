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



export const formatToLocalDateStr = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};