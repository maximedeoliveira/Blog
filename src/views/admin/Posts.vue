<template>
    <div class="flex flex-row p-4">
        <p class="flex-1 font-bold text-gray-700">Titre</p>
        <p class="w-1/6 font-bold text-gray-700">Publié</p>
        <p class="w-1/6 font-bold text-gray-700">Actions</p>
    </div>
    <div
        v-for="post in posts"
        :key="post.id"
        class="flex flex-row p-4 mb-4 bg-white rounded-md shadow-md"
    >
        <p class="flex-1 text-gray-700">{{ post.title }}</p>
        <div class="w-1/6">
            <div
                class="
                    flex
                    items-center
                    w-10
                    h-6
                    p-1
                    duration-300
                    bg-gray-300
                    rounded-full
                    cursor-pointer
                "
                :class="{ 'bg-indigo-600': post.published }"
                :aria-checked="post.published?.toString() ?? false"
                @click="publish(post.id, !post.published)"
            >
                <div
                    class="
                        w-4
                        h-4
                        duration-300
                        transform
                        bg-white
                        rounded-full
                        shadow-md
                    "
                    :class="{ 'translate-x-4': post.published }"
                ></div>
            </div>
        </div>
        <router-link
            class="w-1/6"
            :v-if="post"
            :to="{
                name: routes.ADMIN_EDIT_POST,
                params: { id: post.id },
            }"
        >
            <app-button buttonType="link" :padding="false">Editer</app-button>
        </router-link>
    </div>
</template>

<script lang="ts">
import { RoutesName } from '@/router/types';
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { defineComponent } from 'vue';
import AppButton from '@/components/AppButton.vue';

export default defineComponent({
    components: { AppButton },
    data() {
        return {
            routes: RoutesName,
        };
    },
    methods: {
        publish(id: string, published: boolean): void {
            this.publishPost({ id, published }).then();
        },
    },
    setup() {
        const { result } = useQuery(
            gql`
                query getAllPosts {
                    getAllPosts {
                        id
                        title
                        slug
                        content
                        published
                        createdAt
                        user {
                            id
                            name
                            email
                        }
                        comment {
                            id
                        }
                    }
                }
            `,
            null,
            {
                fetchPolicy: 'cache-and-network',
            }
        );

        const posts = useResult(result, {}, (data) => data.getAllPosts);

        const { mutate: publishPost } = useMutation(
            gql`
                mutation UpdatePostMutation($id: String!, $published: Boolean) {
                    updatePost(id: $id, published: $published) {
                        id
                        title
                        slug
                        content
                        published
                        createdAt
                        user {
                            id
                            name
                            email
                        }
                        comment {
                            id
                        }
                    }
                }
            `
        );

        return { posts, publishPost };
    },
});
</script>
