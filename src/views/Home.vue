<template>
    <div>
        <h1>This is a home page</h1>
    </div>
    <div>
        <ul v-if="result">
            <li v-for="post in result.getAllPosts" :key="post.id">
                {{ post.id }} | {{ post.title }} | {{ post.slug }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default defineComponent({
    setup() {
        const { result } = useQuery(gql`
            query getAllPosts {
                getAllPosts {
                    id
                    title
                    slug
                    content
                    published
                }
            }
        `);

        return { result };
    },
});
</script>
