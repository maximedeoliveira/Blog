<template>
    <div class="px-4 mx-auto max-w-7xl sm:px-6">
        <app-header />
        <router-view />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/AppHeader.vue';

export default defineComponent({
    components: { AppHeader },
});
</script>

<style></style>
