<script>
import { RouterLink } from 'vue-router';
import MainH1 from '../components/MainH1.vue';
import { subscribeToAuthState } from '../services/auth';

export default {
    name: 'MyProfile',
    components: { MainH1 },
    data() {
        return {
            user:{
                id: null,
                email: null,
                bio: null,
                display_name: null,
                career: null,
            }
        }
    },
    mounted() {
        subscribeToAuthState(newUserData => this.user = newUserData);
    }
}
</script>

<template>
    <div class="flex items-end gap-4">
        <MainH1>Mi perfil</MainH1>
        <RouterLink to="mi-perfil/editar" class="mb-4 text-blue-700">Editar</RouterLink>
    </div>


    <div class="px-4 mb-4 italic">{{ user.bio || 'Acá va mi biografi...' }}</div>
    <dl>
        <dt class="font-bold">Email</dt>
        <dd class="mb-2">{{ user.email }}</dd>
        <dt class="font-bold">Nombre de usuario</dt>
        <dd class="mb-2">{{ user.display_name || 'Sin especificar' }}</dd>
        <dt class="font-bold">Carrera</dt>
        <dd class="mb-2">{{ user.career || 'Sin especificar' }}</dd>
    </dl>
</template>