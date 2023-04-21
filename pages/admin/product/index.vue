<template>
  <AdminLayout>
    <Grid :columns="columns" :showActionCol="showActionCol">
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
          <td class="px-6 py-4">{{ product.status }}</td>
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

const client = useSupabaseClient();
const columns = ["Product Name", "SKU", "Price", "Status"];
const collection = ref([]);
const showActionCol = ref(true);

const editHandler = (payload) => {
  console.log(payload);
};

const deleteHandler = (payload) => {};

onMounted(async () => {
  const { data } = await client.from("product").select("*");
  if (data) {
    collection.value = data;
  }
});
</script>
