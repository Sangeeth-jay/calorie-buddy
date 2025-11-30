import { View, Text, Pressable } from "react-native";
import React, { useCallback, useRef, useEffect } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import {  MagnifyingGlassIcon, BarcodeIcon, CubeFocusIcon } from "phosphor-react-native";

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: "Breakfast" | "Lunch" | "Dinner";
  onSave?: (data: any) => void;
}

const AddFoodModal: React.FC<AddFoodModalProps> = ({
  isOpen,
  onClose,
  mealType,
  onSave,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      snapPoints={["90%"]}
      handleStyle={{ backgroundColor: "#3b82f6", borderTopEndRadius: 14, borderTopStartRadius: 14 }}
      handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
    >
      <BottomSheetView className="flex-1 bg-white">


        {/* Meal Type Badge */}
        <View className="bg-blue-500 py-5 items-center rounded-b-full mb-4">
          <Text className="text-white text-3xl font-semibold">{mealType}</Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mx-4 mb-4 gap-2">
          <MagnifyingGlassIcon size={20} color="#9ca3af" />
          <BottomSheetTextInput
            className="flex-1 text-base"
            placeholder="Search"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3 px-4 mb-4">
          <Pressable className="flex-1 bg-blue-500 rounded-xl py-5 items-center gap-2">
            <CubeFocusIcon size={32} color="#fff"  />
            <Text className="text-white text-sm font-semibold">Scan meal</Text>
          </Pressable>
          <Pressable className="flex-1 bg-blue-500 rounded-xl py-5 items-center gap-2">
            <BarcodeIcon size={32} color="#fff" />
            <Text className="text-white text-sm font-semibold">Scan barcode</Text>
          </Pressable>
        </View>

        {/* Recently Added Foods */}
        <View className="flex-1 px-4">
          <Text className="text-xs text-gray-400 mb-2">Recently added foods</Text>
          <View className="flex-1 justify-center items-center">
            <Text className="text-base text-gray-300">N/A</Text>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View className="flex-row gap-3 px-4 py-4">
          <Pressable 
            onPress={onClose}
            className="flex-1 bg-[#e5e7eb] rounded-full py-4 items-center"
          >
            <Text className="text-lg font-semibold text-gray-700">Cancel</Text>
          </Pressable>
          <Pressable 
            onPress={onClose}
            className="flex-1 bg-blue-500 rounded-full py-4 items-center"
          >
            <Text className="text-lg font-semibold text-white">Done</Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default AddFoodModal;