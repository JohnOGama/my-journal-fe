import { create } from "zustand";

type QueryState = {
  query: {
    search: string;
    type: "ai" | "fts";
  };
  setQuery: (query: { search: string; type: "ai" | "fts" }) => void;
};

export const useQueryStore = create<QueryState>((set) => ({
  query: { search: "", type: "fts" },
  setQuery: (query) => set({ query }),
}));
