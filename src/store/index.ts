import router from '@/router';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

export interface State {
    token: string | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore({
    state() {
        return {
            token:
                JSON.parse(localStorage.getItem('session') || '{}')?.token ??
                null,
        };
    },
    mutations: {
        login(state: State, token: string | null) {
            localStorage.setItem('session', JSON.stringify({ token: token }));
            state.token = token;
            router.push({ name: 'Home' });
        },
        logout(state: State) {
            localStorage.removeItem('session');
            state.token = null;
            router.push({ name: 'SignIn' });
        },
    },
    getters: {
        getToken(state: State) {
            return state.token;
        },
        getIsAuthenticated(state: State) {
            return state.token !== null;
        },
    },
    plugins: [],
});

export function useStore() {
    return baseUseStore(key);
}
