<template>
    <a href="#" :class="className">{{ label }}</a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        label: { type: String, required: true },
        type: { type: String, required: false, default: 'primary' },
    },
    computed: {
        className: function () {
            if (this.type === 'link') {
                return 'whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:text-indigo-700';
            }

            return 'whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700';
        },
    },
});
</script>
