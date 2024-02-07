import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CiPhone, CiMail, CiLocationOn } from "react-icons/ci";

import React from "react";

const contactus = () => {
  return (
    <div className="mt-10 mb-32 mx-[10%] font-primary">
      <div className="flex flex-col">
        <div className="text-3xl font-extrabold">Contact Us</div>
        <div className="flex gap-32 mt-10">
          <div className="h-full shadow-lg rounded-xl flex flex-col p-10 gap-6">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <div>
                  First Name <span className="text-red-500">*</span>
                </div>
                <Input />
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  Last Name <span className="text-red-500">*</span>
                </div>
                <Input />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                Email <span className="text-red-500">*</span>
              </div>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                Phone Number <span className="text-red-500">*</span>
              </div>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                Message <span className="text-red-500">*</span>
              </div>
              <Textarea />
            </div>
            <div>
              <Button className="bg-[#212121] rounded-none text-base flex items-center gap-2">
                Submit
              </Button>
            </div>
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
