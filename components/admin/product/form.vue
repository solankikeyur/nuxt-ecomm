<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2
        class="mb-4 text-xl font-bold text-gray-900 dark:text-white"
        v-if="isEdit"
      >
        Edit Product
      </h2>
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white" v-else>
        Add a new product
      </h2>
      <FormKit type="form" :actions="false" @submit="submitHandler">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Product Name</label
            >
            <FormKit type="text" name="name" placeholder="Product Name" validation="required" :classes="{input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'}" v-model="product.name" ></FormKit>
          </div>
          <div class="w-full">
            <label
              for="price"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Price</label
            >
            <FormKit type="number" name="price" placeholder="Product Price" validation="required|number|min:1" :classes="{input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'}" v-model="product.price" ></FormKit>
          </div>
          <div class="w-full">
            <label
              for="sku"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >SKU</label
            >
            <FormKit type="text" name="sku" placeholder="Product SKU" validation="required" :classes="{input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'}" v-model="product.sku" ></FormKit>
          </div>
          <div class="w-full">
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="status"
                value=""
                class="sr-only peer"
                v-model="product.status"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              ></div>
              <span
                class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Status</span
              >
            </label>
          </div>
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          v-if="isEdit"
        >
          Save Product
        </button>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          v-else
        >
          Save Product
        </button>
      </FormKit>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  isEdit: Boolean,
  product: Object
});
const {product, isEdit} = toRefs(props);
const emit = defineEmits(["submit"]);

const submitHandler = (values) => {
  values.status = product.value.status;
  emit("submit", values);
}
</script>
