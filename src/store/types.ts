import { ActionContext } from 'vuex';
import { RootState } from '.';

type AA = (...args: any[]) => any;

export type AugmentedActionContext<M extends AA, S> = {
    commit<K extends keyof M>(
        key: K,
        payload: Parameters<M[K]>[1]
    ): ReturnType<M[K]>;
} & Omit<ActionContext<S, RootState>, 'commit'>;
