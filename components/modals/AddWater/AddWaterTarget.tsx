import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { updateWaterTargetInLatestRow } from "@/src/services/waterService";

type Props = {
  onSaved: (targetMl: number) => void;
};

const AddWaterTarget: React.FC<Props> = ({ onSaved }) => {
  const [text, setText] = useState("3500");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    const ml = Number(text);
    if (!Number.isFinite(ml) || ml <= 0) return;

    try {
      setSaving(true);
      await updateWaterTargetInLatestRow(ml);
      onSaved(ml); // switch to consume screen
    } catch (e) {
      console.log("Save water target error:", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="items-center">
      <View className="w-full items-center border-b pb-3 mb-4 border-gray-200">
        <Text className="text-3xl font-semibold text-blue-600">Water Goal</Text>
        <Text className="text-gray-500 mt-1">Set your daily target</Text>
      </View>

      <View className="w-full items-center gap-3">
        <View className="w-1/2 flex-row justify-center items-center bg-gray-100 rounded-lg px-4 py-2">
          <BottomSheetTextInput
            value={text}
            onChangeText={(t) => setText(t.replace(/[^0-9]/g, ""))}
            placeholder="3500"
            keyboardType="decimal-pad"
            className="text-2xl w-5/6 text-right"
          />
          <Text className="text-xl w-1/6">ml</Text>
        </View>

        <Pressable
          disabled={saving}
          onPress={save}
          className={`w-1/2 rounded-xl py-3 items-center ${
            saving ? "bg-blue-300" : "bg-blue-500"
          }`}
        >
          {saving ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-white text-lg font-semibold">Save Goal</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default AddWaterTarget;
