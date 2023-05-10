<template>
  <AdminLayout>
    <Form @submit="submitHandler" :product="product" />
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import Form from "~/components/admin/product/form";
import useProductStore from "~/stores/product";
const client = useSupabaseClient();
const snackbar = useSnackbar();
const product = ref({
  name: "",
  sku: "",
  status: false,
  id: "",
  created_at: "",
  updated_at: "",
  price: "",
});

const submitHandler = async (values) => {
  const { name, price, sku, status } = values;
  const { data, error } = await client.from("product").insert({
    name: name,
    price: price,
    status: status,
    sku: sku,
  });
  if (error) {
    snackbar.add({
      type: "error",
      text: error
    })
  } else {
    snackbar.add({
      type: "success",
      text: "Product Added."
    })
    return navigateTo("/admin/product");
  }
};
</script>
