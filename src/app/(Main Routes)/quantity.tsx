"use client"

import { useGlobalState } from "@/context/GlobalStateContext"

const Quantity = () => {
    const {cart} = useGlobalState()

    let quantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div>
            {quantity}
        </div>
    )
}

export default Quantity;