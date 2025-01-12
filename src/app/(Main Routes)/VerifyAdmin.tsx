"use client";

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

import { ArrowRight, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const VerifyAdmin = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    const correctPassword = "4g9a7JTwl2";
    if (password === correctPassword) {
      localStorage.setItem("isAuthenticated", "true");
      window.location.href = "/admin/panel/dnY1saRBTAmVlUAULSo0QXRDiv80hBAZ5SWoHv9noMxehvb4Ft/";
    } else {
      toast.error("Incorrect Password");
    }
  };

  return (
    <div className="mx-6">
      <Dialog open={open}>
        <DialogContent className="sm:max-w-md max-w-sm">
          <DialogHeader>
            <DialogTitle>Verify Yourself !!!</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleLogin} type="submit" size="sm" className="px-3">
              <ArrowRight />
            </Button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full" onClick={() => setOpen(false)} type="button">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerifyAdmin;
