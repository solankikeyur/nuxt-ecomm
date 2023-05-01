import useCustomerStore from "~/stores/customer"

export default defineNuxtRouteMiddleware((to) => {
    const customerStore = useCustomerStore();
    if(!customerStore.isLoggedIn) {
        return navigateTo("/login");
    } 
})