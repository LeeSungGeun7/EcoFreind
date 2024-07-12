import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'



type UserState = {
    email: string
    userId: number
    name: string
    isLogin: boolean
    avatar: string
    setEmail: (email: string) => void
    setUserId: (userId: number) => void
    setName: (name: string) => void
    setIsLogin: (isLogin: boolean) => void
    setAvatar: (avatar: string) => void
    resetUser: () => void
  }
  

  export const useUserStore = create(
    persist<UserState>(
    (set) => ({
    email: "",
    userId: 0,
    name: "",
    isLogin: false,
    avatar: "",
    setEmail: (email) => set({ email }),
    setUserId: (userId) => set({ userId }),
    setName: (name) => set({ name }),
    setIsLogin: (isLogin) => set({ isLogin }),
    setAvatar: (avatar) => set({ avatar }),
    resetUser: () => set({
      email: "",
      userId: 0,
      name: "",
      isLogin: false,
      avatar: "",
    }
    )
  }), {
    name: 'user-storage', 
    storage: createJSONStorage(() => localStorage),
  }
  ))