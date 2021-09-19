import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { auth } from './modules/auth/index';
import { AuthState } from './modules/auth/index';

export interface RootState {
    auth: AuthState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore({
    modules: {
        auth,
    },
});

export function useStore() {
    return baseUseStore(key);
}
