import { create } from 'zustand';

type State = {
  isCapsLockOn: boolean;
};

type Action = {
  updateIsCapsLockOn: () => void;
};

export const useCharacterHelpers = create<State & Action>((set) => ({
  isCapsLockOn: false,
  updateIsCapsLockOn: () => set((state) => ({ isCapsLockOn: !state.isCapsLockOn })),
}));
