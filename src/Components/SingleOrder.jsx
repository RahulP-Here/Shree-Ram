import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";


const SingleOrder = ({
    billRef,
    paid,
    customer,
    customerId,
    updateList,
    currentCustomer,
    setCurrent,
}) => {
    const [startX, setStartX] = useState(0);
    const [deltaX, setDeltaX] = useState(0);

    const del = (e) => {
        e.stopPropagation();
        localStorage.removeItem(customerId);
        updateList(Object.keys(localStorage));
        if (Number(currentCustomer) === Number(customer.id)) {
            setCurrent(NaN);
        }
    };

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        const movementX = e.touches[0].clientX - startX;
        setDeltaX(movementX); // Track swipe progress
    };

    const handleTouchEnd = () => {
        if (deltaX > 100) { // Swipe left threshold
            markAsPaid(new Event("swipe"));
        }
        setDeltaX(0); // Reset swipe progress
    };

    const markAsPaid = (event) => {
        event.stopPropagation();
        let paid_order = JSON.parse(localStorage.getItem(customerId));
        paid_order.paid = true;
        localStorage.setItem(customerId, JSON.stringify(paid_order));
        updateList(Object.keys(localStorage));
        if (Number(currentCustomer) === Number(customer.id)) {
            setCurrent(NaN);
        }
    };

    const clickSetCurrent = (e) => {
        setCurrent(Number(customerId));
        billRef.current.handleAddItem();
    };

    let detail = JSON.parse(localStorage.getItem(customerId)) || customer;
    let customer_name = detail.name;
    const total = detail.ordered_items.reduce((acc, item) => {
        return acc + item.item_price * item.item_quantity;
    }, 0);

    let extra_style = " border-b border-b-light-text";
    if (Number(currentCustomer) === Number(customer.id)) {
        extra_style = "";
    }

    // Dynamic styles for fade/highlight
    const swipeStyle = {
        opacity: 1 - Math.min(Math.abs(deltaX) / 100, 0.6), // Fade effect
        backgroundColor: deltaX > 10 ? "green" : (Number(currentCustomer) === Number(customer.id))? "white":"inherit", // Highlight effect
        transform: `translateX(${deltaX}px)` // Visual swipe movement
    };

    return (
        <div
            onClick={clickSetCurrent}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={swipeStyle}
            className={"cursor-pointer flex justify-between items-center px-2 py-2" + extra_style}
        >
            <div className="flex flex-col w-1/2">
                <h4 className="font-semibold text-xl truncate w-full text-text">
                    {customer_name}
                </h4>
                {paid ? (
                    <span className="font-extrabold text-lg">{total}.00 Rs</span>
                ) : (
                    <span className="font-bold text-accent text-lg">{total}.00 Rs</span>
                )}
            </div>
            <div className="label flex gap-2 items-center">
                {paid ? (
                    (
                        <button
                            onClick={del}
                            className="text-3xl text-red-500 rounded-[50%] bg-alwhite"
                        >
                            <MdDeleteForever />
                        </button>
                    )
                ) :""
                
                }

            </div>
        </div>
    );
};

export default SingleOrder;
