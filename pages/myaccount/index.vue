<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-2 px-4 mx-auto max-w-2xl lg:py-4">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Account Details
      </h2>
      <FormKit type="form" :actions=false @submit="submitHandler" id="accountForm" >
        <div class="grid gap-4">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Name</label
            >
            <FormKit
              type="text"
              name="name"
              placeholder="Your Name"
              id="name"
              :classes="{
                input: inputClass
              }"
              validation="required"
              :value="customer.name"
            />

          </div>
          <div class="sm:col-span-2">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >E-Mail</label
            >
            <FormKit
              type="email"
              name="email"
              id="email"
              placeholder="Your E-Mail"
              :classes="{
                input: inputClass
              }"
              validation="required|email"
              :value="customer.email"
            />
          </div>
          <div class="sm:col-span-2">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <FormKit
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              :classes="{
                input: inputClass
              }"
              validation="length:6,12"
            />
          </div>
          <div class="sm:col-span-2">
            <label
              for="password_confirm"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Confirm Password</label
            >
            <FormKit
              type="password"
              name="password_confirm"
              id="password_confirm"
              placeholder="Confirm Password"
              :classes="{
                input: inputClass
              }"
              validation="confirm"
            />
          </div>
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          v-if="!processing"
        >
          Update
        </button>
        <ButtonProcessing v-else ></ButtonProcessing>
      </FormKit>
    </div>
  </section>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import useCustomerStore from '~/stores/customer';
import bcrypt from "~/plugins/bcrypt";


definePageMeta({
  key: (route) => route.fullPath,
  middleware: "auth-customer",
});

const bcryptjs = bcrypt().provide.bcryptjs;
const saltValue = bcrypt().provide.salt;
const salt = bcryptjs.genSaltSync(saltValue);
const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);
const client = useSupabaseClient();
const processing = ref(false);
const inputClass = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
const snackbar = useSnackbar();

const submitHandler = async (values) => {
  processing.value = true;
  let updateDetails = {
    name: values.name,
    email: values.email
  }
  if(values.password) {
    const hashPassword = bcryptjs.hashSync(values.password, salt);
    updateDetails.password = hashPassword;
  }
  const {error} = await client.from("customer").update(updateDetails).match({email: customer.value.email});
  if(error) {
    snackbar.add({
      type: "error",
      text: error.details
    })
  } else {
    const {data} = await client.from("customer").select().eq("email",updateDetails.email).single();
    customerStore.customer = data;
    snackbar.add({
      type: "success",
      text: "Details updated."
    })
    
  }
  processing.value = false;
}
</script>
