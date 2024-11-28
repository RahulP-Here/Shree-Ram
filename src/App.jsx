import { useCallback, useState, useEffect, useRef } from 'react'
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

  const billRef = useRef();
  
  const FoodItems = [
    { id: 1, name: 'મીક્ષ પ્લેટ', price: 45, pic_path: '/images/foodItems/mix-plate.png' },
    { id: 2, name: 'મસાલા ઢોંસા', price: 60, pic_path: '/images/foodItems/masala-dhosa.png' },
    { id: 3, name: 'બ્રેડ પકોડા', price: 25, pic_path: '/images/foodItems/bread-pakoda.png' },
    { id: 4, name: 'સિંગલ નંગ ', price: 15, pic_path: '/images/foodItems/single-piece.png' },
    { id: 5, name: 'મસાલા નંગ ', price: 20, pic_path: '/images/foodItems/masala-piece.png' },
    { id: 6, name: 'પેપર ઢોંસા', price: 40, pic_path: '/images/foodItems/paper-dhosa.png' },
    { id: 7, name: 'પાણી ની બોટલ', price: 10, pic_path: '/images/foodItems/water-bottle.png' },
    { id: 8, name: 'મસાલા છાશ', price: 10, pic_path: '/images/foodItems/masala-chass.png' },
  ];



  // For update CustomerList every CRUD operation in Local Storage
  const update = () => {
    setCustomerList(Object.keys(localStorage));
  }

  return (
    <>
      <Navbar isPaid={ispaid} setIsPaid={setIspaid} setCurrent={setCurrentCustomer} />
      <div className="flex mx-auto w-full py-2 px-4 gap-2" style={{ height: 'calc(100dvh - 76px)' }}>

        <LiveOrder billRef={billRef} paid={ispaid} setIsPaid={setIspaid} list={customerList} showModal={setShowModal} updateList={setCustomerList} currentCustomer={currentCustomer} setCurrent={setCurrentCustomer} />

        <Bill ref={billRef} foodItems={FoodItems} current={currentCustomer} update={update} isPaid={ispaid} setCurrent={setCurrentCustomer}/>

        <Menu billRef={billRef} foodItems={FoodItems} currentCustomer={currentCustomer} update={update} />

        {ShowModal && <Modal closeModal={() => { setShowModal(false) }} setCurrent={setCurrentCustomer} updateList={setCustomerList} setIspaid={setIspaid} list={customerList} paid={ispaid}/>}

      </div>

    </>

  )
}

export default App
