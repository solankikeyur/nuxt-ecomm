<template>
  <tr
    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      {{ cartItem.name }}
    </td>
    <td class="px-6 py-4">
      <div class="flex items-center space-x-3">
        <div class="flex items-center space-x-3">
          <button
            class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            @click="customerStore.decreaseQty(cartItem.id)"
          >
            <span class="sr-only">Quantity button</span>
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div>
            <span
              class="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >{{ cartItem.qty }}</span
            >
          </div>
          <button
            class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            @click="customerStore.increaseQty(cartItem.id)"
          >
            <span class="sr-only">Quantity button</span>
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      Rs {{ cartItem.price }}
    </td>
    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      Rs {{ cartItem.price * cartItem.qty }}
    </td>
    <td class="px-6 py-4">
      <button
        class="font-medium text-red-600 dark:text-red-500 hover:underline"
        @click="removeCartItem(cartItem.id)"
      >
        Remove
      </button>
    </td>
  </tr>
</template>

<script setup>
import useCustomerStore from "~/stores/customer";
const props = defineProps({
  cartItem: Object,
});
const { cartItem } = toRefs(props);
const customerStore = useCustomerStore();
const snackbar = useSnackbar();

const removeCartItem = (id) => {
  if (confirm("Are you sure ?")) {
    customerStore.removeCartItem(id);
    snackbar.add({
      type: "success",
      text: "Removed from cart",
    });
  }
};
</script>
