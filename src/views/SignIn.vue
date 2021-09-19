<template>
    <div class="flex items-center justify-center flex-grow">
        <div class="w-full max-w-md">
            <router-link
                to="/"
                class="flex items-center justify-center space-x-3"
            >
                <img src="../assets/logo.png" class="w-12" />
                <h1 class="text-3xl font-semibold text-gray-800">
                    Mon super blog
                </h1>
            </router-link>
            <form
                class="mt-12 space-y-6"
                @submit.prevent="handleSubmit"
                method="post"
            >
                <div class="flex flex-col space-y-2">
                    <app-label id="email">Email</app-label>
                    <app-input
                        id="email"
                        type="email"
                        is-required
                        placeholder="Adresse email"
                        autocomplete="email"
                        v-model:modelValue="email"
                    />
                </div>
                <div class="flex flex-col space-y-2">
                    <div class="flex flex-row items-center justify-between">
                        <app-label id="password">Mot de passe</app-label>
                        <router-link to="/sign-in" class="text-xs">
                            Mot de passe oublié ?
                        </router-link>
                    </div>
                    <app-input
                        id="password"
                        type="password"
                        is-required
                        placeholder="Password"
                        autocomplete="password"
                        v-model="password"
                    />
                </div>
                <p v-if="error" class="text-sm text-center text-red-500">
                    {{ error.message }}
                </p>
                <app-button class="w-full space-x" type="submit">
                    <icon-spinner v-if="loading" />
                    <span>Valider</span>
                </app-button>
            </form>
            <div
                class="flex items-center justify-center mt-2 space-x-2 text-sm font-semibold text-gray-700 "
            >
                <span>Don't have an account ?</span>
                <router-link
                    to="/sign-up"
                    class="text-indigo-600 hover:text-indigo-700"
                >
                    Create an account
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import AppLabel from '@/components/AppLabel.vue';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { useStore } from '@/store';
import { AuthActionsType } from '@/store/modules/auth/actions';
import IconSpinner from '@/components/icons/IconSpinner.vue';

export default defineComponent({
    components: { AppButton, AppInput, AppLabel, IconSpinner },
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        handleSubmit(e: Event) {
            this.signIn({ email: this.email, password: this.password });

            e.preventDefault();
        },
    },
    setup() {
        const store = useStore();

        const {
            mutate: signIn,
            loading,
            error,
        } = useMutation(
            gql`
                mutation signIn($email: String!, $password: String!) {
                    signIn(email: $email, password: $password) {
                        token
                    }
                }
            `,
            () => ({
                update: (cache, { data }) => {
                    if (data.signIn.token) {
                        store.dispatch(
                            AuthActionsType.LOGIN,
                            data.signIn.token
                        );
                    }
                },
            })
        );

        return { signIn, loading, error };
    },
});
</script>
