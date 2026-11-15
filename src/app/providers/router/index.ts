import { createRouter, createWebHistory } from 'vue-router';
import { useSessionStore } from '@/entities/session';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: () => import('@/pages/home').then((m) => m.HomePage) },
        { path: '/about', name: 'about', component: () => import('@/pages/about').then((m) => m.AboutPage) },
        { path: '/login', name: 'login', component: () => import('@/pages/login').then((m) => m.LoginPage), meta: { guestOnly: true } },
        { path: '/users', name: 'users', component: () => import('@/pages/users').then((m) => m.UsersPage), meta: { requiresAuth: true } },
        { path: '/users/:id', name: 'user-details', component: () => import('@/pages/user-details').then((m) => m.UserDetailsPage), props: true, meta: { requiresAuth: true } },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/not-found').then((m) => m.NotFoundPage) },
    ],
});

router.beforeEach((to) => {
    const session = useSessionStore();
    if (to.meta.requiresAuth && !session.isAuthenticated) {
        return { name: 'login', query: { redirect: to.fullPath } };
    }
    if (to.meta.guestOnly && session.isAuthenticated) {
        return { name: 'users' };
    }
});

export default router;