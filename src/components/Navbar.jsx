import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalQTY, setOpenCart } from '../app/CartSlice.js';
import { HeartIcon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.png';

// Navbar ligando = () contendo => {}
const Navbar = () => {
    // [Estado do navbar, definir Estado do Navbar] ligando = usar Estado(falso);
    const [navState, setNavState] = useState(false);
    // despachar ligando = usar Despacho();
    const dispatch = useDispatch();
    // total de Quantidade ligando = usar Seletor(seletor de Quantidade Total)
    const totalQTY = useSelector(selectTotalQTY);
    // ativar Carrinho alternando ligando = () contendo => {}
    const onCartToggle = () => {
        // despachar(definir Carrinho Aberto({}
        dispatch(setOpenCart({
            // Estado do carrinho: true
            cartState: true
        }))
    }
    // ativar Rolagem Navbar ligando = () contendo => {}
    const onNavScroll = () => {
        // Se(rolagem na.janela for maior que 30) {}
        if(window.scrollY > 30) {
            // definir Estado do Navbar(true);
            setNavState(true);
        // Se não {}    
        } else {
            // definir Estado do Navbar(falso);
            setNavState(false);
        }
    }
    // usar Efeito(() contendo => {}
    useEffect(() => {
        // adicionar Evento Ouvinte na.janela('rolagem', ativar Rolagem Navbar);
        window.addEventListener('scroll', onNavScroll);
        // retornar () => {}
        return () => {
          // remover Evento Ouvinte na.janela('rolagem', ativar Rolagem Navbar);
          window.removeEventListener('scroll', onNavScroll);
        }
    // , []);     
    },[]);
return (
   <>
      <header className={
        !navState ? 'absolute top-7 left-0 right-0 opacity-100 z-50' : 'fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme'
      }>
        <nav className='flex items-center justify-between nike-container'>
            <div className='flex items-center'>
                <img
                    src={logo}
                    alt="logo/img"
                    className={`w-16 h-auto ${navState && "filter brightness-0"}`}
                />
            </div>
            <ul className='flex items-center justify-center gap-2'>
                <li className='grid items-center'>
                    <MagnifyingGlassIcon className={`icon-style ${navState && "text-slate-900 transition-all duration-300"}`} />
                </li>
                <li className='grid items-center'>
                    <HeartIcon className={`icon-style ${navState && "text-slate-900 transition-all duration-300"}`} />
                </li>
                <li className='grid items-center'>
                    <button type='button' onClick={onCartToggle} className='border-none outline-none active:scale-110 transition-all duration-300 relative'>
                        <ShoppingBagIcon className={`icon-style ${navState && "text-slate-900 transition-all duration-300"}`} />
                        <div className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${navState ? 'bg-slate-900 text-slate-100 shadow-slate-900' : 'bg-slate-100 text-slate-900 shadow-slate-100'}`}>{totalQTY}</div>
                    </button>
                </li>
            </ul>
        </nav>
      </header>
   </>
  )
}

export default Navbar