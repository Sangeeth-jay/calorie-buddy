import { View, Text, Image } from "react-native";
import React from "react";
import Svg, { Circle } from "react-native-svg";

interface CalorieGaugeProps {
  consumed: number;
  goal: number;
}

const CalorieGauge: React.FC<CalorieGaugeProps> = ({ consumed, goal }) => {
  const size = 240;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Semicircle circumference
  const center = size / 2;

  // Calculate consumed arc length
  const progress = Math.min((consumed / goal) * 100, 100);
  const consumedArc = (progress / 100) * circumference;

  // Calculate remaining arc length for consumed
  const remainingArc = circumference - consumedArc;

  //Calcualte over consumed arc length
  const exess = consumed > goal ? consumed - goal : 0;
  const exessProgress = Math.min((exess / goal) * 100, 100);
  const exessArc = (exessProgress / 100) * circumference;
  const remainingExessArc = circumference - exessArc;

  return (
    <View style={{ width: size, height: size / 2 + 40 }}>
      <Svg width={size} height={size / 2 + 40}>
        {/* Gray background - full semicircle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={0}
          rotation="180"
          origin={`${center}, ${center}`}
          strokeLinecap="round"
        />

        {/* Blue foreground - consumed portion */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#60a5fa"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${consumedArc} ${circumference + remainingArc}`}
          strokeDashoffset={0}
          rotation="180"
          origin={`${center}, ${center}`}
          strokeLinecap="round"
        />

        {/** dark blue forground - over consumed */}
        {exess > 0 && (
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#1e5faf"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${exessArc} ${circumference + remainingExessArc}`}
            strokeDashoffset={0}
            rotation="180"
            origin={`${center}, ${center}`}
            strokeLinecap="round"
          />
        )}
      </Svg>

      {/* Center text */}
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <Image source={require("../../assets/images/calories.png")} className="w-10 h-10"/>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: `${Number(consumed) > Number(goal) ? "#ef4444" : "#1f2937"}` }}>
          {consumed}
          <Text style={{ fontSize: 14, fontWeight: "normal", color: "#6b7280" }}> kcal</Text>
        </Text>
        
        <Text style={{ fontSize: 12, color: "#9ca3af" }}>
          (Goal: {goal}kcal)
        </Text>
      </View>
    </View>
  );
};

export default CalorieGauge;
