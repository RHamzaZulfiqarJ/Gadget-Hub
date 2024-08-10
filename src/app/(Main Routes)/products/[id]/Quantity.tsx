"use client";

import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useState } from "react";

const Quantity = ({
  count,
  setCount,
}: {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const increment = (e: any) => {
    e.preventDefault();
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={decrement}
          className={`font-semibold px-4 py-2 rounded ${
            count === 1 ? 'bg-gray-600' : 'bg-black hover:bg-gray-800 transition-colors'
          } text-white`}
          disabled={count === 1}
        >
          -
        </Button>
        <div className="font-semibold px-4 py-2 rounded text-black">{count}</div>
        <Button
          type="button"
          onClick={increment}
          className="font-semibold px-4 py-2 rounded bg-black hover:bg-gray-800 transition-colors text-white"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Quantity;
