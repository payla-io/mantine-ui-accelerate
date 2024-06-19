import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MerchantPortalBranding } from "../..";

interface InitialStoreState {
  colorScheme: string | null;
  branding: MerchantPortalBranding | null;
  isDarkTheme: boolean;
  isDarkMode: () => boolean; 
  setColorScheme: (scheme: string) => void;
  setBranding: (branding: MerchantPortalBranding) => void;
}

const useStore = create(persist<InitialStoreState>((set, get) => ({
  colorScheme:  null,
  isDarkTheme: false,
  branding: null,
  setColorScheme: (colorScheme) => {
      set(() => ({ colorScheme, isDarkTheme: colorScheme === "dark"}));
  },
  setBranding: (branding) => {
    set(() => ({ branding }));
  },
  isDarkMode: () => {
    const state = get();
    return state.colorScheme === "dark";
  },
}), {
  name: "merchant-portal-store",
  getStorage: () => localStorage,
},));

export default useStore;
