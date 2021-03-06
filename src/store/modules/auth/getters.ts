import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { AuthState, IUser } from '.';

export enum AuthGettersTypes {
    GET_TOKEN = 'GET_TOKEN',
    GET_USER = 'GET_USER',
    IS_AUTHENTICATED = 'IS_AUTHENTICATED',
}

export interface IGetters {
    [AuthGettersTypes.GET_TOKEN](state: AuthState): string | null;
    [AuthGettersTypes.GET_USER](state: AuthState): IUser | undefined;
    [AuthGettersTypes.IS_AUTHENTICATED](state: AuthState): boolean;
}

export const getters: GetterTree<AuthState, RootState> & IGetters = {
    [AuthGettersTypes.GET_TOKEN]: (state) => {
        return state.token;
    },
    [AuthGettersTypes.GET_USER]: (state) => {
        return state.user;
    },
    [AuthGettersTypes.IS_AUTHENTICATED]: (state) => {
        return state.token !== null;
    },
};
