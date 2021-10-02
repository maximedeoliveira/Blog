<template>
    <textarea
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :required="isRequired"
        :autocomplete="autocomplete"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="
            relative
            block
            w-full
            px-3
            py-2
            text-gray-900
            placeholder-gray-500
            border border-gray-300
            rounded-md
            appearance-none
            focus:outline-none
            focus:ring-indigo-500
            focus:border-indigo-500
            focus:z-10
            sm:text-sm
        "
    />
</template>

<script lang="ts">
export default {
    props: {
        id: { type: String, required: true, default: '' },
        type: { type: String, required: true, default: 'text' },
        placeholder: { type: String, required: false, default: '' },
        isRequired: { type: Boolean, required: false, default: false },
        autocomplete: { type: String, required: false, default: '' },
        modelValue: {
            type: String,
            default: '',
            required: true,
        },
    },
};
</script>
