import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SystemState {
  token: string | null
  isLoggedIn: boolean
  userInfo: UserInfo | null
  permissions: string[]
  menuList: MenuItem[]
  setToken: (token: string | null) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setUserInfo: (userInfo: UserInfo | null) => void
  setPermissions: (permissions: string[]) => void
  setMenuList: (menuList: MenuItem[]) => void
  logout: () => void
}

export const useSystemStore = create<SystemState>()(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,
      userInfo: null,
      permissions: [],
      menuList: [],
      setToken: (token) => set({ token }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setUserInfo: (userInfo) => set({ userInfo }),
      setPermissions: (permissions) => set({ permissions }),
      setMenuList: (menuList) => set({ menuList }),
      logout: () =>
        set({
          token: null,
          isLoggedIn: false,
          userInfo: null,
          permissions: [],
          menuList: []
        })
    }),
    {
      name: 'system-storage',
      partialize: (state) => ({
        token: state.token,
        isLoggedIn: state.isLoggedIn,
        userInfo: state.userInfo,
        permissions: state.permissions,
        menuList: state.menuList
      })
    }
  )
)
