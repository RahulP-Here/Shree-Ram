import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { MdFastfood, MdNoFood, MdDeleteForever } from "react-icons/md";
import { FcPaid } from "react-icons/fc";


const Order = ({ paid, customer, customerId, updateList, currentCustomer, setCurrent }) => {

  const del = (e) => {
    e.stopPropagation();
    localStorage.removeItem(customerId);
    updateList(Object.keys(localStorage));
    if (Number(currentCustomer) === Number(customer.id)) {
      setCurrent(NaN);
    }
  }

  const markAsPaid = (event) => {
    event.stopPropagation();
    let paid_order = JSON.parse(localStorage.getItem(customerId));
    paid_order.paid = true;
    localStorage.setItem(customerId, JSON.stringify(paid_order));
    updateList(Object.keys(localStorage));

    if (Number(currentCustomer) === Number(customer.id)) {
      setCurrent(NaN);
    }

  }

  const clickSetCurrent = (e) => {
    setCurrent(Number(customerId));
  }

  let detail = JSON.parse(localStorage.getItem(customerId)) || customer;

  let customer_name = detail.name;
  const total = detail.ordered_items.reduce((acc, item) => {
    return acc + (item.item_price * item.item_quantity);
  }, 0);

  let extra_style = ' border-b border-b-light-text';
  if (Number(currentCustomer) === Number(customer.id)) {
    extra_style = ' bg-white';
  }

  return (

    <div onClick={clickSetCurrent} className={'cursor-pointer flex justify-between items-center px-2 py-2' + extra_style}>
      <div className="flex flex-col w-1/2">
        <h4 className='font-semibold text-xl truncate w-full text-text'>{customer_name}</h4>
        {paid ? <span className='font-extrabold text-lg'>{total}.00 Rs</span> :
          <span className='font-bold  text-accent text-lg'>{total}.00 Rs</span>}
      </div>
      <div className="label flex gap-2 items-center">

        {paid ? "" :
          <button onClick={markAsPaid} className='text-3xl rounded-[50%] bg-alwhite'><FcPaid /></button>}
        <button onClick={del} className='text-3xl text-red-500 rounded-[50%] bg-alwhite'><MdDeleteForever /></button>
      </div>
    </div>
  )
}


const LiveOrder = ({ paid, setIsPaid, list, showModal, updateList, currentCustomer, setCurrent }) => {


  const [orders, setOrders] = useState([])

  useEffect(() => {
    let order_list = list.map(id => {
      let orderDetail = JSON.parse(localStorage.getItem(id) || '{}');
      return { id, ...orderDetail };
    });

    setOrders(order_list.filter(order => order.paid === paid));
  }, [list, paid])


  const addCustomer = () => {
    showModal(true);
  }

  const change = () => {
    setIsPaid(!paid);
    setCurrent(NaN);
  }

  return (
    <aside className='border border-black min-w-[15rem] w-[25%] relative flex flex-col h-full bg-light-primary px-2 py-1 gap-2 rounded-md'>
      <div className='bg-alwhite flex justify-between items-center rounded-md px-2 cursor-pointer select-none' onClick={change}>
        {!paid && <>
          <span className='font-bold text-3xl text-accent'><MdFastfood /></span>
          <h3 className='font-bold text-2xl py-4 pl-2 text-text'>Live Orders</h3>
        </>}
        {paid && <>
          <span className='font-bold text-3xl text-accent'><MdNoFood /></span>
          <h3 className='font-bold text-2xl py-4 pl-2 text-text'>Closed Orders</h3>
        </>}
      </div>


      <div className="order-list flex flex-col gap-4 overflow-auto scrollbar-custom h-full ">
        {orders.map((customer, index) => {
          return <Order paid={paid} customer={customer} customerId={customer.id} key={customer.id} updateList={updateList} currentCustomer={currentCustomer} setCurrent={setCurrent} />
        })}
      </div>


      <button className='p-4 rounded-md bg-primary text-white font-bold sticky bottom-2 w-full' onClick={addCustomer}>ADD</button>
    </aside>
  )
}

export default LiveOrder;
