<template>
  <div class="mt-4">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <caption
        class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
      >
        Order(s)
      </caption>
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Order ID</th>
          <th scope="col" class="px-6 py-3">Total Amount</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody v-if="orders.length > 0">
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  v-for="order in orders">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
           #{{ order.id }}
          </th>
          <td class="px-6 py-4">Rs {{order.total_amount}}</td>
          <td class="px-6 py-4">{{order.status}}</td>
          <td class="px-6 py-4 text-right">
            <NuxtLink
              :to='`/order/${order.id}`'
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >View</NuxtLink
            >
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            colspan="25"
          >
            No order(s) found.
          </th>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
  
</template>
<script setup>
import useCustomerStore from "~/stores/customer";

definePageMeta({
  key: (route) => route.fullPath,
  middleware: "auth-customer",
});
const orders = ref([]);
const customerStore = useCustomerStore();

onMounted(async () => {
  const data = await customerStore.getOrders();
  console.log(data);
  if (data) {
    orders.value = data;
  }
});

</script>
