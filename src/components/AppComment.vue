<template>
    <div class="mt-12">
        <p class="mb-4 text-2xl font-bold text-gray-700">
            Ajouter un commentaire
        </p>
        <form class="relative" @submit.prevent="handleSubmit" method="post">
            <div
                :class="
                    isAuthenticated === false ? 'p-4 space-y-4' : 'space-y-4'
                "
            >
                <div class="flex flex-col space-y-2">
                    <app-textarea
                        id="comment"
                        type="text"
                        is-required
                        placeholder="Commentaire"
                        v-model:modelValue="comment"
                    />
                </div>
                <app-button class="space-x" type="submit">
                    <icon-spinner v-if="loading" />
                    <span>Laisser un commentaire</span>
                </app-button>
            </div>
            <div
                class="
                    absolute
                    top-0
                    w-full
                    h-full
                    bg-indigo-700
                    rounded
                    bg-opacity-80
                "
                v-if="isAuthenticated === false"
            >
                <div
                    class="
                        flex flex-col
                        items-center
                        justify-center
                        w-full
                        h-full
                        space-y-2
                    "
                >
                    <p class="font-medium text-center text-white">
                        Vous devez être connecté pour ajouter un commentaire.
                    </p>
                    <app-button>
                        <router-link :to="{ name: routes.SIGN_IN }"
                            >Connexion</router-link
                        >
                    </app-button>
                </div>
            </div>
        </form>
    </div>
    <div v-if="post.comment.length > 0">
        <p class="mt-12 mb-4 text-2xl font-bold text-gray-700">
            {{ pluralize('commentaire', post.comment.length, 's') }} sur
            {{ post.title }}
        </p>
        <div v-if="post.comment">
            <div
                v-for="comment in post.comment"
                :key="comment.id"
                class="flex flex-row mb-8"
            >
                <div class="flex w-1 mr-4 bg-indigo-300 rounded-md" />
                <div class="flex flex-col flex-1 py-3 space-y-4">
                    <div class="flex items-center space-x-4">
                        <div>
                            <img
                                src="../assets/user.png"
                                class="w-12 rounded-full"
                            />
                        </div>
                        <div>
                            <p class="text-lg font-medium text-gray-700">
                                {{ comment.user.name }}
                            </p>
                            <p class="text-sm text-gray-600">
                                {{ formateDate(comment.user.createdAt) }}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p>{{ comment.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DateTime } from 'luxon';
import { useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import AppButton from '@/components/AppButton.vue';
import IconSpinner from '@/components/icons/IconSpinner.vue';
import AppTextarea from './AppTextarea.vue';
import { mapGetters } from 'vuex';
import { AuthGettersTypes } from '@/store/modules/auth/getters';
import { RoutesName } from '@/router/types';
import { pluralizeStr } from '@/utils/string';

export default defineComponent({
    components: {
        AppTextarea,
        AppButton,
        IconSpinner,
    },
    data() {
        return {
            comment: '',
            routes: RoutesName,
        };
    },
    props: {
        post: { type: Object, required: true },
        refetch: { type: Function, required: true },
    },
    methods: {
        formateDate(date: string) {
            const d = DateTime.fromMillis(parseInt(date));

            return `Le ${d.setLocale('fr').toFormat('dd LLLL yyyy à HH:mm')}`;
        },
        pluralize(str: string, count: number) {
            return pluralizeStr(str, count, 's');
        },
        handleSubmit() {
            if (!this.isAuthenticated) {
                return;
            }

            this.mutate({
                postId: this.post.id,
                content: this.comment,
            }).then(() => {
                this.refetch()?.then(() => {
                    this.comment = '';
                });
            });
        },
    },
    computed: {
        ...mapGetters({
            isAuthenticated: AuthGettersTypes.IS_AUTHENTICATED,
        }),
    },
    setup() {
        const { mutate, loading, error } = useMutation(
            gql`
                mutation CreateCommentMutation(
                    $content: String!
                    $postId: String!
                ) {
                    createComment(content: $content, postId: $postId) {
                        id
                        content
                        createdAt
                        updatedAt
                    }
                }
            `
        );

        return { mutate, loading, error };
    },
});
</script>
