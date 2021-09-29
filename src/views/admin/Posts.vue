<template>
    <div v-for="post in posts" :key="post.id">
        <div class="flex p-4 mb-4 bg-white rounded-md shadow-md">
            <div class="flex space-x-4">
                <p>{{ post.id }}</p>
                <p>{{ post.title }}</p>
                <div>
                    <input
                        type="checkbox"
                        name="published"
                        :value="post.id"
                        @change="publish(post.id, !post.published)"
                    />
                </div>
                <p>{{ post.published }}</p>
            </div>
            <div class="ml-auto">
                <router-link
                    :to="{ name: routes.ADMIN_POST, params: { id: post.id } }"
                >
                    <app-button buttonType="link" :padding="false">
                        Edit
                    </app-button>
                </router-link>
            </div>
        </div>
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
        const { result } = useQuery(gql`
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
        `);

        const posts = useResult(
            result,
            {
                id: '',
                title: '',
                slug: '',
                content: '',
                published: false,
                createdAt: '',
                user: {
                    id: '',
                    name: '',
                    email: '',
                },
                comment: [],
            },
            (data) => data.getAllPosts
        );

        const { mutate: publishPost } = useMutation(
            gql`
                mutation UpdatePostMutation($id: String!, $published: Boolean) {
                    updatePost(id: $id, published: $published) {
                        id
                        published
                    }
                }
            `
        );

        return { posts, publishPost };
    },
});
</script>
