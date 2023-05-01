<template>
  <FrontLayout>
    <div class="m-6">
      <ul
        class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
      >
        <li class="mr-2">
          <NuxtLink
            to="/myaccount"
            class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >Profile</NuxtLink
          >
        </li>
        <li class="mr-2">
          <NuxtLink
            to="/myaccount/order"
            class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >My Order(s)</NuxtLink
          >
        </li>
      </ul>
      <NuxtPage></NuxtPage>
    </div>
  </FrontLayout>
</template>

<style scoped>
a.router-link-exact-active {
    background: #F3F4F6;
    color: #1A56DB
}
</style>

<script setup>
import { storeToRefs } from "pinia";
import FrontLayout from "~/layouts/FrontLayout.vue";
import useCustomerStore from "~/stores/customer";

const customerStore = useCustomerStore();
const { customer, isLoggedIn } = storeToRefs(customerStore);
definePageMeta({
  middleware: "auth-customer",
});
</script>
