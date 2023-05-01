<template>
  <FrontLayout>
    <Loader v-if="loading"></Loader>
    <div class="m-6" v-else>
        <div v-if="products && products.length > 0" class="grid grid-cols-3 md:grid-cols-4 gap-4">
            <ProductCard v-for="product in products" :name="product.name" :price="product.price" :id="product.id"></ProductCard>
        </div>
        <h1 v-else class="text-center" >No products found.</h1>
    </div>
  </FrontLayout>
</template>

<script setup>
import FrontLayout from "~/layouts/FrontLayout";
import ProductCard from "~/components/front/product/ProductCard.vue";
import useProductStore from "~/stores/product";

import Loader from "~/components/front/Loader.vue";

const products = ref([]);
const productStore = useProductStore();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const data = await productStore.getAllProducts();
  if (data) {
    products.value = data;
  }
  loading.value = false;
});
</script>
