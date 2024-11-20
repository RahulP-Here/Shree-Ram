import { useCallback, useState, useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import LiveOrder from './Components/LiveOrder'
import Bill from './Components/Bill'
import Menu from './Components/Menu'
import Modal from './Components/Modal'

function App() {

  const [ShowModal, setShowModal] = useState(false)

  const [customerList, setCustomerList] = useState(Object.keys(localStorage));

  const [currentCustomer, setCurrentCustomer] = useState(NaN);

  const [ispaid, setIspaid] = useState(false);

  const FoodItems = [
    { id: 1, name: 'સિંગલ નંગ ', price: 15, pic_path: '/images/foodItems/single-piece.png' },
    { id: 2, name: 'મસાલા નંગ ', price: 20, pic_path: '/images/foodItems/masala-piece.png' },
    { id: 3, name: 'બ્રેડ પકોડા', price: 25, pic_path: '/images/foodItems/bread-pakoda.png' },
    { id: 4, name: 'ઈડલી પ્લેટ', price: 40, pic_path: '/images/foodItems/idli-plate.png' },
    { id: 5, name: 'વડા પ્લેટ', price: 45, pic_path: '/images/foodItems/vada-plate.png' },
    { id: 6, name: 'મીક્ષ પ્લેટ', price: 45, pic_path: '/images/foodItems/mix-plate.png' },
    { id: 7, name: 'પેપર ઢોંસા', price: 40, pic_path: '/images/foodItems/paper-dhosa.png' },
    { id: 8, name: 'મસાલા ઢોંસા', price: 60, pic_path: '/images/foodItems/masala-dhosa.png' },
    { id: 9, name: 'પાણી ની બોટલ', price: 10, pic_path: '/images/foodItems/water-bottle.png' },
    { id: 10, name: 'મસાલા છાશ', price: 10, pic_path: '/images/foodItems/masala-chass.png' },
  ];

  /* 
  const FoodItems = [
    { id: 1, name: 'Single Piece', price: 15, pic_path:'/images/foodItems/single-piece.png' },
    { id: 2, name: 'Masala Piece', price: 20, pic_path:'/images/foodItems/masala-piece.png' },
    { id: 3, name: 'Bread Pakoda', price: 25, pic_path:'/images/foodItems/bread-pakoda.png' },
    { id: 4, name: 'Idli Plate', price: 40, pic_path:'/images/foodItems/idli-plate.png' },
    { id: 5, name: 'Vada Plate', price: 45, pic_path:'/images/foodItems/vada-plate.png' },
    { id: 6, name: 'Mix Plate', price: 45, pic_path:'/images/foodItems/mix-plate.png' },
    { id: 7, name: 'Paper Dosa', price: 40, pic_path:'/images/foodItems/paper-dhosa.png' },
    { id: 8, name: 'Masala Dosa', price: 60, pic_path:'/images/foodItems/masala-dhosa.png' },
    { id: 9, name: 'Water Bottle', price: 10, pic_path:'/images/foodItems/water-bottle.png' },
    { id: 10, name: 'Masala Chhas', price: 10, pic_path:'/images/foodItems/masala-chass.png' },
  ];
  */

  // For update CustomerList every CRUD operation in Local Storage
  const update = () => {
    setCustomerList(Object.keys(localStorage));
  }

  return (
    <>
      <Navbar isPaid={ispaid} setIsPaid={setIspaid} setCurrent={setCurrentCustomer} />
      <div className="flex mx-auto w-full py-2 px-4 gap-2" style={{ height: 'calc(100dvh - 76px)' }}>

        <LiveOrder paid={ispaid} setIsPaid={setIspaid} list={customerList} showModal={setShowModal} updateList={setCustomerList} currentCustomer={currentCustomer} setCurrent={setCurrentCustomer} />

        <Bill foodItems={FoodItems} current={currentCustomer} update={update} isPaid={ispaid} setCurrent={setCurrentCustomer}/>

        <Menu foodItems={FoodItems} currentCustomer={currentCustomer} update={update} updateList={setCustomerList} />

        {ShowModal && <Modal closeModal={() => { setShowModal(false) }} setCurrent={setCurrentCustomer} updateList={setCustomerList} setIspaid={setIspaid} list={customerList} paid={ispaid}/>}

      </div>

    </>

  )
}

export default App
