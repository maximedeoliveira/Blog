<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex justify-between items-center py-6">
            <div>
                <img src="../assets/logo.png" alt="Logo" class="w-16" />
            </div>
            <div class="flex space-x-4">
                <app-button label="Sign in" type="link" />
                <app-button label="Sign up" />
            </div>
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
