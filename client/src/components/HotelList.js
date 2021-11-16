import React,{ Component, useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
const BookingContractAddress = process.env.BOOKING_CONTRACT_ADDRESS;

export default class  HotelList extends Component {
    constructor(props){
        super(props);
        this.state = {
            hotels:[],
            isLoading:true
        }
    }

    render(){
        return (
            <div className="container">
                <p>List Hotels Here</p>
            </div>
        );
    }
}