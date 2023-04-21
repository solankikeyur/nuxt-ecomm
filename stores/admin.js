import { defineStore } from "pinia";

const useAdminStore = defineStore("admin", {
    state: () => ({
        id: null,
        email: null,
        token: null
    }),
    persist: true,
    actions: {
        async logout() {
            await useSupabaseClient().auth.signOut();
            this.$reset();
        }
    }
});

export default useAdminStore;