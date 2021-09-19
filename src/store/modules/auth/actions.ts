import router from '@/router';
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { AuthState } from '.';
import { AuthMutations, AuthMutationsType } from './mutations';

export enum AuthActionsType {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
}

type AugmentedActionContext = {
    commit<K extends keyof AuthMutations>(
        key: K,
        payload: Parameters<AuthMutations[K]>[1]
    ): ReturnType<AuthMutations[K]>;
} & Omit<ActionContext<AuthState, RootState>, 'commit'>;

export interface IActions {
    [AuthActionsType.LOGIN](
        { commit }: AugmentedActionContext,
        token: string
    ): void;
    [AuthActionsType.LOGOUT]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<AuthState, RootState> & IActions = {
    [AuthActionsType.LOGIN]: ({ commit }, token) => {
        localStorage.setItem('session', JSON.stringify({ token: token }));
        commit(AuthMutationsType.SET_TOKEN, token);
        router.push({ name: 'Home' });
    },
    [AuthActionsType.LOGOUT]: ({ commit }) => {
        localStorage.removeItem('session');
        commit(AuthMutationsType.SET_TOKEN, null);
        router.push({ name: 'Home' });
    },
};
