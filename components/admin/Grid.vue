<template>
  <button
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    Add Product
  </button>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3" v-for="column in columns">
            {{ column }}
          </th>
          <th scope="col" class="px-6 py-3" v-if="showActionCol">Action</th>
        </tr>
      </thead>
      <slot />
    </table>
  </div>
</template>
<script setup>
const props = defineProps({
  columns: Array,
  showActionCol: Boolean,
});
const { columns, showActionCol } = toRefs(props);
</script>
