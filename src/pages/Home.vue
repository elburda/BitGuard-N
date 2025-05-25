<script>
import MainH1 from '../components/MainH1.vue';
import logo from '../assets/iso-04.png';

export default {
  name: 'Home',
  components: { MainH1 },
  data() {
    return {
      logo,
    };
  },
}
</script>

<template>
    <div class="flex flex-col items-center justify-center text-center px-5">
        <MainH1 class="text-2xl font-bold my-4">¡Bienvenidos!</MainH1>
        <img 
            :src="logo" 
            alt="BitGuard logo" 
            class="w-60 h-auto my-10" 
        />

        <p class="text-gray-700 max-w-xl">
            Inventario, monitoreo y soporte tecnico.
        </p>
    </div>
</template>