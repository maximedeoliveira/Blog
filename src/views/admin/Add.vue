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
            <app-label id="slug">Slug</app-label>
            <app-input
                id="slug"
                type="text"
                is-required
                placeholder=""
                :value="postSlug"
                v-model:modelValue="postSlug"
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
        <div class="flex flex-col space-y-2">
            <app-label id="slug">Publier</app-label>
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
                :class="{ 'bg-indigo-600': postPublished }"
                :aria-checked="postPublished?.toString() ?? false"
                @click="setPublished()"
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
                    :class="{ 'translate-x-4': postPublished }"
                ></div>
            </div>
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
import { useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import gql from 'graphql-tag';
import { RoutesName } from '@/router/types';

export default defineComponent({
    components: { AppLabel, AppInput, AppTextarea, AppButton, IconSpinner },
    setup() {
        const router = useRouter();

        const postTitle = ref('');
        const postSlug = ref('');
        const postContent = ref('');
        const postPublished = ref(false);

        const { mutate: createPost, loading } = useMutation(
            gql`
                mutation CreatePostMutation(
                    $title: String!
                    $slug: String!
                    $content: String!
                    $published: Boolean
                ) {
                    createPost(
                        title: $title
                        slug: $slug
                        content: $content
                        published: $published
                    ) {
                        id
                    }
                }
            `
        );

        const handleSubmit = () => {
            createPost({
                title: postTitle.value,
                content: postContent.value,
                slug: postSlug.value,
                published: postPublished.value,
            }).then(() => {
                router.push({ name: RoutesName.ADMIN_POSTS });
            });
        };

        const setPublished = () => {
            postPublished.value = !postPublished.value;
        };

        return {
            postTitle,
            postSlug,
            postContent,
            postPublished,
            setPublished,
            handleSubmit,
            loading,
        };
    },
});
</script>
