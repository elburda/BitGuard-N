<script>
import MainButton from '../components/MainButton.vue';
import MainH1 from '../components/MainH1.vue';
import { login } from '../services/auth';
import AlertMessage from '../components/AlertMessage.vue';

export default {
    name: 'Login',
    components: { MainH1, MainButton,AlertMessage},
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            loading: false,
            errorMessage: '',
            successMessage: '',
        }
    },
    methods: {
        validateForm() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.user.email || !this.user.password) {
                this.error = 'Todos los campos son obligatorios.';
                return false;
            }
            if (!emailRegex.test(this.user.email)) {
                this.error = 'El email no es válido.';
                return false;
            }
            if (this.user.password.length < 6) {
                this.error = 'La contraseña debe tener al menos 6 caracteres.';
                return false;
            }
            this.error = '';
            return true;
        },
        async handleSubmit() {
            if (!this.validateForm()) return;
            try {
                this.loading = true;
            await login(this.user.email, this.user.password);
                this.$router.push({ path: '/mi-perfil', query: { loginSuccess: 'true' } });
            } catch (error) {
                this.error = 'Credenciales incorrectas.';
            } finally {
                this.loading = false;
            }
            
        }
    },
    mounted() {
        if (this.$route.query.success === 'true') {
            this.successMessage = 'Tu cuenta fue creada con éxito.';
            this.$router.replace({ path: this.$route.path });
        }
        else if (this.$route.query.loggedOut === 'true') {
            this.successMessage = 'Sesión cerrada con éxito.';
            this.$router.replace({ path: this.$route.path });
        }
    }
}

</script>

<template>
    <div class="mt-15">
        <div class="min-h-[60px]">
            <AlertMessage 
                v-if="successMessage"
                :message="successMessage"
                type="success"
                :autoDismiss="true"
                @dismiss="successMessage = ''"
            />
        </div>

        <MainH1>Ingresar a mi cuenta</MainH1>

        <form action="#" 
            @submit.prevent="handleSubmit">

            <div v-if="error" class="text-red-600 mb-2">{{ error }}</div>
            <div class="mb-3">
                <label for="email" class="block mb-2">Email</label>
                <input
                    v-model="user.email"
                    type="email"
                    id="email"
                    class="w-full p-2 border border-gray-400 rounded">
            </div>
            <div class="mb-3">
                <label for="password" class="block mb-2">Contraseña</label>
                <input
                    v-model="user.password"
                    type="password"
                    id="password"
                    class="w-full p-2 border border-gray-400 rounded">
            </div>
            <MainButton type="submit" :disabled="loading">Login</MainButton>
        </form>
    </div>
    
</template>

