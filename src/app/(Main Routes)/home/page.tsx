import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PiShoppingCartBold, PiShoppingCartSimple } from "react-icons/pi";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import Link from "next/link";

const page = () => {
  return (
    <div className="font-primary overflow-x-hidden">
      {/* Section 1 */}

      <div className="px-[5%] lg:flex block justify-between items-center gap-10">
        <div className="flex flex-col gap-[45px]">
          <div className="bg-[#E1EDFF] text-[#0000FF] h-[40px] w-[120px] rounded-md flex justify-center items-center font-semibold">
            Sale 30%
          </div>
          <div className="font-extrabold sm:text-6xl text-5xl">
            Tech Haven: Your Ultimate Gadget Destination
          </div>
          <div className="text-[#7F6666] w-3/4">
          Step into a world of cutting-edge gadgets and innovative technology, crafted to elevate your lifestyle and redefine convenience.
          </div>
          <div>
            <Link className="w-[210px] h-[60px]" href={"/products"}>
              <Button className="bg-[#212121] rounded-none w-[210px] h-[60px] font-semibold text-base flex items-center gap-2">
                <PiShoppingCartBold className="text-[25px]" />
                Start Shopping
              </Button>
            </Link>
          </div>
          <div className="flex items-center sm:gap-10 gap-5 mt-2 -ml-4">
            <Image className="" src="/Featured1.png" height={25} width={95} alt="Image not found" />
            <Image src="/Featured2.png" height={25} width={95} alt="Image not found" />
            <Image src="/Featured3.png" height={25} width={95} alt="Image not found" />
            <Image src="/Featured4.png" height={25} width={95} alt="Image not found" />
          </div>
        </div>
        <div>
          <div className="h-[590px] w-[590px] rounded-full bg-[#f6f6f6] relative lg:block hidden"></div>
          <div className="absolute top-[114px]">
            <Image
              className="lg:block hidden animate-zoom"
              src="/Header.png"
              alt="Image not found"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}

      <div className="px-[8%] my-32 flex flex-col gap-6 items-center justify-center font-primary">
        <div className="text-[#0062F5] font-primary font-semibold text-sm tracking-widest">
          PROMOTIONS
        </div>
        <div className="text-[#212121] text-4xl font-extrabold text-center">
          Our Promotions Events
        </div>
        <div className="flex xl:flex-row flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center md:gap-[10px]">
            <div className="scale-100 md:w-[650px] md:h-[200px] flex md:items-center md:justify-center items-stretch justify-evenly w-full h-[300px] bg-[#f6bebe] group overflow-hidden transition-all transform-gpu hover:scale-[1.05] duration-700">
              <div className="flex md:flex-row flex-col justify-evenly items-center w-full h-full">
                <div className="flex flex-col items-center justify-center h-[200px] px-10">
                  <div className="md:text-3xl text-2xl font-bold">
                    GET UP TO <span className="md:text-4xl text-3xl">30%</span>
                  </div>
                  <div className="font-light text-lg tracking-wider">For the New Year Deal</div>
                </div>
                <div>
                  <Image
                    className="md:mb-0 mb-10 object-contain"
                    src="/event1.png"
                    height={150}
                    width={150}
                    alt="No Image found"
                  />
                </div>
              </div>
            </div>

            <div className="md:mt-0 mt-4 scale-100 md:w-[650px] md:h-[200px] flex items-center justify-center w-full h-[150px] flex-col bg-[#212121] gap-4 group overflow-hidden transition-all transform-gpu hover:scale-[1.05] duration-700">
              <div className="md:text-4xl text-3xl font-extrabold text-white">GET 30% Off</div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="font-light text-white">USE PROMO CODE</div>
                <div className="md:w-[310px] h-[40px] w-12/12 md:px-0 px-5 bg-[#474747] rounded-lg flex justify-center items-center text-white font-bold tracking-widest hover:cursor-pointer">
                  DINEWEEKENDSALE
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex xl:flex-none md:gap-4 md:mt-[10px] items-center justify-center">
            <div className="scale-100 h-[410px] xl:w-[280px] md:w-[317px] w-[280px] bg-[#242422] flex flex-col justify-evenly group overflow-hidden transition-all transform-gpu hover:scale-105  duration-700">
              <div className="p-8 text-white">
                <div className="font-light text-lg">Air Pods 2nd Gen</div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="font-light line-through">$100.00</div>
                  <div className="font-semibold">$75.00</div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image src="/event2.png" height={300} width={220} alt="No Image found" />
              </div>
            </div>

            <div className="md:mt-0 mt-4 scale-100 h-[410px] xl:w-[280px] md:w-[317px] w-[280px] bg-[#ffeed3] group overflow-hidden transition-all transform-gpu hover:scale-105 duration-700">
              <div className="p-8">
                <div className="font-light text-lg">X8 Ultra Bluetooth</div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="font-light line-through">Rs. 6000</div>
                  <div className="font-semibold">Rs. 3999</div>
                </div>
              </div>
              <div className="flex justify-center -mt-[1px]">
                <Image src="/event3.png" height={300} width={300} alt="No Image found" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}

      <div className="px-[8%] my-32 flex flex-col gap-6 items-center justify-center font-primary">
        <div className="text-[#0062F5] font-primary font-semibold text-sm tracking-widest">
          Products
        </div>
        <div className="text-[#212121] text-4xl font-extrabold text-center">Check What We Have</div>

        <div className="md:flex items-center justify-center gap-8">
          <div className="flex flex-col gap-2 hover:cursor-pointer group overflow-hidden transition-all transform-gpu hover:scale-105 duration-700">
            <div className="bg-[#b5b5b7] h-[320px] w-[300px] pt-4">
              <Image src="/card1.png" alt="No Image found" height={320} width={380} />
            </div>
            <div className="font-bold mt-2">MI 50W Power Bank 20000MAh</div>
            <div className="font-bold text-lg">Rs. 11,299</div>
          </div>
          <div className="flex flex-col gap-2 md:mt-0 mt-8 hover:cursor-pointer group overflow-hidden transition-all transform-gpu hover:scale-105 duration-700">
            <div className="bg-[#d9f2d1] h-[320px] w-[300px] pt-2">
              <Image src="/card2.png" alt="No Image found" height={400} width={380} />
            </div>
            <div className="font-bold mt-2">Xiaomi Redmi Watch 5 Active</div>
            <div className="font-bold text-lg">Rs. 8,599</div>
          </div>
          <div className="flex flex-col gap-2 md:mt-0 mt-8 hover:cursor-pointer group overflow-hidden transition-all transform-gpu hover:scale-105 duration-700">
            <div className="bg-[#f8b5b5] h-[320px] w-[300px]">
              <Image src="/card3.png" alt="No Image found" height={400} width={380} />
            </div>
            <div className="font-bold mt-2">M90 Pro TWS Gaming Earbuds</div>
            <div className="font-bold text-lg">Rs. 1,399</div>
          </div>
        </div>
      </div>

      {/* Section 4 */}

      <div className="px-[10%] flex justify-center my-32">
        <div className="opacity-5 md:text-[8rem] text-[6rem] text-center font-extrabold">
          Newsletter
        </div>
        <div className="absolute flex flex-col gap-6 items-center text-center -mb-6">
          <div className="text-4xl font-extrabold">Subscribe Our Newsletter</div>
          <div className="font-light w-11/12">
            Get the latest information and promo offers directly
          </div>
          <div className="flex justify-center w-11/12 max-w-sm items-center space-x-2">
            <Input
              className="bg-transparent border-[1px] border-black"
              type="email"
              placeholder="Input Email Address"
            />
            <Button type="submit">Get Started</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
