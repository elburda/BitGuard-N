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
    components: { MainH1,MainLoader, MainButton},

    data() {
        return {
            user: {
                id: null,
                email: null,
                display_name: null,
                bio: null,
                career: null,
            },
            messages: [],
            loadingMessages: false,

            newMessage: {
                body: '',
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
        }
    },
    async mounted() {

        subscribeToAuthState(newUserData => this.user = newUserData);
        receiveGlobalChatMessages(async newReceivedMessage => {
            this.messages.push(newReceivedMessage);
            
            await nextTick();
            this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
        });

        try {
            this.loadingMessages = true;
            this.messages = await getGlobalChatLastMessages();
            this.loadingMessages = false;
            await nextTick();

            this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
        } catch (error) {
        }
    }
}
</script>

<template>
    <MainH1>Chat global</MainH1>

    <div class="flex gap-4">

        <div 
            ref="chatContainer"
            class="overflow-y-auto w-9/12 h-100 p-4 border border-gray-400 rounded">
            <h2 class="sr-only">Lista de Mensajes</h2>

            <ul 
                v-if="!loadingMessages"
                class="flex flex-col gap-4">

                <li
                    v-for="message in messages"
                    class="flex flex-col gap-0.5">

                    <div>
                        <RouterLink
                        :to="`/usuario/${message.sender_id}`"
                        class="text-blue-700 font-bold underline"
                        >
                        {{ message.email }}
                        </RouterLink> dijo:
                    </div>
                    <div>{{ message.body }}</div>
                    <div class="text-sm text-gray-500">{{ message.created_at }}</div>
                </li>
            </ul>
            <MainLoader v-else/>
        </div>
        <div class="col-3/12">
            <h2 class="mb-4 text-xl">Crear publicación</h2>

            <form 
                action="#"
                @submit.prevent="() => sendMessage()">

                <div class="mb-3">
                    <span for="email" class="block mb-2">Email</span>
                    <div class="font-bold">{{ user.email }}</div>
                </div>
                <div class="mb-3">
                    <label for="body" class="block mb-2">Mensaje</label>
                    <textarea
                        v-model="newMessage.body"
                        id="body"
                        class="w-full p-2 border border-gray-400 rounded">
                    </textarea>
                </div>
                <MainButton type="submit">Enviar</MainButton>
            </form>
        </div>
    </div>
</template>