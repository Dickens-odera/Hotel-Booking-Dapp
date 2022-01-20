import { useState } from 'react'
import { Welcome, Navbar, Footer, HotelList, RoomList, NewRoom, NewHotel } from './components';
const App = () => {

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
