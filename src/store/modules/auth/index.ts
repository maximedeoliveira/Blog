import { Module } from 'vuex';
import { RootState } from '@/store';
import { getters } from '@/store/modules/auth/getters';
import { mutations } from './mutations';
import { actions } from './actions';

export interface AuthState {
    token: string | null;
}

export const auth: Module<AuthState, RootState> = {
    state() {
        return {
            token:
                JSON.parse(localStorage.getItem('session') || '{}')?.token ??
                null,
        };
    },
    mutations,
    getters,
    actions,
};
