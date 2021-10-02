import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

export enum RoutesName {
    HOME = 'Home',
    POST = 'Post',
    ACCOUNT = 'Account',
    SIGN_IN = 'SignIn',
    SIGN_UP = 'SignUp',
    ADMIN_POSTS = 'AdminPosts',
    ADMIN_EDIT_POST = 'AdminEditPost',
    ADMIN_ADD_POST = 'AdminAddPost',
}

export const Routes: Record<RoutesName, RouteRecordRaw> = {
    [RoutesName.HOME]: {
        name: RoutesName.HOME,
        path: '/',
        component: Home,
        meta: { authenticated: false },
    },
    [RoutesName.POST]: {
        name: RoutesName.POST,
        path: '/post/:id',
        component: () =>
            import(/* webpackChunkName: "Post" */ '../views/Post.vue'),
        meta: { authenticated: false },
    },
    [RoutesName.ACCOUNT]: {
        name: RoutesName.ACCOUNT,
        path: '/account',
        component: () =>
            import(/* webpackChunkName: "Account" */ '../views/Account.vue'),
        meta: { authenticated: true },
    },
    [RoutesName.SIGN_IN]: {
        name: RoutesName.SIGN_IN,
        path: '/sign-in',
        component: () =>
            import(/* webpackChunkName: "signIn" */ '../views/SignIn.vue'),
        meta: { authenticated: false },
    },
    [RoutesName.SIGN_UP]: {
        name: RoutesName.SIGN_UP,
        path: '/sign-up',
        component: () =>
            import(/* webpackChunkName: "SignUp" */ '../views/SignUp.vue'),
        meta: { authenticated: false },
    },
    [RoutesName.ADMIN_POSTS]: {
        name: RoutesName.ADMIN_POSTS,
        path: '/admin/posts',
        component: () =>
            import(/* webpackChunkName: "Posts" */ '../views/admin/Posts.vue'),
        meta: { authenticated: true },
    },
    [RoutesName.ADMIN_EDIT_POST]: {
        name: RoutesName.ADMIN_EDIT_POST,
        path: '/admin/post/edit/:id',
        component: () =>
            import(
                /* webpackChunkName: "EditPost" */ '../views/admin/Edit.vue'
            ),
        meta: { authenticated: true },
    },
    [RoutesName.ADMIN_ADD_POST]: {
        name: RoutesName.ADMIN_ADD_POST,
        path: '/admin/post/add',
        component: () =>
            import(/* webpackChunkName: "AddPost" */ '../views/admin/Add.vue'),
        meta: { authenticated: true },
    },
};
