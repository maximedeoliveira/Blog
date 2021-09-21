import { Module } from 'vuex';
import { RootState } from '@/store';
import { getters } from '@/store/modules/auth/getters';
import { mutations } from './mutations';
import { actions } from './actions';

export interface IUser {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user?: IUser;
    token: string | null;
}

export const auth: Module<AuthState, RootState> = {
    state() {
        return {
            token:
                JSON.parse(localStorage.getItem('session') || '{}')?.token ??
                null,
            user: JSON.parse(localStorage.getItem('user') || '{}'),
        };
    },
    mutations,
    getters,
    actions,
};
