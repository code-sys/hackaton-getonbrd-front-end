import { RouteInfo } from './interfaces';

const ROUTER_COMMON = [
    {
        path: '/home',
        title: 'inicio',
        id: 'sibar-home',
        icon: 'fa-solid fa-house',
        class: 'azure',
    },
    {
        path: '/jobs/jobs-list',
        title: 'Trabajos',
        id: 'sibar-contacts',
        icon: 'fa-solid fa-users',
        class: 'azure',
    },
    {
        path: '/user-profile',
        title: 'Perfil',
        id: 'btn-user-profile',
        icon: 'fa-solid fa-id-card',
        class: 'azure',
    },
];

export const ROUTES: RouteInfo[] = [...ROUTER_COMMON];
