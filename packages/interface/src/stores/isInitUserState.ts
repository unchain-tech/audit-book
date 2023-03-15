import { atom } from 'recoil';

export const isInitUserState = atom<boolean>({
    key: 'isInitUserState',
    default: false,
});
