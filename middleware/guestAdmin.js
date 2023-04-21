import useAdminStore from "~/stores/admin"

export default defineNuxtRouteMiddleware((to) => {
    const adminStore = useAdminStore();
    if(adminStore.token) {
        return navigateTo("/admin/dashboard");
    }
})