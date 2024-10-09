"use client"

import { Input } from '@/components/ui/input'
import { Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoAddSharp } from 'react-icons/io5'
import { DataTableDemo } from './Table'

type Orders = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeAddress: string;
  shippingAddress: string;
  city: string;
  code: string;
  paymentType: string;
  attachment: string;
  items: [];
}

const Page = () => {

  const [data, setData] = useState<Orders[]>([]);

  const getData = async () => {
    try {
      const res = await fetch("/api/order");
      const result = await res.json();
      setData(result.orders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between pb-10">
        <h1 className="text-2xl font-primary">Orders</h1>
        <div className="flex flex-row gap-10">
          {/* <div>
            <Input
              placeholder="Search"
              // value={searchTerm}
              // onChange={handleSearch}
            />
          </div> */}
        </div>
      </div>

      <DataTableDemo data={data} />

    </div>
  )
}

export default  Page