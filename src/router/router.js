import { createRouter, createWebHistory } from 'vue-router';
import { subscribeToAuthState } from '../services/auth';
import Home from '../pages/Home.vue';
import GlobalChat from '../pages/GlobalChat.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import MyProfile from '../pages/MyProfile.vue';

const routes = [
    { path: '/',               component: Home, },
    { path: '/ingresar',       component: Login, },
    { path: '/crear-cuenta',   component: Register, },
    { path: '/chat',           component: GlobalChat, meta:{requiresAuth:true},},
    { path: '/mi-perfil',      component: MyProfile, meta:{requiresAuth:true},},
];

const router = createRouter({
    routes, // routes: routes,
    history: createWebHistory(),
});

let user= {
    id: null,
    email: null,
    bio: null,
    display_name: null,
    career: null,
}
subscribeToAuthState(newUserData => user = newUserData);
router.beforeEach((to,from) => {
    if(to.meta.requiresAuth && user.id === null) {
        return '/ingresar';
    }
});

export default router;