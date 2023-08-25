import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartButton = () => {
  const navigateTo = useNavigate();

  const handleClick = () => {
    navigateTo('/packing');
  }
    
  return (
    <div onClick={handleClick} className='fixed z-20 bottom-10 right-10 w-16 h-16 rounded-full shadow-lg bg-colorDB border border-black'>
        <div className='flex justify-center items-center h-full'>
          <ion-icon size='large' name="bag-check-outline"></ion-icon>
        </div>
    </div>
  )
}

export default CartButton