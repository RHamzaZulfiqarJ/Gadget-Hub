"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CiPhone, CiMail, CiLocationOn } from "react-icons/ci";
import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

type ContactUs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const contactus = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ContactUs>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const postData = async (e: any) => {
    e.preventDefault();
    // if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.message) {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.status == 201) {
        setOpen(true);
      }
      console.log(result, res.status);
      setData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.log(error, "An error has occured");
    } finally {
      setLoading(false);
    }
    // } else {
    //   alert("Please fill all the fields");
    // }
  };

  return (
    <div
      onClick={() => setOpen(false)}
      className="mt-10 mb-32 mx-[10%] flex justify-center font-primary">
      <div className="flex flex-col">
        <div className="text-3xl font-extrabold">Contact Us</div>
        <div className="flex xl:flex-row flex-col gap-32 mt-10">
          <div
            className={`${
              loading ? "opacity-80 cursor-not-allowed" : "opacity-100"
            } h-full shadow-lg rounded-xl flex flex-col p-10 gap-6`}>
            {loading && (
              <div className="flex justify-center items-center h-auto p-40 w-auto absolute z-0">
                <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            )}
            <div className="flex w-full flex-row gap-4 relative">
              <div className="flex flex-col gap-2">
                <div>
                  First Name <span className="text-red-500">*</span>
                </div>
                <Input
                  name="firstName"
                  value={data.firstName}
                  onChange={handleInputChange}
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  Last Name <span className="text-red-500">*</span>
                </div>
                <Input
                  value={data.lastName}
                  onChange={handleInputChange}
                  name="lastName"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                Email <span className="text-red-500">*</span>
              </div>
              <Input
                name="email"
                value={data.email}
                onChange={handleInputChange}
                type="email"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                Phone Number <span className="text-red-500">*</span>
              </div>
              <Input
                name="phone"
                value={data.phone}
                onChange={handleInputChange}
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                Message <span className="text-red-500">*</span>
              </div>
              <Textarea name="message" value={data.message} onChange={handleInputChange} required />
            </div>
            <div>
              <Button
                onClick={postData}
                className="bg-[#212121] rounded-none text-base flex items-center gap-2">
                Submit
              </Button>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
              <Alert
                onClose={() => setOpen(false)}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}>
                Response Submitted Successfully! We will contact you soon.
              </Alert>
            </Snackbar>
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-5xl font-bold">How Can We Help ?</div>
            <div className="w-[500px] text-justify">
              Please feel free to reach out to us with any inquiries, feedback, or assistance you
              may require. Our dedicated team is here to help and ensure your experience is smooth
              and satisfactory. You can contact us via email or by filling out the form on our
              website. We value your input and look forward to hearing from you soon!
            </div>
            <div className="text-lg font-light flex items-center gap-1">
              <CiPhone className="text-[30px]" />
              <div>0324 4326692</div>
            </div>
            <div className="text-lg font-light flex items-center gap-1">
              <CiMail className="text-[30px]" />
              <div>hamzazulfiqar123123@gmail.com</div>
            </div>
            <div className="text-lg font-light flex items-center gap-1">
              <CiLocationOn className="text-[30px]" />
              <div>Lahore, Pakistan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contactus;
