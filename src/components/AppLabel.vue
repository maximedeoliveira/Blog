<template>
    <label :for="id" class="font-semibold text-gray-700"><slot></slot></label>
</template>

<script lang="ts">
export default {
    props: {
        id: { type: String, required: true },
    },
};
</script>
