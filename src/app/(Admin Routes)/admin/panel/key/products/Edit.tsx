import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from "react";
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
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

type PostData = {
  title: string;
  category: string;
  description: string;
  price: number;
  img: string[];
};

export default function Edit({
  id,
  product,
  setProduct,
  open,
  setOpen,
  onProductUpdate,
}: {
  id: string;
  product: PostData;
  setProduct: React.Dispatch<React.SetStateAction<PostData>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onProductUpdate: () => void;
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setImg([]);
    }
  }, [product]);

  const [title, setTitle] = useState<string>(product.title || "");
  const [category, setCategory] = useState<string>(product.category || "");
  const [description, setDescription] = useState<string>(product.description || "");
  const [price, setPrice] = useState<number>(product.price || 0);
  const [img, setImg] = useState<File[]>(product.img?.map((img) => new File([], img)) || []);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImg((prevImg) => [...prevImg, ...files]);
      setProduct((prevProduct) => ({
        ...prevProduct,
        img: [...prevProduct.img, ...files.map((file) => URL.createObjectURL(file))],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("price", price.toString());
      product.img.forEach((img) => formData.append("img", img));

      console.log("Form Data:", formData); // Log the form data
      
      const response = await axios.put(`/api/post/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response.data); // Log the response
      setOpen(false);
      onProductUpdate();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  const Categories = ["Fancy", "Casual", "Formal", "Sports", "Party", "Wedding"];

  const handleDeleteImage = (index: number): void => {
    const updatedImages = [...product.img];
    updatedImages.splice(index, 1);
    setProduct({ ...product, img: updatedImages });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <DialogTitle className="font-primary">Edit Product</DialogTitle>
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
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="font-primary"
              />
            </div>
            <div className="flex gap-[86px] mt-4">
              <div className="text-xl">Image</div>
              <div className="px-[1%] flex gap-3 flex-wrap justify-start">
                {product?.img?.map((file, index) => (
                  <div key={index} className="relative">
                    <img src={file} alt="Product" className="h-32 w-32 object-cover rounded-sm" />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 p-1 bg-gray-400 hover:bg-gray-300 transition-all duration-300 rounded-full"
                      onClick={() => handleDeleteImage(index)}>
                      <IoClose />
                    </button>
                  </div>
                ))}
                <div onClick={handleDivClick} className="h-32 w-32 flex justify-center items-center rounded-sm hover:cursor-pointer bg-gray-400 hover:bg-gray-300 transition-all duration-300">
                  <FaPlus />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileInput}
                  multiple
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            className="bg-red-600 text-white hover:bg-red-500 rounded-lg p-2"
            onClick={handleClose}
            disabled={loading}>
            Cancel
          </Button>
          <Button
            className="bg-blue-400 text-white hover:bg-blue-500 rounded-lg p-2"
            type="submit"
            disabled={loading}>
            {loading ? (
              <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
