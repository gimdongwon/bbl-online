import { create } from 'zustand';

interface FilterState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
