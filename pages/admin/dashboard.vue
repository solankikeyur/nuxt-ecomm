<template>
  <AdminLayout>
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div
          class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400"
        >
          <h2
            class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white"
          >
            Welcome , {{ adminStore.email }}
          </h2>
        </div>
      </div>
    </section>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "~/layouts/AdminLayout.vue";
import useAdminStore from "~/stores/admin";

definePageMeta({
  middleware: "auth-admin",
});

const adminStore = useAdminStore();
</script>
