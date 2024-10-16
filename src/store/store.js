import { create } from 'zustand'

export const useUserStore = create((set) => ({
    isLogin: false,
    Username: "",
    UserId: "",
    Email: "",
    isAlert: "",
    alertMsg: false,
    alertType: "",
    role: "",
    token: "",
    isLoading: true,
    CrimeId: "",
    table: "SuspectAudit",
    setTable: (newState) => set({ table: newState }),
    setCrimeId: (newState) => set({ crimeId: newState }),
    setIsLoading: (newState) => set({ isLoading: newState }),
    setToken: (newState) => set({ token: newState }),
    setRole: (newState) => set({ role: newState }),
    setIsLogin: (newState) => set({ isLogin: newState }),
    setUsername: (newState) => set({ Username: newState }),
    setUserId: (newState) => set({ UserId: newState }),
    setEmail: (newState) => set({ email: newState }),
    setIsAlert: (newState) => set({ isAlert: newState }),
    setAlertMsg: (newState) => set({ alertMsg: newState }),
    setAlertType: (newState) => set({ alertType: newState }),

}))