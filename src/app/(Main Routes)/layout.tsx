"use client";

import React, { useState } from "react";

import "../globals.css";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { PiShoppingCartSimple, PiList } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Quantity from './quantity'

import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import VerifyAdmin from "./VerifyAdmin";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <header className="flex overflow-x-hidden items-center justify-between w-full py-8 font-primary px-10">
          <Link href="/home">
            <Image width={100} height={35} className="-mt-2" src="/Logo.png" alt="No Image found" />
          </Link>
          <div className="hidden gap-12 lg:flex">
            <Link
              className="hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer"
              href="/home">
              Home
            </Link>
            <Link
              className="hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer"
              href="/products">
              Products
            </Link>
            <Link
              className="hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer"
              href="/contact-us">
              Contact Us
            </Link>
            <Link
              className="hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer"
              href="/services">
              Services
            </Link>
          </div>
          <div className="relative sm:block hidden">
            <CiSearch className="absolute left-0 top-0 mt-[7px] ml-2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="What are you looking for ?"
              className="w-[350px] xl:w-[370px] h-[30px] pl-10"
            />
          </div>
          <div>
            <Link href={'/cart'} className="lg:block hidden relative p-1 group hover:cursor-pointer overflow-hidden transition-all transform-gpu hover:scale-[1.20] duration-700">
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-[4px] py-[2px] text-xs">
                <Quantity />
              </div>
              <div className="bg-[#F1F1F1] rounded-full p-[10px]">
                <PiShoppingCartSimple className="text-[25px]" />
              </div>
            </Link>
            <div className="lg:hidden block p-1 group hover:cursor-pointer overflow-hidden transition-all transform-gpu hover:scale-[1.20] duration-700">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="rounded-full p-[10px]">
                    <PiList className="text-[25px]" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-12">
                  <Link href={"/cart"}>
                    <DropdownMenuItem className="hover:cursor-pointer flex justify-between py-2">
                      <div>Open Cart</div>
                      <div className="bg-red-500 text-white rounded-full px-[4px] py-[2px] text-xs">
                        <Quantity />
                      </div>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <Link href="/home">
                    <DropdownMenuItem className="hover:cursor-pointer">Home</DropdownMenuItem>
                  </Link>
                  <Link href="/products">
                    <DropdownMenuItem className="hover:cursor-pointer">Products</DropdownMenuItem>
                  </Link>
                  <Link href="/contact-us">
                    <DropdownMenuItem className="hover:cursor-pointer">Contact Us</DropdownMenuItem>
                  </Link>
                  <Link href="/services">
                    <DropdownMenuItem className="hover:cursor-pointer">Services</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {children}

        <footer>
          <div className="overflow-x-hidden px-[8%] mt-20 md:flex-row flex-col flex gap-4 justify-around">
            <div className="flex flex-col gap-8">
              <div>
                <Image src="/Logo.png" alt="No Image Found" height={30} width={180} />
              </div>
              <div className="text-[#666666] w-[360px] ">
                Step into a world of cutting-edge gadgets and innovative technology, crafted to elevate your lifestyle and redefine convenience.
              </div>
              <div className="flex gap-4 items-center">
                <div className="relative p-1 group hover:cursor-pointer overflow-hidden transition-all transform-gpu hover:scale-[1.20] duration-700">
                  <div className="bg-[#F1F1F1] rounded-lg p-[12px]">
                    <FaTwitter className="text-[23px]" />
                  </div>
                </div>
                <div className="relative p-1 group hover:cursor-pointer overflow-hidden transition-all transform-gpu hover:scale-[1.20] duration-700">
                  <div className="bg-[#F1F1F1] rounded-lg p-[12px]">
                    <FaFacebookF className="text-[23px]" />
                  </div>
                </div>
                <div className="relative p-1 group hover:cursor-pointer overflow-hidden transition-all transform-gpu hover:scale-[1.20] duration-700">
                  <div className="bg-[#F1F1F1] rounded-lg p-[12px]">
                    <FaLinkedinIn className="text-[23px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-xl font-bold text-[#666666]">Company</div>
              <div className="text-[#666666] hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer">
                About
              </div>
              <div className="text-[#666666] hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer">
                Terms of Use
              </div>
              <div className="text-[#666666] hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer">
                Privacy Policy
              </div>
              <div className="text-[#666666] hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer">
                How it Works
              </div>
              <div className="text-[#666666] hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer">
                Contact Us
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-xl font-bold text-[#666666]">Support</div>
              <div className="text-[#666666] hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer">
                Support Carrier
              </div>
              <div className="text-[#666666] hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer">
                24/7 Service
              </div>
              <div className="text-[#666666] hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer">
                Quick Chat
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="text-xl font-bold text-[#666666]">Contact</div>
              <div className="text-[#666666] hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer">
                Whatsapp
              </div>
              <div className="text-[#666666] hover:text-red-500 transition-colors ease-in-out duration-500 cursor-pointer">
                Support 24/7
              </div>
            </div>
          </div>

          <div className="flex justify-center my-10">
            <div onClick={() => setOpen(true)} className="text-center w-52 cursor-pointer rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
              Admin Panel
            </div>
          </div>

          <div className="border-t-[1px] lg:text-lg text-[#666666] border-t-black w-screen p-6 flex md:flex-row flex-col justify-center md:justify-around">
            <div>Copyright © 2023 Gadget Hub</div>
            <div>
              Design by: <span className="text-black font-bold">Hamza Zulfiqar</span>
            </div>
            <div>
              Code by: <span className="text-black font-bold">Hamza Zulfiqar</span>
            </div>
          </div>
        </footer>

        <VerifyAdmin open={open} setOpen={setOpen} />

      </body>
    </html>
  );
}
