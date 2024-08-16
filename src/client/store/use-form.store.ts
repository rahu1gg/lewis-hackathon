import { create } from 'zustand';

type State = {
  name: string;
  password: string;
  confirmPassword: string;
  tab: 'signup' | 'confirm-password';
};

type Action = {
  updateName: (name: State['name']) => void;
  updatePassword: (password: State['password']) => void;
  updateConfirmPassword: (confirmPassword: State['confirmPassword']) => void;
  updateTab: (tab: State['tab']) => void;
};

export const useProfile = create<State & Action>((set) => ({
  name: '',
  password: '',
  confirmPassword: '',
  tab: 'signup',
  updateName: (name) => set(() => ({ name: name })),
  updatePassword: (password) => set(() => ({ password: password })),
  updateConfirmPassword: (confirmPassword) => set(() => ({ confirmPassword: confirmPassword })),
  updateTab: (tab) => set(() => ({ tab: tab })),
}));
