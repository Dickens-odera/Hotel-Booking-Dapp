import { useState, useContext } from 'react'
import { Welcome, NavbarComponent, Footer, HotelList, RoomList, NewRoom, NewHotel } from './components';

import { HotelBookingContext } from './context/HotelBookingContext';

const App = () => {
  const { isConnectedToWallet } = useContext(HotelBookingContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mb-2">
          <NavbarComponent />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-2">
          <Welcome />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12m mb-2">
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
