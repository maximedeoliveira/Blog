<template>
    <div v-for="post in posts" :key="post.id" class="mb-8 space-y-4">
        <div>
            <h2 class="mb-2 text-2xl font-bold text-gray-700">
                {{ post.title }}
            </h2>
            <div class="flex flex-wrap items-center space-x-4">
                <div class="flex items-center space-x-2">
                    <icon-clock class="w-4 text-gray-700 stroke-2" />
                    <p class="text-sm text-gray-700">
                        {{ formateDate(post.createdAt) }}
                    </p>
                </div>
                <div class="flex items-center space-x-2">
                    <icon-user class="w-4 text-gray-700 stroke-2" />
                    <p class="text-sm text-gray-700">{{ post.user.name }}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <icon-comment class="w-4 text-gray-700 stroke-2" />
                    <p class="text-sm text-gray-700">
                        {{ pluralize('commentaire', post.comment.length) }}
                    </p>
                </div>
            </div>
        </div>
        <p>{{ post.content.slice(0, 300) }} ...</p>
        <router-link
            :to="{
                name: routes.POST,
                params: { id: post.id, slug: post.slug },
            }"
        >
            <app-button
                button-type="link"
                class="flex items-center justify-center -ml-4 space-x-2"
            >
                <icon-arrow-right class="h-4" />
                <span>Lire la suite</span>
            </app-button>
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery, useResult } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { RoutesName } from '@/router/types';
import { formatFromTimestamp } from '@/utils/date';
import AppButton from '@/components/AppButton.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import IconClock from '@/components/icons/IconClock.vue';
import IconComment from '@/components/icons/IconComment.vue';
import IconUser from '@/components/icons/IconUser.vue';
import { pluralizeStr } from '@/utils/string';

export default defineComponent({
    components: { AppButton, IconArrowRight, IconClock, IconComment, IconUser },
    data() {
        return {
            routes: RoutesName,
        };
    },
    methods: {
        formateDate(date: string) {
            return formatFromTimestamp(date);
        },
        pluralize(str: string, count: number) {
            return pluralizeStr(str, count, 's');
        },
    },
    setup() {
        const { result } = useQuery(
            gql`
                query getAllPosts($published: Boolean) {
                    getAllPosts(published: $published) {
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
            { published: true },
            { fetchPolicy: 'cache-and-network' }
        );

        const posts = useResult(result, {}, (data) => data.getAllPosts);

        return { posts };
    },
});
</script>
