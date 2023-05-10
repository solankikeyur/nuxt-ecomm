<template>
  <FrontLayout>
    <div class="grid h-screen place-items-center">
      <div
        v-if="order"
        class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex items-center justify-between mb-4">
          <h5
            class="text-xl font-bold leading-none text-gray-900 dark:text-white"
          >
            Order ID: #{{ order.id }}
          </h5>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">

            <li class="py-3 sm:py-4 px-4 bg-gray-200">
              <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-gray-900 truncate dark:text-white"
                  >
                    Name
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                  Total
                </div>
              </div>
            </li>

            <li class="py-3 sm:py-4" v-for="item in order.items">
              <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-gray-900 truncate dark:text-white"
                  >
                    {{item.name}}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    Quantity: {{item.qty}}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    Price: Rs {{item.price}}
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                  Rs {{ item.price * item.qty }}
                </div>
              </div>
            </li>

            <li class="py-3 sm:py-4 bg-gray-200 px-4" >
              <div class="flex items-center space-x-4">
                <div class="flex-1 min-w-0">
                  <p
                    class="text-sm font-medium text-gray-900 truncate dark:text-white"
                  >
                    Grand Total
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    
                  </p>
                </div>
                <div
                  class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                >
                  Rs {{ order.total_amount }}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="py-4 grid place-items-center">
            <NuxtLink to="/myaccount/order" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">My Order(s)</NuxtLink>
        </div>
      </div>
      <div
        v-else
      >
        <Loader></Loader>
      </div>
    </div>
  </FrontLayout>
</template>

<script setup>
import FrontLayout from "~/layouts/FrontLayout.vue";
import Loader from "~/components/front/Loader.vue";

const route = useRoute();
const order = ref(null);
const client = useSupabaseClient();
const snackbar = useSnackbar();

onMounted(async () => {
  const { data, error } = await client
    .from("order")
    .select("*")
    .eq("id", route.params.id)
    .single();
  if (data) {
    order.value = data;
  } else {
    snackbar.add({
        type: "error",
        text: "No order found."
    })
    return navigateTo("/myaccount/order");
  }
});
</script>
