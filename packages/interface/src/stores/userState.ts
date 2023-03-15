import { atom } from 'recoil';
import { UserModel } from 'src/models/UserModel';

export type UserState = UserModel;

export const userState = atom<UserState>({
    key: 'userState',
    default: new UserModel(),
});
