"use client";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import Create from "./Create";

const page = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Tooltip title="Add Product" arrow placement="bottom">
        <button onClick={() => setOpen(true)} className="rounded-full p-2 bg-blue-400 text-white hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out active:bg-blue-600">
          <IoAddSharp className="text-[25px]" />
        </button>
      </Tooltip>

      <Create open={open} setOpen={setOpen} />
    </div>
  );
};

export default page;
