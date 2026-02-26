import { View, Text, Pressable } from "react-native";
import React, { useCallback, useRef, useEffect, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { addWeight } from "@/src/services/weightService";
import Toast from "react-native-toast-message";

interface AddWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddWeightModal: React.FC<AddWeightModalProps> = ({ isOpen, onClose }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [weight, setWeight] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle isOpen prop changes
  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!weight) return;

    setIsLoading(true);

    try {
      const weightinKg = parseFloat(weight);
      await addWeight(weightinKg);
      Toast.show({
        type: "success",
        text1: "Weight added successfully",
      });
      handleOnClose();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error adding weight",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClose = () => {
    onClose();
    setWeight("");
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
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
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
    >
      <BottomSheetView style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Add Weight Entry
        </Text>

        {/* Weight Input */}
        <Text style={{ fontSize: 16, marginBottom: 8, color: "#374151" }}>
          Current Weight
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#f3f4f6",
            borderRadius: 12,
            padding: 12,
            marginBottom: 20,
          }}
        >
          <BottomSheetTextInput
            style={{ flex: 1, fontSize: 24, fontWeight: "600" }}
            keyboardType="decimal-pad"
            placeholder="0.0"
            value={weight}
            onChangeText={(t) => setWeight(t.replace(/[^0-9.]/g, ""))}
          />
          <Text style={{ fontSize: 18, color: "#6b7280" }}>kg</Text>
        </View>

        {/* Buttons */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable
            onPress={handleOnClose}
            style={{
              flex: 1,
              backgroundColor: "#e5e7eb",
              borderRadius: 24,
              padding: 16,
              alignItems: "center",
            }}
            disabled={isLoading}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#374151" }}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "#3b82f6",
              borderRadius: 24,
              padding: 16,
              alignItems: "center",
            }}
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
              {isLoading ? "Saving..." : "Save"}
            </Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default AddWeightModal;
