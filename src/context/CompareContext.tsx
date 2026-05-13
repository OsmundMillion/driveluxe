import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface CarSummary {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  available: boolean;
}

interface CompareContextType {
  compareList: CarSummary[];
  addToCompare: (car: CarSummary) => string | null;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
  isInCompare: (id: number) => boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareList, setCompareList] = useState<CarSummary[]>(() => {
    try {
      const stored = localStorage.getItem("driveluxe_compare");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const save = (list: CarSummary[]) => {
    setCompareList(list);
    localStorage.setItem("driveluxe_compare", JSON.stringify(list));
  };

  const addToCompare = (car: CarSummary): string | null => {
    if (compareList.find((c) => c.id === car.id)) return "already_added";
    if (compareList.length >= 3) return "max_reached";
    save([...compareList, car]);
    return null;
  };

  const removeFromCompare = (id: number) => {
    save(compareList.filter((c) => c.id !== id));
  };

  const clearCompare = () => save([]);

  const isInCompare = (id: number) => compareList.some((c) => c.id === id);

  return (
    <CompareContext.Provider
      value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used inside CompareProvider");
  return ctx;
};