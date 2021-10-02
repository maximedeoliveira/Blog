<template>
    <div class="flex items-center justify-between py-6 mb-12">
        <div>
            <router-link to="/">
                <h1 class="text-4xl font-bold text-gray-700">Mon Super blog</h1>
            </router-link>
        </div>
        <div class="flex items-center space-x-4" v-if="isAuthenticated">
            <router-link :to="{ name: routesName.ADMIN_POSTS }">
                <app-button buttonType="link">Articles</app-button>
            </router-link>
            <router-link :to="{ name: routesName.ADMIN_ADD_POST }">
                <app-button>Ajouter un artcle</app-button>
            </router-link>
            <app-dropdown :title="getUser.name">
                <div class="p-1" role="none">
                    <router-link :to="{ name: routesName.ACCOUNT }">
                        <a
                            href="#"
                            class="
                                flex
                                items-center
                                px-4
                                py-2
                                font-medium
                                text-gray-700
                                rounded-md
                                hover:bg-indigo-600 hover:text-white
                                group
                            "
                            role="menuitem"
                            tabindex="-1"
                            id="menu-item-2"
                        >
                            <icon-user
                                class="
                                    w-5
                                    h-5
                                    mr-2
                                    text-indigo-600
                                    stroke-2
                                    group-hover:text-indigo-300
                                "
                            />
                            Mon compte
                        </a>
                    </router-link>
                </div>
                <div class="p-1 border-t" role="none">
                    <a
                        href="#"
                        @click.prevent="logout()"
                        class="
                            flex
                            items-center
                            px-4
                            py-2
                            font-medium
                            text-gray-700
                            rounded-md
                            hover:bg-indigo-600 hover:text-white
                            group
                        "
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-3"
                    >
                        <icon-logout
                            class="
                                w-5
                                h-5
                                mr-2
                                text-indigo-600
                                group-hover:text-indigo-300
                            "
                        />
                        Déconnexion
                    </a>
                </div>
            </app-dropdown>
        </div>
        <div v-else>
            <router-link :to="{ name: routesName.SIGN_IN }">
                <app-button buttonType="link">Sign in</app-button>
            </router-link>
            <router-link :to="{ name: routesName.SIGN_UP }">
                <app-button>Sign up</app-button>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { AuthActionsType } from '@/store/modules/auth/actions';
import { AuthGettersTypes } from '@/store/modules/auth/getters';
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import AppButton from './AppButton.vue';
import AppDropdown from './AppDropdown.vue';
import IconUser from './icons/IconUser.vue';
import IconLogout from './icons/IconLogout.vue';
import { RoutesName } from '@/router/types';

export default defineComponent({
    components: { AppButton, AppDropdown, IconUser, IconLogout },
    data() {
        return {
            routesName: RoutesName,
        };
    },
    computed: {
        ...mapGetters({
            isAuthenticated: AuthGettersTypes.IS_AUTHENTICATED,
            getUser: AuthGettersTypes.GET_USER,
        }),
    },
    methods: {
        ...mapActions({
            logout: AuthActionsType.LOGOUT,
        }),
    },
});
</script>
