import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiShoppingCartBold, PiShoppingCartSimple } from "react-icons/pi";

const page = () => {
  return (
    <div className="px-[8%] font-primary overflow-x-hidden">
      {/* Section 1 */}

      <div className="lg:flex block justify-between items-center gap-10">
        <div className="flex flex-col gap-y-[45px]">
          <div className="bg-[#E1EDFF] text-[#0000FF] h-[40px] w-[120px] rounded-md flex justify-center items-center font-semibold">
            Sale 70%
          </div>
          <div className="font-extrabold text-6xl">An Industrial Take on Streetwear</div>
          <div className="text-[#7F6666] w-3/4">
            Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.
          </div>
          <div>
            <Button className="bg-[#212121] rounded-none w-[210px] h-[60px] font-semibold text-base flex items-center gap-2">
              <PiShoppingCartBold className="text-[25px]" />
              Start Shopping
            </Button>
          </div>
          <div className="flex items-center gap-10 mt-2">
            <Image src="/Featured1.png" height={25} width={95} alt="Image not found" />
            <Image src="/Featured2.png" height={25} width={95} alt="Image not found" />
            <Image src="/Featured3.png" height={25} width={95} alt="Image not found" />
            <Image src="/Featured4.png" height={25} width={95} alt="Image not found" />
          </div>
        </div>
        <div>
          <div className="h-[590px] w-[590px] rounded-full bg-[#FFECE3] relative lg:block hidden"></div>
          <div className="absolute top-[114px]">
            <Image
              className="lg:block hidden"
              src="/header.png"
              alt="Image not found"
              width={640}
              height={640}
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}

      <div className="my-32 flex flex-col gap-6 items-center justify-center font-primary">
        <div className="text-[#0062F5] font-primary font-semibold text-sm tracking-widest">
          PROMOTIONS
        </div>
        <div className="text-[#212121] text-4xl font-extrabold">Our Promotions Events</div>
        <div className="xl:flex items-center justify-center gap-4">
          <div className="flex flex-col md:gap-[10px]">
            <div className="md:scale-100 scale-75 w-[650px] h-[200px] bg-[#D6D6D8] group overflow-hidden transition-all transform-gpu hover:scale-[.8] md:hover:scale-105 duration-700">
              <div className="flex">
                <div className="flex flex-col justify-center h-[200px] px-10">
                  <div className="text-3xl font-bold">
                    GET UP TO <span className="text-4xl">60%</span>
                  </div>
                  <div className="font-light text-lg tracking-wider">For the summer season</div>
                </div>
                <div>
                  <Image src="/event1.webp" height={220} width={260} alt="No Image found" />
                </div>
              </div>
            </div>

            <div className="md:scale-100 scale-75 w-[650px] h-[200px] bg-[#212121] flex flex-col gap-4 justify-center items-center group overflow-hidden transition-all transform-gpu hover:scale-[.8] md:hover:scale-105 duration-700">
              <div className="text-4xl font-extrabold text-white">GET 30% Off</div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <div className="font-light text-white">USE PROMO CODE</div>
                <div className="w-[310px] h-[40px] bg-[#474747] rounded-lg flex justify-center items-center text-white font-bold tracking-widest hover:cursor-pointer">
                  DINEWEEKENDSALE
                </div>
              </div>
            </div>
          </div>

          <div className="flex xl:flex-none md:gap-4 md:mt-[10px] items-center justify-center">
            <div className="md:scale-100 scale-75 h-[410px] xl:w-[280px] md:w-[317px] w-[280px] bg-[#EFE1C7] flex flex-col justify-between group overflow-hidden transition-all transform-gpu hover:scale-[.8] md:hover:scale-105  duration-700">
              <div className="p-8">
                <div className="font-light text-lg">Flex Sweatshirt</div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="font-light line-through">$100.00</div>
                  <div className="font-semibold">$75.00</div>
                </div>
              </div>
              <div className="flex justify-center">
                <Image src="/event2.webp" height={300} width={220} alt="No Image found" />
              </div>
            </div>

            <div className="md:scale-100 scale-75 h-[410px] xl:w-[280px] md:w-[317px] w-[280px] bg-[#D7D7D9] group overflow-hidden transition-all transform-gpu hover:scale-[.8] md:hover:scale-105  duration-700">
              <div className="p-8">
                <div className="font-light text-lg">Flex Button Bomber</div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="font-light line-through">$100.00</div>
                  <div className="font-semibold">$75.00</div>
                </div>
              </div>
              <div className="flex justify-center -mt-[1px]">
                <Image src="/event3.webp" height={300} width={220} alt="No Image found" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}

      <div className="my-32 flex flex-col gap-6 items-center justify-center font-primary">
        <div className="text-[#0062F5] font-primary font-semibold text-sm tracking-widest">
          Products
        </div>
        <div className="text-[#212121] text-4xl font-extrabold">Check What We Have</div>

        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col gap-2 hover:cursor-pointer group overflow-hidden transition-all transform-gpu hover:scale-[.8] md:hover:scale-105 duration-700">
            <div className="bg-[#D6D6D8] h-[400px] w-[380px]">
              <Image src="/card1.png" alt="No Image found" height={400} width={380} />
            </div>
            <div className="font-bold mt-2">Brushed Raglan Sweatshirt</div>
            <div className="font-bold text-lg">$195</div>
          </div>
          <div className="flex flex-col gap-2 group overflow-hidden transition-all transform-gpu hover:scale-[.8] md:hover:scale-105 duration-700">
            <div className="bg-[#EBE7E4] h-[400px] w-[380px]">
              <Image src="/card3.png" alt="No Image found" height={400} width={380} />
            </div>
            <div className="font-bold mt-2">Cameryn Sash Tie Dress</div>
            <div className="font-bold text-lg">$545</div>
          </div>
          <div className="flex flex-col gap-2 group overflow-hidden transition-all transform-gpu hover:scale-[.8] md:hover:scale-105 duration-700">
            <div className="bg-[#D6D6D8] h-[400px] w-[380px]">
              <Image src="/card2.png" alt="No Image found" height={400} width={380} />
            </div>
            <div className="font-bold mt-2">Flex Sweatshirt</div>
            <div className="font-bold text-lg">$175</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
