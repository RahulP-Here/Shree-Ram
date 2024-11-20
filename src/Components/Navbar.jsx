import React from 'react'

const Navbar = ({ isPaid, setIsPaid, setCurrent }) => {
  const change = () => {
    setIsPaid(!isPaid);
    setCurrent(NaN);
  }

  return (
    <>
      <header className='py-3 text-text flex justify-between items-center px-8 overflow-hidden border-b border-b-highlight'>
        <div className="logo h-[50px] flex gap-4 items-center">
          <img className="h-full" src="/images/logo.png" alt="shree ram" />
          <h1 className='font-extrabold text-[1.8rem]'>Shree Ram</h1>
        </div>
        <nav>
          {isPaid && <button className='p-2 px-4 rounded-lg font-semibold bg-primary text-white' onClick={change}>Unpaid Bills</button>}
          {!isPaid && <button className='p-2 px-4 rounded-lg font-semibold bg-primary text-white' onClick={change}>Paid Bills</button>}
        </nav>
      </header>
    </>
  )
}

export default Navbar
