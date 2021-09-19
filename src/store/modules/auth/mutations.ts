import { MutationTree } from 'vuex';
import { AuthState } from '.';

export enum AuthMutationsType {
    SET_TOKEN = 'SET_TOKEN',
}

export type AuthMutations = {
    [AuthMutationsType.SET_TOKEN](state: AuthState, token: string | null): void;
};

export const mutations: MutationTree<AuthState> & AuthMutations = {
    [AuthMutationsType.SET_TOKEN]: (state, token) => {
        state.token = token;
    },
};
