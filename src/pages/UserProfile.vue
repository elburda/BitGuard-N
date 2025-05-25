<script>
import MainH1 from '../components/MainH1.vue';
import MainLoader from '../components/MainLoader.vue';
import { getUserProfileById } from '../services/user-profiles';

export default {
    name: 'UserProfile',
    components: { MainH1, MainLoader},
    data() {
        return {
            user:{
                id: null,
                email: null,
                bio: null,
                display_name: null,
                career: null,

            },
            loadingUser: false,
        }
    },
    async mounted() {
        try {
            this.loadingUser = true;
            this.user = await getUserProfileById(this.$route.params.id);
            this.loadingUser = false;
        } catch (error) {
            console.error(error)
        }
    },
}
</script>

<template>
    <template v-if="!loadingUser">
        <div class="w-full px-4 sm:px-8 py-6 bg-white shadow rounded-lg">
            <div class="flex items-center gap-6 mb-6">
                <div class="w-28 h-28 bg-gray-300 rounded-full border-4 border-white shadow-md"></div>
                <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <h1 class="text-3xl font-bold text-gray-800">
                        {{ user.display_name || 'Perfil de ' + user.email }}
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
                        <dt class="font-semibold">Nombre de usuario</dt>
                        <dd class="mb-2">{{ user.display_name || 'Sin especificar' }}</dd>
                    </div>
                    <div>
                        <dt class="font-semibold">Carrera</dt>
                        <dd class="mb-2">{{ user.career || 'Sin especificar' }}</dd>
                    </div>
            </div>
        </div>
    </template>

    <MainLoader v-else />
</template>
