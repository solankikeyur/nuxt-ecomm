<template>
  <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <a href="#" class="flex items-center">
        <img
          :src="ecomm"
          class="h-8 mr-3"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Ecomm</span
        >
      </a>
      <button
        data-collapse-toggle="navbar-solid-bg"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-solid-bg"
        aria-expanded="false"
        @click="() => (showMobileNavbar = !showMobileNavbar)"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        :class="!showMobileNavbar ? 'hidden' : ''"
        class="w-full md:block md:w-auto"
        id="navbar-solid-bg"
      >
        <ul
          class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700"
        >
          <li>
            <NavbarLink url="/" >Home</NavbarLink>
          </li>
          <li>
            <NavbarLink url="/product" >Products</NavbarLink>
          </li>
          <li v-if="customerStore.isLoggedIn">
            <NavbarLink url="/myaccount" >My Account</NavbarLink>
          </li>
          <li v-if="!customerStore.isLoggedIn">
            <NavbarLink url="/signup" >Sign up</NavbarLink>
          </li>
          <li v-if="!customerStore.isLoggedIn">
            <NavbarLink url="/login" >Login</NavbarLink>
          </li>
          <li>
            <NuxtLink
              to="/cart"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >Cart<span
                class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full"
              >
                {{ customerStore.getCartItemCount }}
              </span></NuxtLink
            >
          </li>
          <li v-if="customerStore.isLoggedIn">
            <button
              @click="logoutHandler"
              class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import useCustomerStore from "~/stores/customer";
import NavbarLink from "./NavbarLink.vue";
import ecomm from "~/assets/img/ecomm.png"
const customerStore = useCustomerStore();
const snackbar = useSnackbar();
const showMobileNavbar = ref(false);

const logoutHandler = () => {
  if (confirm("You cart will be cleared. Are you sure ?")) {
    customerStore.$reset();
    snackbar.add({
      type: "success",
      text: "Logout successfull",
    });
    return navigateTo("/login");
  }
};
</script>
