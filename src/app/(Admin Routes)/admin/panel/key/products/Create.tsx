import React, { useState, ChangeEvent, FormEvent } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "@/components/ui/input";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";

type PostData = {
  title: string;
  category: string;
  description: string;
  price: number;
  img: string;
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
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [img, setImg] = useState<File[]>([]);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImg(Array.from(e.target.files));
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("price", price.toString());
      img.forEach((img) => formData.append("img", img));
      const res = await axios.post("/api/post", formData);
      console.log(res.data);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setTitle("");
      setCategory("");
      setDescription("");
      setPrice(0);
      setImg([]);
    }
  };

  const Categories = ["Fancy", "Casual", "Formal", "Sports", "Party", "Wedding"];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <DialogTitle className="font-primary">Add New Product</DialogTitle>
        <DialogContent>
          <div className="my-6 px-4">
            <div className="flex items-center justify-between gap-[104px]">
              <div className="text-xl">Title</div>
              <Input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-primary"
                required
              />
            </div>
            <div className="flex items-center justify-between gap-10 mt-4">
              <div className="text-xl">Description</div>
              <Input
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="font-primary"
              />
            </div>
            <div className="flex items-center justify-between gap-[60px] mt-4">
              <div className="text-xl">Category</div>
              <FormControl fullWidth>
                <Select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as string)}
                  className="h-10"
                >
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
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="font-primary"
              />
            </div>
            <div className="flex items-center justify-between gap-[86px] mt-4">
              <div className="text-xl">Image</div>
              <Input
                type="file"
                name="img"
                accept="image/*"
                multiple={true}
                onChange={handleFileInput}
                className="font-primary"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button className="bg-red-600 text-white hover:bg-red-500 rounded-lg p-2" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button className="bg-blue-400 text-white hover:bg-blue-500 rounded-lg p-2" type="submit" disabled={loading}>
            {loading ? (
              <div className="flex justify-center py-[8%]">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            ) : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
