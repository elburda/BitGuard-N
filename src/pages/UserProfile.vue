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
        <MainH1>Perfil de {{ user.email }}</MainH1>

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
    <MainLoader v-else />
</template>