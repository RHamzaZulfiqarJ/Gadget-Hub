import React from "react";
import { IoBagOutline, IoPencilOutline } from "react-icons/io5";
import { GiTie } from "react-icons/gi";
import { CiRuler, CiUser } from "react-icons/ci";
import { PiHandshakeThin } from "react-icons/pi";

const service = () => {
  return (
    <section className="pb-12 pt-10 dark:bg-dark lg:pb-[50px] lg:pt-[80px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Our Services
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                What We Offer
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            title="Product Selection"
            details="Discover a curated collection of clothing items that blend quality with style, offering something for every taste."
            icon={
              <IoBagOutline className="text-4xl text-white text-primary dark:text-primary" />
            }
          />
          <ServiceCard
            title="Customization Options"
            details="Personalize your wardrobe with our bespoke customization services, adding unique touches to your garments."
            icon={
              <IoPencilOutline className="text-4xl text-white text-primary dark:text-primary" />
            }
          />
          <ServiceCard
            title="Fashion Consultations"
            details="Elevate your style with expert advice from our seasoned stylists, tailored to enhance your individuality and keep you on-trend."
            icon={
              <GiTie className="text-4xl text-white text-primary dark:text-primary" />
            }
          />
          <ServiceCard
            title="Tailoring and Alterations"
            details="Ensure the perfect fit with our precision tailoring and alteration services, enhancing comfort and confidence in every wear."
            icon={
              <CiRuler className="text-4xl text-white text-primary dark:text-primary" />
            }
          />
          <ServiceCard
            title="Concierge Shopping"
            details="Personalized assistance and VIP treatment for an enhanced shopping experience with exclusive perks."
            icon={
              <PiHandshakeThin className="text-4xl text-white text-primary dark:text-primary" />
            }
          />
          <ServiceCard
            title="Fashion Events and Workshops"
            details="Immerse yourself in dynamic fashion experiences, from runway showcases to hands-on workshops."
            icon={
              <CiUser className="text-4xl text-white text-primary dark:text-primary" />
            }
          />
        </div>
      </div>
    </section>
  );
};

export default service;

const ServiceCard = ({ icon, title, details }: {icon:any, title: string, details: string}) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-9 rounded-[20px] bg-white p-10 cursor-pointer shadow-lg hover:shadow-2xl dark:bg-dark-2 md:px-7 xl:px-10 transition-all duration-500 ease-in-out">
          <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary">
            {icon}
          </div>
          <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
            {title}
          </h4>
          <p className="text-body-color dark:text-dark-6">{details}</p>
        </div>
      </div>
    </>
  );
};
