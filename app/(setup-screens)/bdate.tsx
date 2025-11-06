import { View, Text, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef, useEffect } from "react";

import SetUpHeader from "../../components/SetUpHeader";
import NextFillBtn from "../../components/NextFillBtn";
import { router } from "expo-router";

const { height } = Dimensions.get("window");
const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;

const Bdate = () => {
  const [selectedDay, setSelectedDay] = useState(25);
  const [selectedMonth, setSelectedMonth] = useState(7);
  const [selectedYear, setSelectedYear] = useState(1995);

  const dayScrollRef = useRef<ScrollView | null>(null);
  const monthScrollRef = useRef<ScrollView | null>(null);
  const yearScrollRef = useRef<ScrollView | null>(null);

  // Create arrays of numbers for each column
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // [1, 2, 3, ..., 31]
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, 3, ..., 12]
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i).reverse(); // [2024, 2023, ..., 1925]

  const handleScroll = (
    event: { nativeEvent: { contentOffset: { y: any } } },
    data: any[],
    setSelected: (arg0: any) => void
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const selectedValue = data[index];
    if (selectedValue && selectedValue !== undefined) {
      setSelected(selectedValue);
    }
  };

  // This renders one picker column (day, month, or year)
  const renderPickerColumn = (
    data: any[],
    selected: any,
    onSelect: (arg0: any) => void,
    scrollRef: React.Ref<ScrollView> | undefined,
    label: string
  ) => {
    return (
      <View className="flex-1 items-center">
        {/* Label */}
        <Text className="text-lg text-center text-gray-400 mb-5">{label}</Text>

        {/* Picker container */}
        <View className="relative" style={{ height: ITEM_HEIGHT * 5 }}>
          {/* Scrollable list */}
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            contentContainerStyle={{ alignItems: "center" }}
            onScroll={(event) => handleScroll(event, data, onSelect)}
            scrollEventThrottle={16}
          >
            {/* Top padding */}
            <View style={{ height: ITEM_HEIGHT * 2 }} />

            {/* All the numbers */}
            {data.map((item) => (
              <View
                key={item}
                style={{ height: ITEM_HEIGHT }}
                className="justify-center items-center w-full"
              >
                <Text
                  className={
                    selected === item
                      ? "text-4xl font-semibold text-blue-500"
                      : "text-2xl text-gray-400"
                  }
                >
                  {String(item).padStart(2, "0")}
                </Text>
              </View>
            ))}

            {/* Bottom padding */}
            <View style={{ height: ITEM_HEIGHT * 2 }} />
          </ScrollView>

          {/* Blue lines */}
          <View
            className="absolute left-0 right-0 justify-between pointer-events-none"
            style={{
              top: ITEM_HEIGHT * 2,
              height: ITEM_HEIGHT,
            }}
          >
            <View className="h-[2px] bg-blue-500 w-full" />
            <View className="flex-1" />
            <View className="h-[2px] bg-blue-500 w-full" />
          </View>
        </View>
      </View>
    );
  };

  // Set initial scroll positions when component loads
  useEffect(() => {
    setTimeout(() => {
      if (dayScrollRef.current) {
        dayScrollRef.current?.scrollTo({
          y: (selectedDay - 1) * ITEM_HEIGHT,
          animated: false,
        });
      }
      if (monthScrollRef.current) {
        monthScrollRef.current?.scrollTo({
          y: (selectedMonth - 1) * ITEM_HEIGHT,
          animated: false,
        });
      }
      if (yearScrollRef.current) {
        const yearIndex = years.indexOf(selectedYear);
        yearScrollRef.current?.scrollTo({
          y: yearIndex * ITEM_HEIGHT,
          animated: false,
        });
      }
    }, 100);
  }, []);

  return (
    <SafeAreaView className="w-full h-screen-safe flex-1 items-center justify-between py-6 bg-white">
      <SetUpHeader title="When were you born?" currentStep={3} totalSteps={6} />

      {/* date picker */}
      <View className="flex-row justify-around px-5  w-full">
        {renderPickerColumn(
          days,
          selectedDay,
          setSelectedDay,
          dayScrollRef,
          "Day"
        )}
        {renderPickerColumn(
          months,
          selectedMonth,
          setSelectedMonth,
          monthScrollRef,
          "Month"
        )}
        {renderPickerColumn(
          years,
          selectedYear,
          setSelectedYear,
          yearScrollRef,
          "Year"
        )}
        
      </View>
      {/* date picker */}

      <NextFillBtn title="Next" onPress={() => {
        console.log(
          selectedDay,selectedMonth,selectedYear
        );
        router.push("/(setup-screens)/height");
        
      }} />
    </SafeAreaView>
  );
};

export default Bdate;
