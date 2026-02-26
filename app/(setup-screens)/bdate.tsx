import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useSetup } from "../../src/context/SetupContext";
import NextFillBtn from "../../components/NextFillBtn";
import SetUpHeader from "../../components/SetUpHeader";


const ITEM_HEIGHT = 50;
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => CURRENT_YEAR - i).reverse();

const Bdate = () => {
  const { setupData, updateSetupData } = useSetup();

  // -------------------------
  // Refs
  // -------------------------
  const dayScrollRef = useRef<ScrollView | null>(null);
  const monthScrollRef = useRef<ScrollView | null>(null);
  const yearScrollRef = useRef<ScrollView | null>(null);

  // -------------------------
  // State
  // -------------------------
  const [selectedDay, setSelectedDay] = useState(setupData.bdate.day);
  const [selectedMonth, setSelectedMonth] = useState(setupData.bdate.month);
  const [selectedYear, setSelectedYear] = useState(setupData.bdate.year);

  // -------------------------
  // Effects
  // -------------------------
  useEffect(() => {
    setTimeout(() => {
      dayScrollRef.current?.scrollTo({ y: (selectedDay - 1) * ITEM_HEIGHT, animated: false });
      monthScrollRef.current?.scrollTo({ y: (selectedMonth - 1) * ITEM_HEIGHT, animated: false });
      const yearIndex = YEARS.indexOf(selectedYear);
      yearScrollRef.current?.scrollTo({ y: yearIndex * ITEM_HEIGHT, animated: false });
    }, 100);
    //eslint-disable-next-line
  }, []);

  // -------------------------
  // Handlers
  // -------------------------
  const handleScroll = (
    event: { nativeEvent: { contentOffset: { y: any } } },
    data: any[],
    setSelected: (arg0: any) => void,
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const selectedValue = data[index];
    if (selectedValue !== undefined) setSelected(selectedValue);
  };

  const handleNext = () => {
    updateSetupData("bdate", { day: selectedDay, month: selectedMonth, year: selectedYear });
    router.push("/(setup-screens)/height");
  };

  // -------------------------
  // Render Helpers
  // -------------------------
  const renderPickerColumn = (
    data: any[],
    selected: any,
    onSelect: (arg0: any) => void,
    scrollRef: React.Ref<ScrollView> | undefined,
    label: string,
  ) => (
    <View className="flex-1 items-center">
      <Text className="text-lg text-center text-gray-400 mb-5">{label}</Text>
      <View className="relative" style={{ height: ITEM_HEIGHT * 5 }}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          contentContainerStyle={{ alignItems: "center" }}
          onScroll={(event) => handleScroll(event, data, onSelect)}
          scrollEventThrottle={16}
        >
          <View style={{ height: ITEM_HEIGHT * 2 }} />
          {data.map((item) => (
            <View key={item} style={{ height: ITEM_HEIGHT }} className="justify-center items-center w-full">
              <Text className={selected === item ? "text-4xl font-semibold text-blue-500" : "text-2xl text-gray-400"}>
                {String(item).padStart(2, "0")}
              </Text>
            </View>
          ))}
          <View style={{ height: ITEM_HEIGHT * 2 }} />
        </ScrollView>
        <View className="absolute left-0 right-0 justify-between pointer-events-none" style={{ top: ITEM_HEIGHT * 2, height: ITEM_HEIGHT }}>
          <View className="h-[2px] bg-blue-500 w-full" />
          <View className="flex-1" />
          <View className="h-[2px] bg-blue-500 w-full" />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="w-full h-screen-safe flex-1 items-center justify-between pb-6 bg-white">
      <SetUpHeader title="When were you born?" currentStep={3} totalSteps={6} />
      <View className="flex-row justify-around px-5 w-full">
        {renderPickerColumn(DAYS, selectedDay, setSelectedDay, dayScrollRef, "Day")}
        {renderPickerColumn(MONTHS, selectedMonth, setSelectedMonth, monthScrollRef, "Month")}
        {renderPickerColumn(YEARS, selectedYear, setSelectedYear, yearScrollRef, "Year")}
      </View>
      <NextFillBtn title="Next" onPress={handleNext} />
    </SafeAreaView>
  );
};

export default Bdate;