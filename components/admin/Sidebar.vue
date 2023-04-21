<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="link in links">
          <NuxtLink
            :to="link.url"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span class="ml-3">{{ link.name }}</span>
          </NuxtLink>
        </li>

        <!-- Logout Link -->
        <li>
          <a
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            id="Logout"
            @click="logout"
          >
            <span class="ml-3">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
<style scoped>
a.router-link-active {
  background-color: #a4cafe;
}
#Logout {
  cursor: pointer;
}
</style>
<script setup>
import useAdminStore from "~/stores/admin";
const props = defineProps({
    links: Array
})
const { links } = toRefs(props);
const adminStore = useAdminStore();
const logout = async () => {
  await adminStore.logout();
  return navigateTo("/admin");
};
</script>
