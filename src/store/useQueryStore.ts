import { create } from "zustand";

type QueryState = {
  query: string;
  setQuery: (query: string) => void;
};

export const useQueryStore = create<QueryState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
