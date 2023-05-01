<template>
  <AdminLayout>
    <Form @submit="submitHandler" :isEdit="isEdit" :product="product" />
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import Form from "~/components/admin/product/form";
import useProductStore from "~/stores/product";
const route = useRoute();
const id = route.params.id;
const productStore = useProductStore();
const product = ref({
  name: "",
  sku: "",
  status: false,
  id: "",
  created_at: "",
  updated_at: "",
  price: "",
});
const isEdit = true;
const snackbar = useSnackbar();

const submitHandler = async (values) => {
  const { name, sku, price, status } = values;
  const { data, error } = await useSupabaseClient()
    .from("product")
    .update({ name: name, sku: sku, price: price, status: status })
    .match({ id: id });
  if (error) {
    snackbar.add({
      type: "error",
      text: error
    })
  } else {
    snackbar.add({
      type: "success",
      text: "Product updated."
    })
    return navigateTo("/admin/product");
  }
};

onMounted(async () => {
  const data = await productStore.getProduct(id);
  if (!data) {
    return navigateTo("/admin/product");
  }
  product.value = data;
});
</script>
