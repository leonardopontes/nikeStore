import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice.js";
// Loja ligando a = configuração de Loja({})
const Store = configureStore({
    // reducer: {}
    reducer: {
        // carrinho: Parte do Carrinho,
        cart: CartSlice,
    }
});

export default Store;