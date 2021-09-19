import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { AuthState } from '.';

export enum AuthGettersTypes {
    GET_TOKEN = 'GET_TOKEN',
    IS_AUTHENTICATED = 'IS_AUTHENTICATED',
}

export interface IGetters {
    [AuthGettersTypes.GET_TOKEN](state: AuthState): string | null;
    [AuthGettersTypes.IS_AUTHENTICATED](state: AuthState): boolean;
}

export const getters: GetterTree<AuthState, RootState> & IGetters = {
    [AuthGettersTypes.GET_TOKEN]: (state) => {
        return state.token;
    },
    [AuthGettersTypes.IS_AUTHENTICATED]: (state) => {
        return state.token !== null;
    },
};
