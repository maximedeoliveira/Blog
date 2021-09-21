import { MutationTree } from 'vuex';
import { AuthState, IUser } from '.';

export enum AuthMutationsType {
    SET_TOKEN = 'SET_TOKEN',
    SET_USER = 'SET_USER',
}

export type AuthMutations = {
    [AuthMutationsType.SET_TOKEN](state: AuthState, token: string | null): void;
    [AuthMutationsType.SET_USER](
        state: AuthState,
        user: IUser | undefined
    ): void;
};

export const mutations: MutationTree<AuthState> & AuthMutations = {
    [AuthMutationsType.SET_TOKEN]: (state, token) => {
        state.token = token;
    },
    [AuthMutationsType.SET_USER]: (state, user) => {
        state.user = user;
    },
};
