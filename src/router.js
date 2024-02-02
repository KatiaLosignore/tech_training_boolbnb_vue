import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppApartmentList from './pages/AppApartmentList.vue';
import SingleApartment from './pages/SingleApartment.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/apartments',
            name: 'apartment_list',
            component: AppApartmentList
        },
        {
            path: '/apartment/:slug',
            name: 'single-apartment',
            component: SingleApartment
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        }
    ]
});

export { router };