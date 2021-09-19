<template>
    <button :class="className" :type="type">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        buttonType: { type: String, required: false, default: 'primary' },
        type: { type: String, required: false, default: '' },
        class: { type: String, required: false, default: '' },
    },
    computed: {
        className: function () {
            if (this.buttonType === 'link') {
                return `whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:text-indigo-700 ${this.class}`;
            }

            return `whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 ${this.class}`;
        },
    },
});
</script>
