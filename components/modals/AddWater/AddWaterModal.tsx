import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import AddWaterTarget from "./AddWaterTarget";
import AddConsumed from "./AddConsumed";

import { getLatestDailyGoal } from "@/src/services/waterService";
import { ActivityIndicator, View, Text } from "react-native";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddWaterModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // UI state (later replace with DB)
  const [waterTarget, setWaterTarget] = useState<number | null>(null);
  const [loadingTarget, setLoadingTarget] = useState(false);

  useEffect(() => {
    let alive = true;

    // ✅ open / close sheet
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
      setLoadingTarget(false);
      setWaterTarget(null);
      return;
    }

    // ✅ load target
    (async () => {
      try {
        setLoadingTarget(true);
        const latest = await getLatestDailyGoal();
        // console.log("✅ getLatestDailyGoal result:", latest);

        if (!alive) return;
        setWaterTarget(latest?.water_target_ml ?? null);
      } catch (e) {
        console.log("❌ getLatestDailyGoal error:", e);
        if (!alive) return;
        setWaterTarget(null);
      } finally {
        if (alive) setLoadingTarget(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [isOpen]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) onClose();
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
      snapPoints={["90%"]}
      handleStyle={{
        backgroundColor: "#3b82f6",
        borderTopEndRadius: 14,
        borderTopStartRadius: 14,
      }}
      handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
    >
      <BottomSheetView className="flex-1 bg-white px-4 py-6">
        {loadingTarget ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator />
            <Text className="mt-2 text-gray-500">Loading...</Text>
          </View>
        ) : waterTarget === null ? (
          <AddWaterTarget onSaved={(targetMl) => setWaterTarget(targetMl)} />
        ) : (
          <AddConsumed waterTarget={waterTarget} onClose={onClose} />
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default AddWaterModal;
