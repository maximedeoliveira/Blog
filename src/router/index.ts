import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        component: () =>
            import(/* webpackChunkName: "signIn" */ '../views/SignIn.vue'),
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: () =>
            import(/* webpackChunkName: "signUp" */ '../views/SignUp.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
