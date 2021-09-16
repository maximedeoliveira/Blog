<template>
    <div class="flex items-center justify-between py-6">
        <div>
            <router-link to="/">
                <img src="../assets/logo.png" alt="Logo" class="w-16" />
            </router-link>
        </div>
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <div class="flex space-x-4">
            <app-button buttonType="link">
                <router-link to="/sign-in">Sign in</router-link>
            </app-button>
            <app-button>
                <router-link to="/sign-up">Sign up</router-link>
            </app-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppButton from './AppButton.vue';

export default defineComponent({
    components: { AppButton },
});
</script>
