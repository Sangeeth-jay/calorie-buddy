import { View, Text, Pressable, PanResponder } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { getWeekMealLogs } from "@/src/services/calendar";

interface CalenderProps {
  selectedDate: number;
  onSelectDate: (date: number, isoDate: string) => void;
}

const Calendar: React.FC<CalenderProps> = ({ selectedDate, onSelectDate }) => {
  const [weekOffset, setWeekOffset] = useState(0); // 0 = this week, -1 = last week, 1 = next week
  const [loggedDates, setLoggedDates] = useState<string[]>([]); // ["2025-02-15", "2025-02-16"]

  // Get week dates based on offset
  const getCurrentWeek = (offset: number) => {
    const today = new Date();
    today.setDate(today.getDate() + offset * 7); // Shift by weeks
    const currentDay = today.getDay();
    const week = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - currentDay + i);
      week.push({
        date: date.getDate(),
        dayName: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i],
        fullDate: date,
      });
    }
    return week;
  };

  const weekDates = getCurrentWeek(weekOffset);

  // Get month name for the week (use the middle day)
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
  const currentMonth = monthNames[weekDates[3].fullDate.getMonth()];

  // Fetch meal logs when week changes
  // Fetch meal logs when week changes
  useEffect(() => {
    const fetchLogs = async () => {
      // Calculate the week dates inside the effect
      const today = new Date();
      today.setDate(today.getDate() + weekOffset * 7);
      const currentDay = today.getDay();

      // Get Sunday (start of week)
      const sunday = new Date(today);
      sunday.setDate(today.getDate() - currentDay);

      // Get Saturday (end of week)
      const saturday = new Date(sunday);
      saturday.setDate(sunday.getDate() + 6);

      const startDate = sunday.toISOString().slice(0, 10);
      const endDate = saturday.toISOString().slice(0, 10);

      const logs = await getWeekMealLogs(startDate, endDate);
      setLoggedDates(logs);
    };
    fetchLogs();
  }, [weekOffset]); 

  // Swipe gesture handler
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20; // Trigger if swipe > 20px
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          // Swipe right = previous week
          setWeekOffset(weekOffset - 1);
        } else if (gestureState.dx < -50) {
          // Swipe left = next week
          setWeekOffset(weekOffset + 1);
        }
      },
    }),
  ).current;

  const today = new Date();
  const todayISO = today.toISOString().slice(0, 10);

  const getDateStyle = (day: any) => {
    const dayISO = day.fullDate.toISOString().slice(0, 10);
    const hasLog = loggedDates.includes(dayISO);

    if (day.date === selectedDate) {
      return "bg-blue-500"; // Selected
    } else if (dayISO === todayISO) {
      return "bg-blue-500"; // Today
    } else if (dayISO < todayISO) {
      // Past days
      if (hasLog) {
        return "bg-blue-200"; // Logged
      } else {
        return "bg-yellow-200"; // Missed
      }
    } else {
      return "bg-gray-100"; // Future
    }
  };

  const getTextStyle = (day: any) => {
    const dayISO = day.fullDate.toISOString().slice(0, 10);

    if (day.date === selectedDate || dayISO === todayISO) {
      return "text-blue-500 font-bold";
    } else if (dayISO >= todayISO) {
      return "text-gray-400";
    } else {
      return "text-gray-700";
    }
  };

  return (
    <View
      className="mb-4 bg-white rounded-xl flex-col gap-2 py-2"
      {...panResponder.panHandlers} // Attach gesture
    >
      <View className="w-full items-center">
        <Text className="text-blue-950 font-medium">{currentMonth}</Text>
      </View>
      <View className="flex-row justify-around items-center">
        {weekDates.map((day, index) => (
          <Pressable
            key={index}
            onPress={() => {
              const dayISO = day.fullDate.toISOString().slice(0, 10);
              onSelectDate(day.date, dayISO);
            }}
            className={`w-10 h-16 rounded-full items-center justify-end pb-1 ${getDateStyle(day)}`}
          >
            <Text className="text-xs text-gray-400 mb-1">{day.dayName}</Text>
            <View className="bg-white rounded-full w-8 h-8 items-center justify-center">
              <Text className={`text-base ${getTextStyle(day)}`}>
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
