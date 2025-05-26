<script>
import { logout, subscribeToAuthState } from './services/auth';
import logo from './assets/iso-03.png';




export default {
    name: 'App',
    data(){
        return{
            user: {
                id: null,
                email:null,
                bio: null,
                display_name: null,
                career: null,
            },
            logo
        };
    },
    methods:{
        handleLogout(){
            logout();
            this.$router.push({ path: '/ingresar', query: { loggedOut: 'true' } });
        }
    },
    async mounted(){
        subscribeToAuthState(newUserData => this.user = newUserData);
    }
}
</script>

<template>
    <div class="flex flex-col min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#D7DDFF] text-black">
        <nav class="flex items-center justify-center h-27 gap-8 p-4 bg-gradient-to-b from-[#287AE6] to-[#0C4EA4] text-white">
            <RouterLink to="/" class="inline-block w-22">
                <img 
                    :src="logo" 
                    alt="BitGuard logo" 
                    class="w-full h-auto" 
                />
            </RouterLink>
            <ul class="flex gap-4">
                <li>
                    <RouterLink to="/" class="inline-block hover:text-[#00FFC3] transform transition-transform duration-300 ease-in-out hover:scale-110" >Home</RouterLink>
                </li>
                <template v-if="user.id !== null">
                    <li>
                        <RouterLink to="/chat" class="inline-block hover:text-[#00FFC3] transform transition-transform duration-300 ease-in-out hover:scale-110">Muro</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/mi-perfil" class="inline-block hover:text-[#00FFC3] transform transition-transform duration-300 ease-in-out hover:scale-110">Perfil</RouterLink>
                    </li>
                    <li>
                        <form 
                            action="#"
                            @submit.prevent="handleLogout"
                        >
                        <button 
                                type="submit"
                                class="hover:underline cursor-pointer"
                            >
                                {{ user.email }} (Cerrar sesión)
                        </button>
                        </form>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <RouterLink to="/ingresar" class="inline-block hover:text-[#00FFC3] transform transition-transform duration-300 ease-in-out hover:scale-110">Ingresar</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/crear-cuenta" class="inline-block hover:text-[#00FFC3] transform transition-transform duration-300 ease-in-out hover:scale-110">Crear cuenta</RouterLink>
                    </li>
                </template>
            </ul>
        </nav>
        <main class="container p-4 mx-auto flex-grow">
            <RouterView />
        </main>
        <footer class="flex justify-center items-center h-25 bg-[#474747] text-white">
            <p>BitGuard &copy; 2025</p>
        </footer>
    </div>
</template>