import { View, Text, Pressable } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

const Home = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center justify-center">
            <Text className="text-2xl mb-4">Home Screen</Text>

            <Pressable
              className="px-6 py-4 bg-blue-500 rounded-lg"
              onPress={handlePresentModalPress}
            >
              <Text className="text-white text-lg font-bold">Open Modal</Text>
            </Pressable>
          </View>

          {/* Bottom Sheet Modal */}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
          >
            <BottomSheetView >
              <Text>Awesome 🎉</Text>
              <BottomSheetTextInput
                style={{ flex: 1, fontSize: 24, fontWeight: "600" }}
                keyboardType="decimal-pad"
                placeholder="0.0"
              />
            </BottomSheetView>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Home;
