import {
  View,
  Text,
  Pressable,
} from "react-native";
import React, { useCallback, useRef, useEffect, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";

interface AddWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: { weight: number; date: Date }) => void;
}

const AddWeightModal: React.FC<AddWeightModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [weight, setWeight] = useState("");

  // Handle isOpen prop changes
  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log("Modal index:", index);
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

  const handleSave = useCallback(() => {
    const weightValue = parseFloat(weight);
    if (weightValue && weightValue > 0) {
      onSave?.({
        weight: weightValue,
        date: new Date(),
      });
      setWeight("");
      onClose();
    }
  }, [weight, onSave, onClose]);

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
              onChangeText={setWeight}
            />
            <Text style={{ fontSize: 18, color: "#6b7280" }}>kg</Text>
          </View>

          {/* Buttons */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              onPress={onClose}
              style={{
                flex: 1,
                backgroundColor: "#e5e7eb",
                borderRadius: 24,
                padding: 16,
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "600", color: "#374151" }}
              >
                Cancel
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              style={{
                flex: 1,
                backgroundColor: "#3b82f6",
                borderRadius: 24,
                padding: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
                Save
              </Text>
            </Pressable>
          </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default AddWeightModal;
