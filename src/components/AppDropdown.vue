<template>
    <div class="relative inline-block text-left">
        <button
            @click.prevent="open()"
            type="button"
            class="
                inline-flex
                items-center
                w-full
                px-4
                py-2
                font-medium
                text-gray-700
                border-gray-300
                rounded-md
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-gray-100
                focus:ring-indigo-500
            "
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            ref="dropdownButton"
        >
            {{ title }}
            <icon-bottom-carret />
        </button>
        <div
            v-if="isOpen === true"
            class="
                absolute
                right-0
                w-56
                mt-2
                origin-top-right
                bg-white
                rounded-md
                shadow-lg
                ring-1 ring-black ring-opacity-5
                focus:outline-none
            "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconBottomCarret from './icons/IconBottomCarret.vue';

export default defineComponent({
    components: { IconBottomCarret },
    props: {
        title: { type: String, required: true },
    },
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
        open() {
            const listener = (e: Event) => {
                const button = this.$refs.dropdownButton;
                if (this.isOpen && button !== e.target) {
                    window.removeEventListener('click', listener);
                    this.isOpen = false;
                }
            };

            window.addEventListener('click', listener);

            this.isOpen = !this.isOpen;
        },
    },
});
</script>
