<template>
  <div
    class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <img
        class="p-4 rounded-t-lg w-full"
        src="https://picsum.photos/200"
        alt="product image"
      />
    </a>
    <div class="px-5 pb-5">
      <a href="#">
        <h5
          class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          {{ name }}
        </h5>
      </a>
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-gray-900 dark:text-white"
          >Rs {{ price }}</span
        >
        <NuxtLink
          v-if="customerStore.productExists(id)"
          to="/cart"
          class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >Go to cart</NuxtLink
        >
        <button
          v-else
          @click="addToCart(id, name, price)"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import useCustomerStore from "~/stores/customer";
const customerStore = useCustomerStore();
const snackbar = useSnackbar();
const props = defineProps({
  name: String,
  price: Number,
  id: Number,
});
const { name, price, id } = toRefs(props);
const addToCart = (id, name, price) => {
  customerStore.addToCart(id, name, price);
  snackbar.add({
    type: "success",
    text: "Added to cart.",
  });
};
</script>
