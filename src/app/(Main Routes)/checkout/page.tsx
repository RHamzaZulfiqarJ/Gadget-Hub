"use client";

import { useState } from "react";
import Cart from "./Cart";
import Info from "./Info";
import Loading from "./loading";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 w-full">
            <Cart />
          </div>
          <div className="lg:w-3/4 w-full">
            <Info loading={loading} setLoading={setLoading} />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
