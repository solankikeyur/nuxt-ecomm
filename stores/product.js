import { defineStore } from "pinia";

const useProductStore = defineStore("product",{
    state: () => ({}),
    actions: {
        async getProduct(id) {
            const {data, error} = await useSupabaseClient().from("product").select().eq('id', id).single();
            if(data) {
                return data;
            }
            return this.emptyProduct();
        },
        async getAllProducts() {
            const { data } = await useSupabaseClient().from("product").select("*").order("id");
            return data;
        }
    }
})

export default useProductStore;