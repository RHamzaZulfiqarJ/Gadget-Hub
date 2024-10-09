"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Checkbox, FormControlLabel } from "@mui/material";
import Loading from "./loading";

type CartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  size: string;
  category: string;
  img: string[];
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Info(
  { loading, setLoading }: { loading: boolean; setLoading: React.Dispatch<React.SetStateAction<boolean>> }
) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [checked, setChecked] = React.useState(false);
  
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [homeAddress, setHomeAddress] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("cash");
  const [attachment, setAttachment] = useState<File>({} as File);
  const [status, setStatus] = useState<string>("Pending");
  const [items, setItems] = useState<object[]>([]);

  const [cart, setCart] = useState<CartItem[]>([]);

  const getData = async () => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("homeAddress", homeAddress);
      formData.append("shippingAddress", shippingAddress);
      formData.append("city", city);
      formData.append("code", code);
      formData.append("paymentType", paymentType);
      if (attachment) {
        formData.append("attachment", attachment);
      } else {
        formData.append("attachment", "");
      }
      formData.append("status", status);
      formData.append("items", JSON.stringify(cart));

      const res = await axios.post("/api/order", formData);
    } catch (error) {
      console.error(error);
    } finally {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setHomeAddress("");
      setShippingAddress("");
      setCity("");
      setCode("");
      setPaymentType("");
      setAttachment({} as File);
      setItems([]);

      localStorage.removeItem("cart");

      window.location.href = "/products";

      setLoading(false);
    }
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      setShippingAddress(homeAddress);
    } else {
      setShippingAddress(""); // Or set to a default value if needed
    }
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography className="font-bold">Your Personal Details</Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col gap-4">
              <div className="flex sm:flex-row flex-col gap-4 w-full">
                <div className="grid w-full max-w-lg items-center gap-1.5">
                  <Label className="mb-2" htmlFor="firstName">
                    First Name
                  </Label>
                  <Input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    name="firstName"
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                  />
                </div>
                <div className="grid w-full max-w-lg items-center gap-1.5">
                  <Label className="mb-2" htmlFor="lastName">
                    Last Name
                  </Label>
                  <Input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    name="lastName"
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="flex sm:flex-row flex-col gap-4">
                <div className="grid w-full max-w-lg items-center gap-1.5">
                  <Label className="mb-2" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="grid w-full max-w-lg items-center gap-1.5">
                  <Label className="mb-2" htmlFor="phone">
                    Phone Number
                  </Label>
                  <Input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    name="phone"
                    type="number"
                    id="phone"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div className="w-full">
                <Label htmlFor="homeAddress">Home Address</Label>
                <Input
                  onChange={(e) => setHomeAddress(e.target.value)}
                  value={homeAddress}
                  name="homeAddress"
                  className="mt-2"
                  type="text"
                  id="homeAddress"
                  placeholder="Home Address"
                />
              </div>
              <div className="flex sm:flex-row flex-col gap-4">
                <div className="grid w-full max-w-lg items-center gap-1.5">
                  <Label className="mb-2" htmlFor="city">
                    City
                  </Label>
                  <Input
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    name="city"
                    type="text"
                    id="city"
                    placeholder="City"
                  />
                </div>
                <div className="grid w-full max-w-lg items-center gap-1.5">
                  <Label className="mb-2" htmlFor="postCode">
                    Post Code
                  </Label>
                  <Input
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    name="code"
                    type="number"
                    id="postCode"
                    placeholder="Post Code"
                  />
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Typography className="font-bold">Shipping Address</Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col gap-4">
              <div className="w-full">
                <Label htmlFor="shippingAddress">Shipping Address</Label>
                {checked ? (
                  <Input
                    value={homeAddress}
                    name="shippingAddress"
                    className="mt-2"
                    type="text"
                    id="shippingAddress"
                    placeholder="Shipping Address"
                    disabled
                  />
                ) : (
                  <Input
                    onChange={(e) => setShippingAddress(e.target.value)}
                    value={shippingAddress}
                    name="shippingAddress"
                    className="mt-2"
                    type="text"
                    id="shippingAddress"
                    placeholder="Shipping Address"
                  />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  name="checked"
                  color="primary"
                  className="peer h-5 w-5 border border-gray-300 rounded-md checked:bg-black-600 checked:border-transparent"
                />
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Same as Home Address
                </Label>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Typography className="font-bold">Payment</Typography>
            </AccordionSummary>
            <AccordionDetails className="w-full">
              <Tabs defaultValue="cash" className="w-full">
                <TabsList>
                  <TabsTrigger onClick={() => setPaymentType("online")} value="online">
                    Online Payment
                  </TabsTrigger>
                  <TabsTrigger onClick={() => setPaymentType("cash")} value="cash">
                    Cash on Delievery
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="online">
                  <div className="text-red-500">
                    For Online Transaction, transfer your money at{" "}
                    <span className="text-black font-bold">03244326692</span> and attach the payment
                    transaction receipt below.
                  </div>
                  <Input
                    onChange={handleFileInput}
                    name="attachment"
                    className="mt-2"
                    type="file"
                  />
                </TabsContent>
                <TabsContent value="cash">
                  <div className="text-red-500">
                    For Cash on Delievery, pay your money at the time of delievery.
                  </div>
                </TabsContent>
              </Tabs>
            </AccordionDetails>
          </Accordion>
          {expanded === "panel3" && (
            <div className="flex justify-end mt-4">
              <Button type="submit" className=" px-4 py-2 rounded-md">
                Place in Your Order
              </Button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
