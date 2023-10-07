// importar { criarParte } de "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// importar toast de "react-hot-toast";
import toast from "react-hot-toast";

// Estado inicial contendo = {
const initialState = {
  // Estado do carrinho: falso,
  cartState: false,
  // Estado dos itens: Armazenamento local.pegar Item("carrinho")
  cartItems: localStorage.getItem("cart")
    // ? JSON.analisar(Armazenamento local.pegar Item("carrinho"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [], // Let Suppose Database
  // Quantia Total no carrinho: 0,
  cartTotalAmount: 0,
  // Quantidade Total no carrinho: 0,
  cartTotalQantity: 0,
};
// Parte do Carrinho ligando a = criar Parte({
const CartSlice = createSlice({
  // Estado inicial,
  initialState,
  // nome: "carrinho"
  name: "cart",
  // reducers: {
  reducers: {
    // definir Carrinho Aberto: (estado, ação) contendo => {
    setOpenCart: (state, action) => {
      // parte do.Estado do carrinho ligando a = ação de.carga útil do.Estado do carrinho;
      state.cartState = action.payload.cartState;
    },
    // definir Carrinho Fechado: (estado, ação) contendo => {
    setCloseCart: (state, action) => {
      // parte do.Estado do carrinho ligando a = ação de.carga útil do.Estado do carrinho;
      state.cartState = action.payload.cartState;
    },
    // definir Adicionar Item No Carrinho: (estado, ação) contendo => {
    setAddItemToCart: (state, action) => {
      // Índice do item ligando a = estado de.Itens dos carrinhos.encontrando Índice(
      const itemIndex = state.cartItems.findIndex(
        // (item) contendo => id do.item === ação de.carga útil com.id
        (item) => item.id === action.payload.id
      );
      // Se (Índice do item for maior ou igual a 0) {
      if (itemIndex >= 0) {
        // estado de.Itens do carrinho[Índice do item] da.Quantidade no carrinho += 1;
        state.cartItems[itemIndex].cartQuantity += 1;
        // toast.sucesso(`Item QTY Aumentou`);
        toast.success(`Item QTY Increased`);
        // Se não {
      } else {
        // tempo ligando a = { ...ação de.carga útil, Quantidade no carrinho: 1};
        const temp = { ...action.payload, cartQuantity: 1 };
        // estado de.Itens do carrinho.puxar(tempo);
        state.cartItems.push(temp);
        // toast.sucesso(`${ação de.carga útil no.título} adicionado no Carrinho`);
        toast.success(`${action.payload.title} added to Cart`);
      }
      // Armazenamento local.definir Item("carrinho", JSON.restringir(estado de.Itens do carrinho));
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    // definir Remoção de Item de Carrinho: (estado, ação) contendo => {
    setRemoveItemFromCart: (state, action) => {
      // remover Item ligando a = filtrar.estado de.Itens do carrinho(
      const removeItem = state.cartItems.filter(
        // (item) contendo => id do.item !== ação de.carga útil com.id
        (item) => item.id !== action.payload.id
      );
      // estado de.Itens do carrinho ligando a = remover Item;
      state.cartItems = removeItem;
      // Armazenamento local.definir Item("carrinho", JSON.restringir(estado de.Itens do carrinho));
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      // toast.sucesso(`${ação de.carga útil no.título} Removido do Carrinho`);
      toast.success(`${action.payload.title} Removed From Cart`);
    },
    // definir Aumento de QTY de Itens: (estado, ação) contendo => {
    setIncreaseItemQTY: (state, action) => {
      // Índice do item ligando a = estado de.Itens dos carrinhos.encontrando Índice(
      const itemIndex = state.cartItems.findIndex(
        // (item) contendo => id do.item === ação de.carga útil com.id
        (item) => item.id === action.payload.id
      );
      // Se (Índice do item for maior ou igual a 0) {
      if (itemIndex >= 0) {
        // estado de.Itens do carrinho[Índice do item] da.Quantidade no carrinho += 1;
        state.cartItems[itemIndex].cartQuantity += 1;
        // toast.sucesso(`Item QTY Aumentou`);
        toast.success(`Item QTY Increased`);
      }
      // Armazenamento local.definir Item("carrinho", JSON.restringir(estado de.Itens do carrinho));
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    // definir Diminuindo QTY de Itens: (estado, ação) contendo => {
    setDecreaseItemQTY: (state, action) => {
      // Índice do item ligando a = estado de.Itens dos carrinhos.encontrando Índice(
      const itemIndex = state.cartItems.findIndex(
        // (item) contendo => id do.item === ação de.carga útil com.id
        (item) => item.id === action.payload.id
      );
      // Se (estado de.Itens do carrinho[Índice do item].Quantidade no carrinho for maior que 1) {
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        // (estado de.Itens do carrinho[Índice do item].Quantidade no carrinho -= 1;
        state.cartItems[itemIndex].cartQuantity -= 1;
        // toast.sucesso(`Item QTY Diminuiu`);
        toast.success(`Item QTY Decreased`);
      }
      // Armazenamento local.definir Item("carrinho", JSON.restringir(estado de.Itens do carrinho));
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    // definir Limpeza de Itens do Carrinho: (estado, ação) contendo => {
    setClearCartItems: (state, action) => {
      // estado de.Itens do carrinho = [];
      state.cartItems = [];
      // toast.sucesso(`Carrinho Limpo`);
      toast.success(`Cart Cleared`);
      // Armazenamento local.definir Item("carrinho", JSON.restringir(estado de.Itens do carrinho));
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    // definir Pegando Totais: (estado, ação) contendo => {
    setGetTotals: (state, action) => {
      // deixar { Quantia total, QTY total } ligando a = estado de.Itens do carrinho.reduzir((Total no carrinho, Item no carrinho) contendo => {
      let { totalAmount, totalQTY } = state.cartItems.reduce((cartTotal, cartItem)=> {
        // { preço, Quantidade no carrinho } ligando a = Item no carrinho;
        const { price, cartQuantity } = cartItem;
        // Preço total ligando a = preço * Quantidade no carrinho;
        const totalPrice = price * cartQuantity;

        // Total no carrinho.Quantia total += Preço total;
        cartTotal.totalAmount += totalPrice;
        // Total no carrinho.Quantidade total += Quantidade total;
        cartTotal.totalQTY += cartQuantity;
        // retornar Total no carrinho;
        return cartTotal;
      }, {
        // Quantia total: 0,
        totalAmount: 0,
        // Quantidade total: 0,
        totalQTY: 0,
      });
      // estado de.Quantia Total no carrinho ligando a = Quantia total;
      state.cartTotalAmount = totalAmount;
      // estado de.Quantidade Total no carrinho ligando a = Quantidade total;
      state.cartTotalQantity = totalQTY;
    },
  },
});

export const {
  setOpenCart,
  setCloseCart,
  setAddItemToCart,
  setRemoveItemFromCart,
  setIncreaseItemQTY,
  setDecreaseItemQTY,
  setClearCartItems,
  setGetTotals
} = CartSlice.actions;

export const selectCartState = (state) => state.cart.cartState;
export const selectCartItems = (state) => state.cart.cartItems;

export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQTY = (state) => state.cart.cartTotalQantity;

export default CartSlice.reducer;