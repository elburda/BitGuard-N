<script>

export default {
    name: 'App',
}
</script>

<template>
    <nav class="flex items-center gap-8 p-4 bg-slate-300">
        <RouterLink class="text-lg" to="/">BitGuard</RouterLink>
        <ul class="flex gap-4">
            <li>
                <RouterLink to="/">Home</RouterLink>
            </li>
            <li>
                <RouterLink to="/chat">Chat Global</RouterLink>
            </li>
            <li>
                <RouterLink to="/ingresar">Ingresar</RouterLink>
            </li>
            <li>
                <RouterLink to="/crear-cuenta">Crear Cuenta</RouterLink>
            </li>
        </ul>
    </nav>
    <main class="container p-4 mx-auto">
        <RouterView />
    </main>
    <footer class="flex justify-center items-center h-25 bg-slate-800 text-white">
        <p>Da Vinci &copy; 2025</p>
    </footer>
</template>