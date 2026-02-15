import { View, Text, Pressable, ScrollView, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { getWeekMealLogs } from "@/src/services/calendar";
import { getWeekDates, getWeekMonthName } from "@/src/utils/calendarHelpers";

interface CalenderProps {
  selectedDate: number;
  onSelectDate: (date: number, isoDate: string) => void;
}

const Calendar: React.FC<CalenderProps> = ({ selectedDate, onSelectDate }) => {
  const [loggedDates, setLoggedDates] = useState<string[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const screenWidth = Dimensions.get("window").width;
  const weekWidth = screenWidth - 48;

  const currentWeek = getWeekDates(0);
  const lastWeek = getWeekDates(1);
  const currentMonth = getWeekMonthName(currentWeek);

  // Fetch logs for both weeks
  useEffect(() => {
    const fetchLogs = async () => {
      const current = getWeekDates(0);
      const last = getWeekDates(1);

      const startDate = last[0].dateISO;
      const endDate = current[6].dateISO;

      const logs = await getWeekMealLogs(startDate, endDate);
      setLoggedDates(logs);
    };
    fetchLogs();
  }, []);

  // Scroll to current week on mount
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  const todayISO = new Date().toISOString().slice(0, 10);

  // Styling logic stays here (needs component state)
  const getDateStyle = (day: any) => {
    const hasLog = loggedDates.includes(day.dateISO);

    if (day.date === selectedDate) {
      return "bg-blue-500";
    } else if (day.dateISO === todayISO) {
      return "bg-blue-500";
    } else if (day.dateISO < todayISO) {
      if (hasLog) {
        return "bg-blue-200";
      } else {
        return "bg-yellow-200";
      }
    } else {
      return "bg-gray-100";
    }
  };

  const getTextStyle = (day: any) => {
    if (day.date === selectedDate || day.dateISO === todayISO) {
      return "text-blue-500 font-bold";
    } else if (day.dateISO >= todayISO) {
      return "text-gray-400";
    } else {
      return "text-gray-700";
    }
  };

  const renderWeek = (weekDates: any[]) => (
    <View
      className="flex-row justify-around items-center"
      style={{ width: weekWidth }}
    >
      {weekDates.map((day, index) => (
        <Pressable
          key={index}
          onPress={() => {
            if (day.isFuture) return;
            onSelectDate(day.date, day.dateISO);
          }}
          disabled={day.isFuture}
          className={`w-10 h-16 rounded-full items-center justify-end pb-1 ${getDateStyle(day)}`}
        >
          <Text className="text-xs text-gray-400 mb-1">{day.dayName}</Text>
          <View className="bg-white rounded-full w-8 h-8 items-center justify-center">
            <Text className={`text-base ${getTextStyle(day)}`}>{day.date}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View className="mb-4 bg-white rounded-xl flex-col gap-2 py-2">
      <View className="w-full items-center">
        <Text className="text-blue-950 font-medium">{currentMonth}</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={weekWidth}
      >
        {renderWeek(lastWeek)}
        {renderWeek(currentWeek)}
      </ScrollView>
    </View>
  );
};

export default Calendar;
