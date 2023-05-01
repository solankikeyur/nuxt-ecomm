<template>
  <FrontLayout>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg m-6">
      <h2
        class="m-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white"
      >
        My Cart
      </h2>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Row Total</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody v-if="customerStore.getCartItemCount > 0">
          <CartItem v-for="cartItem in customerStore.cart" :cart-item="cartItem" ></CartItem>
          <tr >
            <td></td>
            <td></td>
            <td></td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white bg-blue-200">
              Total Amount
            </td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white bg-blue-200">
                ${{ customerStore.getTotalCartAmount }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white" colspan="25">
              No products found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </FrontLayout>
</template>

<script setup>
import FrontLayout from "~/layouts/FrontLayout.vue";
import useCustomerStore from "~/stores/customer";
import CartItem from "~/components/front/cart/CartItem.vue";
const customerStore = useCustomerStore();
</script>
