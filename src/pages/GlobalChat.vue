<script>
import { nextTick } from 'vue';
import MainH1 from '../components/MainH1.vue';
import MainLoader from '../components/MainLoader.vue';
import MainButton from '../components/MainButton.vue';
import { receiveGlobalChatMessages, saveGlobalChatMessage, getGlobalChatLastMessages } from '../services/global-chat';
import { subscribeToAuthState } from '../services/auth';
import { RouterLink } from 'vue-router';

export default {
    name: 'GlobalChat',
    components: { MainH1, MainLoader, MainButton },

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
                imageFile: null,
            },
            comments: {},
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
                console.error("Error al enviar el mensaje:", error);
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
        },

        addComment(index) {
            const commentText = this.messages[index].newComment.trim();
            if (commentText) {
                this.messages[index].comments.push(commentText);
                this.messages[index].newComment = '';
            }
        },

        async loadInitialComments() {
            try {
                for (const message of this.messages) {
                    this.comments[message.id] = await loadComments(message.id);
                }
            } catch (error) {
                console.error("Error cargando comentarios:", error);
            }
        },
    },

    async mounted() {
        subscribeToAuthState(newUserData => this.user = newUserData);

        receiveGlobalChatMessages(async newReceivedMessage => {
            const newMessageWithComments = {
                ...newReceivedMessage,
                comments: [],
                newComment: ''
            };
            this.messages.unshift(newMessageWithComments);
            await nextTick();
        });

        try {
            this.loadingMessages = true;
            this.messages = await getGlobalChatLastMessages();
            this.messages = this.messages.map(msg => ({
                ...msg,
                comments: [],
                newComment: ''
            }));
            this.loadingMessages = false;
            await nextTick();
        } catch (error) {
            console.error("Error cargando mensajes:", error);
        }

        window.addEventListener('wheel', this.redirectScrollToChat, { passive: false });
    },

    beforeUnmount() {
        window.removeEventListener('wheel', this.redirectScrollToChat);
    }
};
</script>


<template>
  <!-- Espacio reservado para mensajes de éxito (evita saltos visuales) -->
    <div class="min-h-[50px] mb-4">
        <AlertMessage 
        v-if="successMessage"
        :message="successMessage"
        type="success"
        :autoDismiss="true"
        @dismiss="successMessage = ''"
        />
    </div>

    <!-- Contenedor principal -->
    <div class="mx-auto w-full max-w-4xl flex flex-col  px-5 ">

        <!-- Formulario de creación de publicación -->
<!-- Contenedor fijo y full width -->
    <div class="fixed top-[105px] pt-4 left-0 right-0 h-45 bg-white z-40">
    
    <!-- Contenido centrado y con ancho máximo -->
        <div class="mx-auto w-full max-w-[900px] px-4">
            <h2 class="sr-only">Crear publicación</h2>

                <form @submit.prevent="() => sendMessage()">
                    <div class="mb-3">
                        <label for="body" class="block mb-2">Crear publicación</label>
                        <textarea
                        v-model="newMessage.body"
                        id="body"
                        class="w-full p-2 border
                        border-gray-400 rounded resize-y max-h-[150px]">
                        </textarea>
                    </div>
                        <div class="flex justify-end">
                            <MainButton type="submit">Postear</MainButton>
                        </div>
                </form>
        </div>
    </div>


        <!-- Lista de mensajes -->

        <div ref="chatContainer " class="mt-40 overflow-y-auto scrollbar-hidden ">

        
        <h2 class="sr-only">Lista de Mensajes</h2>

        <ul
            v-if="!loadingMessages"
            class="flex flex-col gap-4 divide-y divide-gray-300"
        >
            <li
            v-for="(message, index) in messages"
            :key="message.id"
            class="flex flex-col gap-0.5 py-2"
            >
            <!-- Mensaje principal -->
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

            <!-- Comentarios existentes -->
            <div v-if="message.comments.length" class="ml-4 mt-2 space-y-1">
                <div
                v-for="(comment, cIndex) in message.comments"
                :key="cIndex"
                class="text-sm text-gray-700"
                >
                💬 {{ comment }}
                </div>
            </div>

            <!-- Agregar comentario -->
            <div class="mt-2 flex gap-2 items-center">
                <input
                v-model="message.newComment"
                type="text"
                class="flex-1 p-1 border border-gray-300 rounded text-sm"
                placeholder="Postea tu respuesta"
                />
                <MainButton
                @click="addComment(index)"
                class="px-3 py-1 text-sm"
                >
                Responder
                </MainButton>
            </div>
            </li>
        </ul>

        <div v-else class="flex justify-center items-center w-full py-8">
            <MainLoader />
        </div>
        </div>
    </div>
</template>
