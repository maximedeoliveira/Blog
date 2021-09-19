import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { authenticated: false },
    },
    {
        path: '/account',
        name: 'Account',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Account.vue'),
        meta: { authenticated: true },
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        component: () =>
            import(/* webpackChunkName: "signIn" */ '../views/SignIn.vue'),
        meta: { authenticated: false },
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: () =>
            import(/* webpackChunkName: "signUp" */ '../views/SignUp.vue'),
        meta: { authenticated: false },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

const isAuthenticated = () => {
    let token = '';
    const item = localStorage.getItem('session');

    if (item) {
        const user = JSON.parse(item);
        token = user.token;
    }

    return token !== '';
};

router.beforeEach((to, from, next) => {
    if (to.meta.authenticated === true && !isAuthenticated()) {
        next({ name: 'SignIn' });
    } else if (
        (to.name === 'SignIn' || to.name === 'SignUp') &&
        isAuthenticated()
    ) {
        next({ name: 'Home' });
    } else {
        next();
    }
});

export default router;
