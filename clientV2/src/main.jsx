import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

import { HotelBookingContextProvider } from './context/HotelBookingContext';

ReactDOM.render(
  <HotelBookingContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </HotelBookingContextProvider>,

  document.getElementById('root')
)
