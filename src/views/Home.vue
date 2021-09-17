<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
        <ul v-if="result">
            <li v-for="post in result.getAllPosts" :key="post.id">
                {{ post.id }} | {{ post.title }} | {{ post.slug }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

export default defineComponent({
    name: 'Home',
    components: {
        HelloWorld,
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
