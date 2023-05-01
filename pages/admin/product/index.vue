<template>
  <AdminLayout>
    <Grid :columns="columns" :showActionCol="showActionCol" addUrl="/admin/product/add">
      <tbody v-if="collection.length > 0">
        <tr
          class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
          v-for="product in collection"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ product.name }}
          </th>
          <td class="px-6 py-4">{{product.sku}}</td>
          <td class="px-6 py-4">{{product.price}}</td>
          <td class="px-6 py-4">{{ product.status ? "Enabled" : "Disabled" }}</td>
          <td class="px-6 py-4" >
            <GridActions @edit="editHandler" @delete="deleteHandler" :id="product.id" />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <td class="px-6 py-4 text-center" colspan="12">No records found.</td>
        </tr>
      </tbody>
    </Grid>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import Grid from "~/components/admin/Grid.vue";
import GridActions from "~/components/admin/GridActions.vue";
import useProductStore from "~/stores/product";

const client = useSupabaseClient();
const columns = ["Product Name", "SKU", "Price", "Status"];
const collection = ref([]);
const showActionCol = ref(true);
const productStore = useProductStore();

const editHandler = (payload) => {
  return navigateTo(`/admin/product/${payload}`);
};

const deleteHandler = async (payload) => {
  if(confirm("Are you sure ?")) {
    const {data, error} = await client.from("product").delete().match({id: payload});
    if(error) {
      alert(error);
      return;
    } 
    const products = await productStore.getAllProducts();
    if(products) {
      collection.value = products;
    }
  }
};

onMounted(async () => {
  const data = await productStore.getAllProducts();
  if(data) {
    collection.value = data;
  }
});
</script>
