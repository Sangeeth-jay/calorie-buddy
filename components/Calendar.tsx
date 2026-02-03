import { View, Text, Pressable } from "react-native";
import React from "react";

interface CalenderProps {
  selectedDate: number;
  onSelectDate: (date: number) => void;
}
const Calendar: React.FC<CalenderProps> = ({ selectedDate, onSelectDate }) => {
  // Get current week dates automatically
  const getCurrentWeek = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const week = [];

    // Calculate start of week (Sunday)
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - currentDay + i);
      week.push({
        date: date.getDate(), // Day number (1-31)
        dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i],
        fullDate: date, // Full date object for comparison
      });
    }
    return week;
  };

  // months
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get current month
  const currentMonth = monthNames[new Date().getMonth()];

  const weekDates = getCurrentWeek();
  const today = new Date().getDate();

  // Mock data for days with logs
  const daysWithLogs = [27, 28];

  const getDateStyle = (date: number) => {
    if (date === selectedDate) {
      return "bg-blue-500"; // Selected
    } else if (date === today && date !== selectedDate) {
      return "bg-blue-500"; // Today
    } else if (date < today) {
      // Past days
      if (daysWithLogs.includes(date)) {
        return "bg-blue-200"; // Logged - Light blue
      } else {
        return "bg-yellow-200"; // Missed - Light orange
      }
    } else {
      // Future days
      return "bg-gray-100"; // Neutral gray
    }
  };

  const getTextStyle = (date: number) => {
    if (date === selectedDate || date === today) {
      return "text-blue-500 font-bold";
    } else if (date >= today) {
      return "text-gray-400";
    } else {
      return "text-gray-700";
    }
  };

  return (
    <View className="mb-4 bg-white rounded-xl flex-col gap-2 py-2 ">
      <View className="w-full items-center">
        <Text className="text-blue-950 font-medium">
          {currentMonth}
        </Text>
      </View>
      <View className="flex-row justify-around items-center ">
        {weekDates.map((day, index) => (
          <Pressable
            key={index}
            onPress={() => onSelectDate(day.date)}
            className={`w-10 h-16 rounded-full items-center justify-end pb-1 ${getDateStyle(day.date)}`}
          >
            <Text className="text-xs text-gray-400 mb-1">{day.dayName}</Text>
            <View className="bg-white rounded-full w-8 h-8 items-center justify-center">
              <Text className={`text-base ${getTextStyle(day.date)}`}>
                {day.date}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Calendar;
