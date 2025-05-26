<script>
import { RouterLink } from 'vue-router';
import MainH1 from '../components/MainH1.vue';
import AlertMessage from '../components/AlertMessage.vue';

import { subscribeToAuthState } from '../services/auth';

export default {
    name: 'MyProfile',
    components: { MainH1, AlertMessage },
    data() {
        return {
        user: {
            id: null,
            email: null,
            bio: null,
            display_name: null,
            career: null,
        },
        successMessage: ''
        };
    },
    mounted() {
        subscribeToAuthState(newUserData => this.user = newUserData);

        if (this.$route.query.success === 'true') {
        this.successMessage = 'El perfil fue actualizado con éxito';
        this.$router.replace({ path: this.$route.path });
        }
    }
};
</script>

<template>
        <AlertMessage 
            v-if="successMessage"
            :message="successMessage"
            type="success"
        />
    <div class="mx-auto max-w-[900px] w-full px-4 sm:px-8 py-10 mt-20 bg-white shadow rounded-xl">
        <div class="flex items-center gap-6 mb-6">
        <div class="w-28 h-28 bg-gray-300 rounded-full border-4 border-white shadow-md"></div>
        <div class="flex-1">
            <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold text-gray-800">
                {{ user.display_name || 'Mi perfil' }}
            </h1>
            <RouterLink
                to="mi-perfil/editar"
                class="text-sm text-blue-600 hover:underline"
            >
                Editar
            </RouterLink>
            </div>
        </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
        <div>
            <dt class="font-semibold">Biografía</dt>
            <dd class="mb-2">{{ user.bio || 'Acá va mi biografi...' }}</dd>
        </div>
        <div>
            <dt class="font-semibold">Email</dt>
            <dd class="mb-2">{{ user.email }}</dd>
        </div>
        <div>
            <dt class="font-semibold">Carrera</dt>
            <dd class="mb-2">{{ user.career || 'Sin especificar' }}</dd>
        </div>
        </div>
    </div>
</template>




