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
                        type="text"
                        idRequired
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
                        isRequired
                        placeholder="Password"
                        autocomplete="password"
                        v-model="password"
                    />
                </div>
                <app-button class="w-full" type="submit">Valider</app-button>
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
export default defineComponent({
    components: { AppButton, AppInput, AppLabel },
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        handleSubmit(e: any) {
            console.log(this);
            console.log(this.email);
            console.log(this.password);
        },
    },
    setup() {
        const { mutate: signIn } = useMutation(gql`
            mutation signIn($signInEmail: String!, $signInPassword: String!) {
                signIn(email: $signInEmail, password: $signInPassword) {
                    token
                }
            }
        `);

        return { signIn };
    },
});
</script>
