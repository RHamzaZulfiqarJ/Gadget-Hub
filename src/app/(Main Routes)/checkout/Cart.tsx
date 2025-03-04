"use client";

import React, { useEffect, useState } from 'react'

type CartItem = {
    id: string;
    title: string;
    quantity: number;
    price: number;
    size: string;
    category: string;
    img: string[];
  };

const Cart = () => {

    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getData = async () => {
      setLoading(true);
      try {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getData();
    }, []);
    
    let quantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className='bg-white shadow-xl flex flex-col gap-4 font-primary p-7 rounded-xl'>
        <div className='flex flex-col gap-3'>
            <div className='text-black font-bold text-lg'>Shopping Cart</div>
            <div className='text-md font-light'>You have {quantity} items in your cart.</div>
        </div>
        <hr className='border-[0.1%] border-black opacity-20 w-full my-2 rounded-full' />
        <div className='flex flex-col gap-4'>
            {
                cart.map((item) => (
                    <div key={item?.id} className='flex flex-row justify-between items-center'>
                        <div className='flex flex-row gap-3 items-center'>
                            <img src={item?.img[0]} alt='' className='h-14 w-14 object-cover rounded-lg' />
                            <div className='flex flex-col'>
                                <div className='text-md font-bold'>{item?.title}</div>
                                <div className='text-sm font-thin truncate'>Rs. {item?.price}</div>
                            </div>
                        </div>
                        <div className='text-lg font-bold'>Rs. {item?.quantity * item?.price}</div>
                    </div>
                ))
            }
        </div>
        <hr className='border-[0.1%] border-black opacity-20 w-full my-2 rounded-full' />
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between'>
                <div className='text-md font-medium'>Subtotal</div>
                <div className='text-md font-bold'>Rs. {total}</div>
            </div>
            <div className='flex flex-row justify-between'>
                <div className='text-md font-medium'>Shipping Cost</div>
                <div className='text-md font-bold'>Rs. 120</div>
            </div>
            <div className='flex flex-row justify-between'>
                <div className='text-md font-medium'>Discount</div>
                <div className='text-md font-bold'>Rs. 0</div>
            </div>
            <hr className='border-[0.1%] border-black opacity-20 w-full my-2 rounded-full' />
            <div className='flex flex-row justify-between'>
                <div className='text-md font-medium'>Total</div>
                <div className='text-md font-bold'>Rs. {total + 120}</div>
            </div>
        </div>
    </div>
  )
}

export default Cart