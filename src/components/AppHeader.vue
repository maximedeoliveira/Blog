<template>
    <div class="flex items-center justify-between py-6">
        <div>
            <router-link to="/">
                <img src="../assets/logo.png" alt="Logo" class="w-16" />
            </router-link>
        </div>
        <div id="nav">
            <router-link :to="{ name: routesName.HOME }">Home</router-link>
            |
            <router-link :to="{ name: routesName.ACCOUNT }">
                Account
            </router-link>
        </div>
        <div class="flex space-x-4" v-if="isAuthenticated">
            <app-button @click.prevent="logout()"> Logout </app-button>
        </div>
        <div v-else>
            <app-button buttonType="link">
                <router-link :to="{ name: routesName.SIGN_IN }"
                    >Sign in</router-link
                >
            </app-button>
            <app-button>
                <router-link :to="{ name: routesName.SIGN_UP }"
                    >Sign up</router-link
                >
            </app-button>
        </div>
    </div>
</template>

<script lang="ts">
import { AuthActionsType } from '@/store/modules/auth/actions';
import { AuthGettersTypes } from '@/store/modules/auth/getters';
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import AppButton from './AppButton.vue';
import { RoutesName } from '@/router/types';

export default defineComponent({
    components: { AppButton },
    data() {
        return {
            routesName: RoutesName,
        };
    },
    computed: {
        ...mapGetters({
            isAuthenticated: AuthGettersTypes.IS_AUTHENTICATED,
        }),
    },
    methods: {
        ...mapActions({
            logout: AuthActionsType.LOGOUT,
        }),
    },
});
</script>
