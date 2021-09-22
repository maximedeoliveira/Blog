<template>
    <!-- <div>Post</div> -->
    <div class="flex flex-col mt-8 mb-8">
        <h1 class="mb-3 text-3xl font-bold text-center text-gray-700">
            {{ post.title }}
        </h1>
        <div class="flex items-center justify-center space-x-6">
            <div class="flex items-center space-x-2">
                <icon-user class="w-6 h-6 text-indigo-700" />
                <p class="text-sm text-gray-700">{{ post.user.name }}</p>
            </div>
            <div class="flex items-center space-x-2">
                <icon-clock class="w-6 h-6 text-indigo-700" />
                <p class="text-sm text-gray-700">
                    {{ formateDate(post.createdAt) }}
                </p>
            </div>
        </div>
    </div>
    <div>
        <p class="text-gray-700">{{ post.content }}</p>
    </div>
    <app-comment :post="post" :refetch="this.refetch" />
</template>

<script lang="ts">
import { useMutation, useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { DateTime } from 'luxon';
import IconUser from '@/components/icons/IconUser.vue';
import IconClock from '@/components/icons/IconClock.vue';
import AppComment from '@/components/AppComment.vue';
import { formatFromTimestamp } from '@/utils/date';

export default defineComponent({
    components: {
        AppComment,
        IconUser,
        IconClock,
    },
    methods: {
        formateDate(date: string) {
            return formatFromTimestamp(date);
        },
    },
    setup() {
        const router = useRouter();
        const { id: postId } = router.currentRoute.value.params;

        const { result, refetch } = useQuery(
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

        const post = useResult(
            result,
            { title: '', content: '' },
            (data) => data.getPostById
        );

        return {
            postId,
            post,
            refetch,
        };
    },
});
</script>
