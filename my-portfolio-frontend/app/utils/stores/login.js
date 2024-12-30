import { create } from "zustand";

export const useLoginStatus = create((set) => {
  return {
    adminLogin: false,
    updateAdminLogin: (adminLogin) =>
      set(() => ({
        adminLogin: adminLogin,
      })),
  };
});
