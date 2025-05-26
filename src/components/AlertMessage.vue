<template>
    <div
        v-if="visible"
        :class="[
        'w-full p-4 mb-4 rounded border',
        type === 'success' && 'bg-green-100 text-green-800 border-green-400',
        type === 'danger' && 'bg-red-100 text-red-800 border-red-400',
        type === 'info' && 'bg-blue-100 text-blue-800 border-blue-400',
        ]"
    >
        <div class="flex justify-between items-center">
        <span>{{ message }}</span>
        <button
            @click="visible = false"
            class="ml-4 text-sm font-bold focus:outline-none"
            :class="{
            'text-green-800': type === 'success',
            'text-red-800': type === 'danger',
            'text-blue-800': type === 'info'
            }"
        >
            ✕
        </button>
        </div>
    </div>
</template>

<script>
    export default {
    name: 'AlertMessage',
    props: {
        message: {
        type: String,
        required: true,
        },
        type: {
        type: String,
        default: 'info', // puede ser: success, danger, info
        },
    },
    data() {
        return {
        visible: true,
        };
    },
    };
</script>
