import React, { createContext, useContext, useState, ReactNode } from "react";
import { SortOption } from "../components/SortModal";

interface HomeSortContextType {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
}

const HomeSortContext = createContext<HomeSortContextType | undefined>(undefined);

export function HomeSortProvider({ children }: { children: ReactNode }) {
  const [sortOption, setSortOption] = useState<SortOption>("latest");

  return (
    <HomeSortContext.Provider value={{ sortOption, setSortOption }}>
      {children}
    </HomeSortContext.Provider>
  );
}

export function useHomeSort() {
  const context = useContext(HomeSortContext);
  if (!context) {
    throw new Error("useHomeSort must be used within a HomeSortProvider");
  }
  return context;
}
