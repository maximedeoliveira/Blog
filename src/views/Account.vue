<template>
    <div>
        <h1>This is an account page</h1>
    </div>
    <ul v-if="result">
        <li>{{ result.me.id }}</li>
        <li>{{ result.me.name }}</li>
        <li>{{ result.me.email }}</li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default defineComponent({
    setup() {
        const { result } = useQuery(gql`
            query me {
                me {
                    id
                    name
                    email
                    createdAt
                    updatedAt
                }
            }
        `);

        return { result };
    },
});
</script>
