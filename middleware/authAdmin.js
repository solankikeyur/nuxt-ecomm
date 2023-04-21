import useAdminStore from "~/stores/admin"

export default defineNuxtRouteMiddleware(async (to) => {
    const adminStore = useAdminStore();
    if(!adminStore.token) {
        return navigateTo("/admin");
    }
})