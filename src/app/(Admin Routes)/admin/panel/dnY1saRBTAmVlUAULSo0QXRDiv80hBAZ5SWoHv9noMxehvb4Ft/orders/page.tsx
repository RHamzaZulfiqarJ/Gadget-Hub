"use client";

import React, { useEffect, useState } from "react";
import { DataTableDemo } from "./Table";
import Load from "@/app/(Main Routes)/cart/Load";

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
  status: string;
  items: [];
};

const Page = () => {
  const [data, setData] = useState<Orders[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/order");
      const result = await res.json();
      setData(result.orders);
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
      <div className="flex flex-row justify-between pb-10">
        <h1 className="text-2xl font-primary">Orders</h1>
        <div className="flex flex-row gap-10"></div>
      </div>

      {loading ? (
        <Load />
      ) : (
        <DataTableDemo initialData={data} />
      )}
    </div>
  );
};

export default Page;
