import { defineStore } from "pinia";

const useCustomerStore = defineStore("customer", {
  state: () => ({
    cart: [],
    customer: {},
    isLoggedIn: false
  }),
  actions: {
    addToCart(id, name, price) {
      if (this.productExists(id)) {
        this.cart.map((product) => {
          if (product.id === id) {
            product.qty++;
          }
        });
      } else {
        this.cart.push({
          id: id,
          name: name,
          qty: 1,
          price: price,
        });
      }
    },
    removeCartItem(id) {
      if (this.productExists(id)) {
        this.cart = this.cart.filter((cartItem) => cartItem.id !== id);
      }
    },
    increaseQty(id) {
      this.cart.map((product) => {
        if (product.id === id) {
          product.qty++;
        }
      });
    },
    decreaseQty(id) {
      this.cart.map((product) => {
        if (product.id === id) {
          if (product.qty <= 1) {
            this.removeCartItem(product.id);
          } else {
            product.qty--;
          }
        }
      });
    },
    productExists(id) {
      const isProductExist = this.cart.find((product) => product.id === id);
      if(isProductExist) {
        return true;
      }
      return false;
    },
    async getOrders(state) {
      const {data, error} = await useSupabaseClient().from("order").select("*").eq("customer_id", this.customer.id);
      if(data) {
        return data;
      }
      return [];
    }
  },
  getters: {
    getCartItemCount(state) {
      return state.cart.length;
    },
    getTotalCartAmount(state) {
      let totalAmount = 0;
      if (this.getCartItemCount > 0) {
        state.cart.map((product) => {
          totalAmount += product.price * product.qty;
        });
      }
      return totalAmount;
    },
    
  },
  persist: true,
});

export default useCustomerStore;
