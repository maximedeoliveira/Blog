<template>
    <form class="mt-8 space-y-6" @submit.prevent="handleSubmit" method="post">
        <div class="flex flex-col space-y-2">
            <app-label id="title">Titre</app-label>
            <app-input
                id="title"
                type="text"
                is-required
                placeholder=""
                :value="postTitle"
                v-model:modelValue="postTitle"
            />
        </div>
        <div class="flex flex-col space-y-2">
            <app-label id="content">Contenu</app-label>
            <app-textarea
                id="content"
                type="text"
                is-required
                placeholder=""
                :value="postContent"
                v-model:modelValue="postContent"
            />
        </div>
        <app-button class="space-x" type="submit">
            <icon-spinner v-if="loading" />
            <span>Valider</span>
        </app-button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppInput from '@/components/AppInput.vue';
import AppLabel from '@/components/AppLabel.vue';
import AppTextarea from '@/components/AppTextarea.vue';
import AppButton from '@/components/AppButton.vue';
import IconSpinner from '@/components/icons/IconSpinner.vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import gql from 'graphql-tag';
import { RoutesName } from '@/router/types';

export default defineComponent({
    components: { AppLabel, AppInput, AppTextarea, AppButton, IconSpinner },
    setup() {
        const router = useRouter();
        const { id: postId } = router.currentRoute.value.params;

        const postTitle = ref('');
        const postContent = ref('');

        const { onResult } = useQuery(
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
                id: postId,
            }
        );

        onResult((result) => {
            postTitle.value = result.data?.getPostById.title;
            postContent.value = result.data?.getPostById.content;
        });

        const { mutate: updatePost, loading } = useMutation(
            gql`
                mutation UpdatePostMutation(
                    $id: String!
                    $title: String
                    $content: String
                ) {
                    updatePost(id: $id, title: $title, content: $content) {
                        id
                    }
                }
            `
        );

        const handleSubmit = () => {
            updatePost({
                id: postId,
                title: postTitle.value,
                content: postContent.value,
            }).then(() => {
                router.push({ name: RoutesName.ADMIN_POSTS });
            });
        };

        return {
            postTitle,
            postContent,
            handleSubmit,
            loading,
        };
    },
});
</script>
