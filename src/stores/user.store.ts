import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Info = Record<string, any> | null;

interface LoginState {
  userInfo: Info;
  setUserInfo: (info: Info) => void;
  token: string | null;
  setToken: (token: string) => void;
}

const useUserStore = create<LoginState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set(() => ({ userInfo: info })),
      token: null,
      setToken: (token) => set(() => ({ token })),
    }),
    {
      name: 'userStore',
    },
  ),
);

export default useUserStore;
