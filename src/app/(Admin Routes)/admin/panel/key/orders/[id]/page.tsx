"use client"

import React, { useState, useEffect } from 'react'
import { Order } from '../Table';
import Load from '@/app/(Main Routes)/cart/Load';

const ViewOrder = async ({ params }: any) => {

    const orderID = params.id;

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Order>({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      homeAddress: "",
      shippingAddress: "",
      city: "",
      code: "",
      paymentType: "",
      attachment: "",
      items: [],
    });
  
    const getData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/order/${orderID}`);
        const result = await res.json();
        setData(result.order);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getData();
    }, []);
    
    return (
        <div>
            {loading ? (
                <Load />
            ) : (
                <h1>{data?.firstName}</h1>
            )}
        </div>
    )
}

export default ViewOrder