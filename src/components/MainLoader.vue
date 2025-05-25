<template>
    <div class="loader">
        <div class="sr-only">Cargando...</div>
    </div>
</template>

<!-- <style>

    .loader {
    width: 40px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #f03355;
    clip-path: polygon(0 0,100% 0,100% 100%,0 100%);
    animation: l1 2s infinite cubic-bezier(0.3,1,0,1);
    }
    @keyframes l1 {
    33% {border-radius: 0;background: #514b82 ;clip-path: polygon(0 0,100% 0,100% 100%,0 100%)}
    66% {border-radius: 0;background: #ffa516 ;clip-path: polygon(50% 0,50% 0,100% 100%,0 100%)}
    }
</style> -->

<style>
    .loader {
    width: 50px;
    aspect-ratio: 1;
    display: grid;
    border: 4px solid #0000;
    border-radius: 50%;
    border-right-color: #25b09b;
    animation: l15 1s infinite linear;
    }
    .loader::before,
    .loader::after {    
    content: "";
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 50%;
    animation: l15 2s infinite;
    }
    .loader::after {
    margin: 8px;
    animation-duration: 3s;
    }
    @keyframes l15{ 
    100%{transform: rotate(1turn)}
    }
</style>