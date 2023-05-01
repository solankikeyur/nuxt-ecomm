<template>
    <h1>Orders</h1>
</template>
<script setup>
const route = useRoute();
definePageMeta({
  key: route => route.fullPath
})
</script>
