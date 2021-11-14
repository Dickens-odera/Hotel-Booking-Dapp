import React, {Component} from 'react';
import Navbar from './components/Navbar';
import HotelList from './components/HotelList';

export default class App extends Component {
    render(){
      return (
          <React.Fragment>
            <Navbar />
            <HotelList />
          </React.Fragment>
      );
    }
}
