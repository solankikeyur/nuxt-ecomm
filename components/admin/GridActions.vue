<template>
  <button
    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    @click="emit('edit', props.id)"
  >
    Edit
  </button>
  <button
    class="font-medium text-blue-600 dark:text-blue-500 hover:underline pl-4"
    @click="emit('delete', props.id)"
  >
    Delete
  </button>
</template>

<script setup>
const emit = defineEmits(["edit", "delete"]);
const props = defineProps({
  id: Number
})
</script>
