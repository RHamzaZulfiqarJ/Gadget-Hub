"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "@/components/ui/input";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

type Post = {
  title: string;
  description: string;
  category: string;
  price: number;
  img: string[];
};

export default function Create({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Post>({
    title: "",
    description: "",
    category: "",
    price: 0,
    img: [],
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const postData = () => {
    
  }

  const Categories = ["Fancy", "Casual", "Formal", "Sports", "Party", "Wedding"];

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="font-primary">Add New Product</DialogTitle>
        <DialogContent>
          <div className="my-6 px-4">
            <div className="flex items-center justify-between gap-[104px]">
              <div className="text-xl">Title</div>
              <Input
                name="title"
                value={data.title}
                onChange={handleInputChange}
                className="font-primary"
              />
            </div>
            <div className="flex items-center justify-between gap-10 mt-4">
              <div className="text-xl">Description</div>
              <Input
                name="description"
                value={data.description}
                onChange={handleInputChange}
                className="font-primary"
              />
            </div>
            <div className="flex items-center justify-between gap-[60px] mt-4">
              <div className="text-xl">Category</div>
              <FormControl fullWidth>
                <Select
                  name="category"
                  value={data.category}
                  onChange={handleInputChange}
                  className="h-10">
                  {Categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex items-center justify-between gap-[96px] mt-4">
              <div className="text-xl">Price</div>
              <Input
                name="price"
                value={data.price}
                onChange={handleInputChange}
                className="font-primary"
              />
            </div>
            <div className="flex items-center justify-between gap-[86px] mt-4">
              <div className="text-xl">Image</div>
              <Input
                type="file"
                name="img"
                multiple
                onChange={handleInputChange}
                className="font-primary"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={postData}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
