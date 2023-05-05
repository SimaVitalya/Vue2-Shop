import {createStore} from 'vuex';
import createPersistedState from "vuex-persistedstate";//это никитос давал и его нужно вроде установить

const store = createStore({
    state: {
        cart: [],
        cartCount: 0,
    },

    mutations: {//функции что позволяют изменять состояния state .парамерт стате обезателен
        addToCart(state, product) {
            let isProductExist = false;
            let products = state.cart;
            state.cart.forEach((item) => {
                if (item.id === product.id) {
                    isProductExist = true;
                    item.quantity++;
                    item.fullPrice = item.quantity * item.price;
                    state.cart = products
                    console.log(state.cart)
                }
            });
            if (!isProductExist) {
                product.quantity = 1;
                product.fullPrice = product.price;
                state.cart.push(product);
                state.cart = products;
            }
            state.cartCount++;
        },
        removeFromCart(state, product) {
            let products = state.cart;
            products.forEach((item, index) => {
                if (item.id === product.id) {
                    item.quantity--;
                    item.fullPrice = item.quantity * item.price;
                    if (item.quantity < 1) {
                        products.splice(index, 1);
                    }
                }
            });
            state.cart = products;
            state.cartCount--;
        },
        deleteProduct(state, product) {
            let products = state.cart;
            products.forEach((item, index) => {
                if (item.id === product.id) {
                    state.cartCount -= item.quantity;
                    products.splice(index, 1);
                }
            });
            state.cart = products;
        }, clearCart(state) {
            state.cart = [];
        },
        clearCount(state) {
            state.cartCount = 0;
        }


    }, getters: {//позволяет получить значения из переменной state,тут обычно фильтрации сортировка
        totalPrice: (state) => {
            let total = 0;
            state.cart.forEach((item) => {
                total += item.fullPrice;
            });
            return total;
        },
    },
    plugins: [
        createPersistedState()
    ],
    actions: {}
});

export default store;
