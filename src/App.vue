<template>
    <div class="flex flex-col h-screen px-4 mx-auto max-w-7xl sm:px-6">
        <div v-if="hideHeader == false">
            <app-header />
        </div>
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/AppHeader.vue';

export default defineComponent({
    components: { AppHeader },
    computed: {
        hideHeader() {
            return ['/sign-in', '/sign-up'].includes(this.$route.path);
        },
    },
    methods: {},
});
</script>

<style></style>
