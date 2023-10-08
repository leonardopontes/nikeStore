import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartState, selectTotalAmount, selectTotalQTY, setClearCartItems, setCloseCart, setGetTotals } from "../app/CartSlice.js";
import CartCount from "./cart/CartCount";
import CartEmpty from "./cart/CartEmpty";
import CartItem from "./cart/CartItem";
// Carrinho ligando = () contendo => {}
const Cart = () => {
  // despacho ligando = usar Despacho();
  const dispatch = useDispatch();
  // se Estado do Carrinho for verdade, ligando = usar Seletor(Seletor de Estado do Carrinho);
  const ifCartState = useSelector(selectCartState);
  // Itens do Carrinho ligando = usar Seletor(Seletor de Itens do Carrinho);
  const cartItems = useSelector(selectCartItems);
  // Quantia total ligando = usar Seletor(Seletor de Quantia Total);
  const totalAmount = useSelector(selectTotalAmount);
  // Quantidade total ligando = usar Seletor(Seletor de Quantidade Total);
  const totalQTY = useSelector(selectTotalQTY);
  
  // console.log(cartItems)
  // usar Efeito(()) contendo => {}
  useEffect(() => {
    // despachar(definir Pegando Totais())
    dispatch(setGetTotals())
    // Envolver na Estrutura , [Itens do carrinho, despachar] 
  },[cartItems, dispatch])
  // ativar Carrinho Alternando ligando = () contendo => {}
  const onCartToggle = () => {
    // despachar(definir Fechando Carrinho({})
    dispatch(setCloseCart({
        // Estado do carrinho: falso,
        cartState: false,
      })
    );
  };
  // ativar Limpar Itens do Carrinho ligando = () contendo => {}
  const onClearCartItems = () => {
    // despachar(definir Limpeza de Itens do Carrinho())
    dispatch(setClearCartItems())
  }
  
  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme duration-500 w-full h-screen opacity-100 z-[250] ${
          ifCartState
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible translate-x-8"
        }`}
      >
        <div
          className={`blur-effect-theme duration-500 h-screen max-w-xl w-full absolute right-0 ${
            ifCartState
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible translate-x-8"
          }`}
        >
          <CartCount totalQTY={totalQTY} onCartToggle={onCartToggle} onClearCartItems={onClearCartItems} />
          {cartItems?.length === 0 ? <CartEmpty onCartToggle={onCartToggle} /> : <div>
            <div className="flex items-start justify-start flex-col gap-y-7 lg:gap-y-5 overflow-y-scroll h-[81vh] scroll-smooth scroll-hidden py-3">
              {cartItems?.map((item, i) => (
                <CartItem key={i} item={item} />
              ))}
            </div>

            <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center">
              <div className="flex items-center justify-between">
                <h1 className="text-base font-semibold uppercase">SubTotal</h1>
                <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">${totalAmount}</h1>
              </div>
              <div className="grid items-center gap-2">
                <p className="text-sm font-medium text-center">Taxes and Shipping Will Calculate At Shipping</p>
                <button type="button" className="button-theme bg-theme-cart text-white">Check Out</button>
              </div>
            </div>

          </div>}
        </div>
      </div>
    </>
  );
};

export default Cart;
