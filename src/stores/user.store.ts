import { create } from 'zustand';
import { Api } from '@/api';
import { persist } from 'zustand/middleware';

type Info = Record<string, any> | null;


interface TokenState {
  token: string | null;
  login: (params: API.LoginDto) => void;
  logout: () => void;
}

const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      token: '',
      login: async (params: API.LoginDto) => {
        const { token } = await Api.auth.authLogin(params);
        set({ token });
      },
      logout: async () => {
        useTokenStore.persist.clearStorage();
        useUserStore.persist.clearStorage();
      }
    }),
    {
      name: 'token'
    }
  )
);

interface UserState {
  userInfo: Info;
  // perms: any[];
  // menus: any[];
  getUserInfo: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: {},
      // perms: [],
      // menus: [],
      getUserInfo: async () => {
        const { accountProfile } = Api.account;
        const userInfo = await accountProfile();
        set({ userInfo });
      }
    }),
    {
      name: 'userInfo'
    }
  )
);

interface UserPermissionState {
  permissions: any[];
  menus: any[];
  getPermissions: () => void;
}

const usePermissionStore = create<UserPermissionState>((set) => ({
  permissions: [],
  menus: [],
  getPermissions: async () => {
    const { accountPermissions, accountMenu } = Api.account;
    const [permissions, menus] =
      await Promise.all([accountPermissions(), accountMenu()]);
    set(() => ({ permissions, menus }));
  }
}));

export { useUserStore, useTokenStore, usePermissionStore } ;