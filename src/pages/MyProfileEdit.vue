<script>
import MainH1 from '../components/MainH1.vue';
import { subscribeToAuthState, updateAuthProfile } from '../services/auth';

export default {
    name:'MyProfileEdit',
    components: {MainH1,},
    data(){
        return {
            profile: {
                bio:'',
                display_name: '',
                career:'',
            },
            editing: false,
        };
    },
    methods: {
        async handleSubmit(){
            try {
                this.editing = true;
                await updateAuthProfile({...this.profile})
                this.editing = false;
            } catch (error) {
                
            }
        }
    },
    mounted(){
        subscribeToAuthState(newUserData => {
            this.profile = {
                bio:newUserData.bio,
                display_name:newUserData.display_name,
                career:newUserData.career,
            }
        });
    }
}
</script>

<template>
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
            <label for="career" class="block mb-2">Carrera</label>
            <input
                v-model="profile.career"
                type="text"
                id="career"
                class="w-full p-2 border border-gray-400 rounded">
        </div>
            <button type="submit" class="transition-colors py-2 px-4 rounded bg-blue-600 text-white focus:bg-blue-500 hover:bg-blue-500">Actualizar perfil</button>
    </form>
</template>