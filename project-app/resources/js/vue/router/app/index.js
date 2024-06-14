import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: "active",
    routes: [{
        name: 'login',
        path: '/login',
        component: () => import('@pages/auth/Login.vue')
    },
    {
        name: 'home',
        path: '/',
        component: () => import('@pages/auth/Login.vue')
    },
]
})

export default router;