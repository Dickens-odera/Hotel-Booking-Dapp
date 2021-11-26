import React, { Component } from 'react';
//import HotelContractABI from '../src/abi/Room.json';
export default class HotelItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms:[],
            hotelId: null,
            hotelContractABI:null
        }
    }

    async componentWillMount(){

    }

    async fetchRooms(){
        
    }

    async fetchHotelData(){
        const web3 = window.web3;

    }

    render(){
        return (
            <div className="container">
                <div className="col-md-6">
                    Hotel MetaData Get displayed here
                </div> 
                <div className="col-md-6 row">
                    <div className="col-md-4">
                        Rooms Get Listed Here
                    </div>
                </div>  
            </div>
        )
    }
}