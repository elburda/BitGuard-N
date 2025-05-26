<script>
import MainButton from '../components/MainButton.vue';
import MainH1 from '../components/MainH1.vue';
import AlertMessage from '../components/AlertMessage.vue';
import { subscribeToAuthState, updateAuthProfile } from '../services/auth';

export default {
    name: 'MyProfileEdit',
    components: {
        MainH1,
        MainButton,
        AlertMessage
    },

    data() {
        return {
            profile: {
                bio: '',
                display_name: '',
                sector: '',
                equipo: '',
                rustdesk: '',
            },
            editing: false,
            successMessage: '',
            // errorMessage: '',
        };
    },

    methods: {
    async handleSubmit() {
        try {
            this.editing = true;
            await updateAuthProfile({ ...this.profile });
            this.editing = false;
            this.$router.push({ 
                path: '/mi-perfil', 
                query: { success: 'true' }
            });
            } catch (error) {
                console.log("Error al actualizar perfil");
                this.editing = false;
            }
        },
    },
    mounted() {
        subscribeToAuthState(newUserData => {
            this.profile = {
            bio: newUserData.bio,
            display_name: newUserData.nombre_completo,
            sector: newUserData.carrera,
            equipo: newUserData.location,
            rustdesk: newUserData.linkedin,
            };
        });
        if (this.$route.query.success === 'true') {
            this.successMessage = 'El perfil fue actualizado con éxito';
        }
    }
}
</script>

<template>
    <AlertMessage
        v-if="errorMessage"
        :message="errorMessage"
        type="danger"
    />
    <MainH1>Editar mi perfil</MainH1>
    <form 
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-3">
                <label for="bio" class="block mb-2">Biografia</label>
                <textarea
                    v-model="profile.bio"
                    id="bio"
                    class="w-full p-2 border border-gray-400 rounded">
                </textarea>
        </div>
        <div class="mb-3">
            <label for="display_name" class="block mb-2">Nombre de usuario</label>
            <input
                v-model="profile.display_name"
                type="text"
                id="display_name"
                class="w-full p-2 border border-gray-400 rounded">
        </div>
        <div class="mb-3">
            <label for="career" class="block mb-2">sector</label>
            <input
                v-model="profile.sector"
                type="text"
                id="career"
                class="w-full p-2 border border-gray-400 rounded">
        </div>
        <div class="mb-3">
            <label for="location" class="block mb-2">Equipo</label>
            <input
                v-model="profile.equipo"
                type="text"
                id="location"
                class="w-full p-2 border border-gray-400 rounded">
        </div>
        <div class="mb-3">
            <label for="linkedin" class="block mb-2">Rustdesk</label>
            <input
                v-model="profile.rustdesk"
                type="text"
                id="linkedin"
                class="w-full p-2 border border-gray-400 rounded">
        </div>

            <MainButton type="submit">Actualizar mi perfil</MainButton>
    </form>
</template>