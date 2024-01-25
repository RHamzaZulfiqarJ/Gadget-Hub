"use client";

import React, { useState } from "react";

const Quantity = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
    console.log(count);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
    console.log(count);
  };

  return (
    <div>
      <div className="flex gap-3">
        {count == 1 ? (
          <button
            disabled
            onClick={decrement}
            className="font-semibold px-4 py-2 rounded bg-gray-600 text-white">
            -
          </button>
        ) : (
          <button
            onClick={decrement}
            className="font-semibold px-4 py-2 rounded bg-black hover:bg-gray-800 transition-colors text-white">
            -
          </button>
        )}
        <div className="font-semibold px-4 py-2 rounded text-black">{count}</div>
        <button
          onClick={increment}
          className="font-semibold px-4 py-2 rounded bg-black hover:bg-gray-800 transition-colors text-white">
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
