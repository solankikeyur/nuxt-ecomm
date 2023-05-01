<template>
  <FrontLayout>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Sign in to your account
            </h1>
            <FormKit type="form" :form-class="'space-y-4 md:space-y-6'" @submit="submitHandler" :actions="false">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Your email</label
                >
                <FormKit
                  type="email"
                  name="email"
                  id="email"
                  :classes="{
                    input: 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  }"
                  validation="required|email"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <FormKit
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  :classes="{
                    input: 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  }"
                  validation="required|length:6,12"
                />
              </div>
              <button
                v-if="!processing"
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <ButtonProcessing v-else ></ButtonProcessing>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <NuxtLink
                  to="/signup"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Sign up</NuxtLink
                >
              </p>
            </FormKit>
          </div>
        </div>
      </div>
    </section>
  </FrontLayout>
</template>
<script setup>
import FrontLayout from "~/layouts/FrontLayout.vue";
import bcrypt from "~/plugins/bcrypt"
import useCustomerStore from "~/stores/customer";

const $bcryptjs = bcrypt().provide.bcryptjs;
const client = useSupabaseClient();
const snackbar = useSnackbar();
const customerStore = useCustomerStore();
const processing = ref(false);

const submitHandler = async (values) => {
  processing.value = true;
  const {email, password} = values;
  const {data, error} = await client.from("customer").select().eq("email", email).single();
  if(error) {
    snackbar.add({
      type: "error",
      text: "Invalid login details."
    })
  } else {
    if($bcryptjs.compareSync(password, data.password)) {
      customerStore.customer = data;
      customerStore.isLoggedIn  = true;
      snackbar.add({
        type: "success",
        text: "Login successfull."
      })
      return navigateTo("/myaccount");
    } else {
      snackbar.add({
        type: "error",
        text: "Invalid login details."
      })
    }
  }
  processing.value = false;
}

definePageMeta({
  middleware: "guest-customer"
})

</script>
