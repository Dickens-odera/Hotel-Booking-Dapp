import { useState, useContext } from 'react'
import { Welcome, Navbar, Footer, HotelList, RoomList, NewRoom, NewHotel } from './components';

import { HotelBookingContext } from './context/HotelBookingContext';

const App = () => {
  const { isConnectedToWallet } = useContext(HotelBookingContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Navbar />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Welcome />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <HotelList />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
