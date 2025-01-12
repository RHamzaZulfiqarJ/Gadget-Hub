"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Order } from "./Table";

import { useEffect, useState } from "react";
import Load from "@/app/(Main Routes)/cart/Load";

const ViewOrder = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}) => {
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
    status: "",
    items: [],
  });

  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/order/${id}`);
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
  }, [id]);

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        {loading ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Loading...</DialogTitle>
              <DialogDescription>
                <Load />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            <div className="flex flex-row justify-evenly items-center">
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Title</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.items.map((item: any, index) => (
                      <TableRow key={index}>
                        <TableCell>{item?.title}</TableCell>
                        <TableCell>{item?.size}</TableCell>
                        <TableCell>{item?.category}</TableCell>
                        <TableCell>{item?.quantity}</TableCell>
                        <TableCell className="text-right">${item?.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4}>Total</TableCell>
                      <TableCell className="text-right">
                        ${data?.items.reduce((acc, item:any) => acc + item?.price, 0)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default ViewOrder;
