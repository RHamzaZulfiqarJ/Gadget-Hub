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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

import { Order } from "./Table";

import { useEffect, useState } from "react";
import Load from "@/app/(Main Routes)/cart/Load";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ChangeStatus = ({
  open,
  setOpen,
  id,
  status,
  onStatusUpdate
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  status: string;
  onStatusUpdate: (id: string, newStatus: string) => void;
}) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>("");
  
  const changeStatus = async () => {
    setLoading(true);
    try {
      await fetch(`/api/order/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      onStatusUpdate(id, newStatus);
      setLoading(false);
      setOpen(false);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        {loading ? (
          <DialogContent className="sm:max-w-md max-w-sm">
            <DialogHeader>
              <DialogTitle>Loading...</DialogTitle>
              <DialogDescription>
                <Load />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-md max-w-sm">
            <DialogHeader>
              <DialogTitle>Change your Status Here !!!</DialogTitle>
            </DialogHeader>
              <Select onValueChange={(value) => setNewStatus(value)}>
                <SelectTrigger className="w-full my-4">
                  <SelectValue placeholder={status} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={changeStatus} type="submit" size="sm" className="px-3">
                Change Status
              </Button>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default ChangeStatus;
