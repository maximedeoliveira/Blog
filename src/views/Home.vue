<template>
    <div>
        <h1>This is a home page</h1>
    </div>
    <div>
        <ul v-if="result">
            <li v-for="post in result.getAllPosts" :key="post.id">
                <router-link
                    :to="{
                        name: routes.POST,
                        params: { id: post.id, slug: post.slug },
                    }"
                >
                    {{ post.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { RoutesName } from '@/router/types';

export default defineComponent({
    data() {
        return {
            routes: RoutesName,
        };
    },
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
