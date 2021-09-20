import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import { Routes, RoutesName } from './types';

const routes = [
    Routes[RoutesName.HOME],
    Routes[RoutesName.ACCOUNT],
    Routes[RoutesName.SIGN_IN],
    Routes[RoutesName.SIGN_UP],
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
        next({ name: RoutesName.HOME });
    } else if (
        (to.name === RoutesName.SIGN_IN || to.name === RoutesName.SIGN_UP) &&
        isAuthenticated()
    ) {
        next({ name: RoutesName.HOME });
    } else {
        next();
    }
});

export default router;
