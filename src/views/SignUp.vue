<template>
    <div class="flex items-center justify-center flex-grow">
        <div class="w-full max-w-xl p-12 bg-white rounded-lg shadow-md">
            <router-link
                :to="{ name: routesName.HOME }"
                class="flex items-center justify-center space-x-3"
            >
                <img src="../assets/logo.png" class="w-12" />
                <h1 class="text-3xl font-semibold text-gray-800">
                    Mon super blog
                </h1>
            </router-link>
            <form
                class="mt-8 space-y-6"
                @submit.prevent="handleSubmit"
                method="post"
            >
                <div class="flex flex-col space-y-2">
                    <app-label id="name">Nom</app-label>
                    <app-input
                        id="name"
                        type="text"
                        is-required
                        placeholder="John Doe"
                        autocomplete="Name"
                        v-model:modelValue="name"
                    />
                </div>
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
                    <app-label id="password">Mot de passe</app-label>
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
                <span>Vous avez déjà un compte ?</span>
                <router-link
                    :to="{ name: routesName.SIGN_IN }"
                    class="text-indigo-600 hover:text-indigo-700"
                >
                    Se connecter
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
import { RoutesName } from '@/router/types';

export default defineComponent({
    components: { AppButton, AppInput, AppLabel, IconSpinner },
    data() {
        return {
            routesName: RoutesName,
            name: '',
            email: '',
            password: '',
        };
    },
    methods: {
        handleSubmit(e: Event) {
            this.signUp({
                name: this.name,
                email: this.email,
                password: this.password,
            });

            e.preventDefault();
        },
    },
    setup() {
        const store = useStore();

        const {
            mutate: signUp,
            loading,
            error,
        } = useMutation(
            gql`
                mutation signUp(
                    $name: String!
                    $email: String!
                    $password: String!
                ) {
                    signUp(name: $name, email: $email, password: $password) {
                        token
                    }
                }
            `,
            () => ({
                update: (cache, { data }) => {
                    if (data.signUp.token) {
                        store.dispatch(
                            AuthActionsType.LOGIN,
                            data.signUp.token
                        );
                    }
                },
            })
        );

        return { signUp, loading, error };
    },
});
</script>
