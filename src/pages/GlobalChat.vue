<script>
import { nextTick } from 'vue';
import MainH1 from '../components/MainH1.vue';
import { receiveGlobalChatMessages, saveGlobalChatMessage, getGlobalChatLastMessages } from '../services/global-chat';
import { subscribeToAuthState } from '../services/auth';
import { RouterLink } from 'vue-router';
import MainLoader from '../components/MainLoader.vue';
import MainButton from '../components/MainButton.vue';


export default {
    name: 'GlobalChat',
    components: { MainH1, MainLoader, MainButton },

    data() {
        return {
            user: {
                id: null,
                email: null,
                display_name: null,
            },
            messages: [],
            loadingMessages: false,
            successMessage: '',
            newMessage: {
                body: '',
                imageFile: null,
            },
        };
    },
    
    methods: {
        async sendMessage() {
            try {
                await saveGlobalChatMessage({
                    sender_id: this.user.id,
                    email: this.user.email,
                    body: this.newMessage.body,
                });

                this.newMessage.body = '';
            } catch (error) {
            }
        },
        redirectScrollToChat(e) {
            const container = this.$refs.chatContainer;
            if (!container) return;

            const hovered = document.elementFromPoint(e.clientX, e.clientY);
            if (!container.contains(hovered)) {
                container.scrollTop += e.deltaY;
                e.preventDefault();
            }
        },
        handleImageUpload(e) {
            const file = e.target.files[0];
            if (file) {
                this.newMessage.imageFile = file;
            }
        }
    },

    async mounted() {

        if (this.$route.query.loginSuccess === 'true') {
            this.successMessage = 'Has iniciado sesión con éxito.';
            this.$router.replace({ path: this.$route.path });
        }
        subscribeToAuthState(newUserData => this.user = newUserData);
        receiveGlobalChatMessages(async newReceivedMessage => {
            this.messages.push(newReceivedMessage);
            this.messages.unshift(newReceivedMessage);
            await nextTick();
        });

        try {
            this.loadingMessages = true;
            this.messages = await getGlobalChatLastMessages();
            this.loadingMessages = false;
            await nextTick();

        } catch (error) {
        }

        window.addEventListener('wheel', this.redirectScrollToChat, { passive: false });
    },

    beforeUnmount() {
        window.removeEventListener('wheel', this.redirectScrollToChat);
    }
}
</script>

<template>
    <div class="mx-auto flex flex-col">
        
        <div class="mx-auto overflow-y-auto w-9/12 pb-3">
            
            <h2 class="mb-4 text-xl">Crear publicación</h2>

            <form 
                action="#"
                @submit.prevent="() => sendMessage()">

                <div class="mb-1 flex">
                    <span for="email" class="block mb-2 pr-2">Email:</span>
                    <div class="font-bold">{{ user.email }}</div>
                </div>
                <div class="mb-3">
                    <label for="body" class="block mb-2">Mensaje</label>
                    <textarea
                        v-model="newMessage.body"
                        id="body"
                        class="w-full p-2 border border-gray-400 rounded resize-y max-h-[150px]">
                    </textarea>
                </div>
                <div class="mb-3">
                    <label for="image" class="block mb-2">Imagen (opcional)</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            @change="handleImageUpload"
                            class="block w-full text-sm text-gray-600"
                        />
                    </div>
                    <MainButton type="submit">Postear</MainButton>

            </form>
        </div>
        <div 
            ref="chatContainer"
            class="mx-auto overflow-y-auto w-9/12 h-100 scrollbar-hidden">
            <h2 class="sr-only">Lista de Mensajes</h2>
            <ul 
                v-if="!loadingMessages"
                class="flex flex-col gap-4 divide-y divide-gray-300">

                <li
                    v-for="message in messages"
                    class="flex flex-col gap-0.5 py-2">

                    <div>
                        <RouterLink
                        :to="`/usuario/${message.sender_id}`"
                        class="text-blue-800 font-bold underline"
                        >
                        {{ message.email }}
                        </RouterLink>
                    </div>
                    <div>{{ message.body }}</div>
                    <div class="text-sm text-green-600">
                        {{ new Date(message.created_at).toLocaleDateString() }}
                        {{ new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                    </div>
                </li>
            </ul>
            <div v-else class="flex justify-center items-center w-full">
                <MainLoader />
            </div>
        </div>
        
    </div>
</template>