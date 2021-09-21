<template>
    <div>Post</div>
    <h1>{{ post.title }}</h1>
    <p>{{ post.createdAt }}</p>
    <div>
        <p>{{ post.content }}</p>
    </div>
    <div v-if="post.comment" class="mt-8">
        <ul v-for="comment in post.comment" :key="comment.id">
            <li>
                <div class="mb-4">
                    <p>{{ comment.id }}</p>
                    <p>{{ comment.content }}</p>
                    <p>{{ comment.user.name }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
    setup() {
        const router = useRouter();
        const { id } = router.currentRoute.value.params;

        const { result } = useQuery(
            gql`
                query Query($id: String!) {
                    getPostById(id: $id) {
                        id
                        title
                        slug
                        content
                        published
                        createdAt
                        updatedAt
                        publishedAt
                        user {
                            name
                            email
                            id
                        }
                        comment {
                            id
                            content
                            user {
                                name
                                email
                                id
                                createdAt
                                updatedAt
                            }
                            createdAt
                            updatedAt
                        }
                    }
                }
            `,
            {
                id: id,
            }
        );

        const post = useResult(result, null, (data) => data.getPostById);

        return { post };
    },
});
</script>
