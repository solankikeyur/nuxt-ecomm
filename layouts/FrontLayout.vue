<template>
    <Navbar></Navbar>
    <slot />
</template>
<script setup>
import Navbar from '~/components/front/Navbar.vue';
</script>

<style scoped>
a.router-link-active {
    color: #1A56DB
}
</style>