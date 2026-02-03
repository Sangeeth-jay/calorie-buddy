import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your setup data
interface SetupData {
  name: string;
  gender: string;
  bdate: {
    day: number;
    month: number;
    year: number;
  };
  height: number;
  heightUnit: string; // 'cm' or 'ft'
  weight: number;
  weightUnit: string; // 'kg' or 'lbs'
  activeLvl: number;
}

interface SetupContextType {
  setupData: SetupData;
  updateSetupData: (key: keyof SetupData, value: any) => void;
  resetSetupData: () => void;
  submitAllData: (finalData?: Partial<SetupData>) => Promise<void>;
}

// Initial/default values
const initialSetupData: SetupData = {
  name: "",
  gender: "",
  bdate: {
    day: 25,
    month: 12,
    year: 1995,
  },
  height: 175,
  heightUnit: "cm",
  weight: 70,
  weightUnit: "kg",
  activeLvl: 0,
};

// Create the context
const SetupContext = createContext<SetupContextType | undefined>(undefined);

// Provider component
export const SetupProvider = ({ children }: { children: ReactNode }) => {
  const [setupData, setSetupData] = useState<SetupData>(initialSetupData);

  // Update a single field
  const updateSetupData = (key: keyof SetupData, value: any) => {
    setSetupData((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(`Updated ${key}:`, value); // For debugging
  };

  // Reset all data 
  const resetSetupData = () => {
    setSetupData(initialSetupData);
  };

  // Submit all data to API 
  const submitAllData = async (finalData?: Partial<SetupData>) => {
    try {
      // Merge setupData with finalData
      const completeData = {
        ...setupData,
        ...finalData,
      };

      console.log("Submitting data:", completeData);

      // API calls
      // await fetch('api.com/users', {
      //   body: JSON.stringify(completeData)
      // });

      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("✅ Data submitted successfully!");
    } catch (error) {
      console.error("❌ Error submitting data:", error);
      throw error;
    }
  };

  return (
    <SetupContext.Provider
      value={{
        setupData,
        updateSetupData,
        resetSetupData,
        submitAllData,
      }}
    >
      {children}
    </SetupContext.Provider>
  );
};

// Custom hook to use the context
export const useSetup = () => {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error("useSetup must be used within SetupProvider");
  }
  return context;
};
