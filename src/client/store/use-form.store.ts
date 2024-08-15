import { create } from 'zustand';

type State = {
  name: string;
  password: string;
  confirmPassword: string;
};

type Action = {
  updateName: (name: State['name']) => void;
  updatePassword: (password: State['password']) => void;
  updateConfirmPassword: (confirmPassword: State['confirmPassword']) => void;
};

export const useProfile = create<State & Action>((set) => ({
  name: '',
  password: '',
  confirmPassword: '',
  updateName: (name) => set(() => ({ name: name })),
  updatePassword: (password) => set(() => ({ password: password })),
  updateConfirmPassword: (confirmPassword) => set(() => ({ confirmPassword: confirmPassword })),
}));
