import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"; // 1. Import ini

import { removeToken, setToken } from "@/lib/cookies";
import { User, withToken } from "@/types/entity/user";

type AuthStoreType = {
  user: (User & withToken) | null; // Update type biar support token
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User & withToken) => void;
  logout: () => void;
  stopLoading: () => void;
};

// 2. Tambahkan middleware 'persist' di sini
const useAuthStoreBase = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true, // Awalnya true, nanti otomatis false setelah hydrate

      login: (user) => {
        setToken(user.token); // Simpan cookie
        set(
          produce<AuthStoreType>((state) => {
            state.isAuthenticated = true;
            state.user = user;
          }),
        );
      },

      logout: () => {
        removeToken(); // Hapus cookie
        localStorage.removeItem("auth-storage"); // Hapus storage zustand (opsional, persist biasanya handle ini)
        localStorage.removeItem("user"); // Hapus storage zustand (opsional, persist biasanya handle ini)
        set(
          produce<AuthStoreType>((state) => {
            state.isAuthenticated = false;
            state.user = null;
          }),
        );
      },

      stopLoading: () => {
        set(
          produce<AuthStoreType>((state) => {
            state.isLoading = false;
          }),
        );
      },
    }),
    {
      name: "auth-storage", // Nama key di LocalStorage
      storage: createJSONStorage(() => localStorage), // Gunakan localStorage
      onRehydrateStorage: () => (state) => {
        // Callback setelah data berhasil diambil dari LocalStorage
        state?.stopLoading();
      },
    },
  ),
);

const useAuthStore = createSelectorHooks(useAuthStoreBase);

export default useAuthStore;
