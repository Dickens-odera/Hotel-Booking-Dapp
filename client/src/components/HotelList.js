import React,{ Component, useState } from 'react';
import Web3 from 'web3';
const web3 = window.web3;

export default class  HotelList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
        }
    }

    render(){
        const hotels = this.props.hotels;
        return (
            <div className="container mb-2">
                <h6>Total Hotels: { this.props.totalHotels}</h6>
                <h6>Listing Fee: { this.props.listingFee } ETH</h6>
                
                <div className="row">
                    { hotels.map((hotel) => 
                        <div key={hotel.id} className="col-md-4 mr-2 mb-2">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">{ hotel.name }</div>
                                </div>
                                <div className="card-body">
                                    <p>Location: {hotel.locationAddress}</p>
                                    <p>Descrition: {hotel.description}</p>
                                    <p>Number Of Rooms: {hotel.totalRooms}</p>
                                    <p>Published By: {hotel.user}</p>
                                    <p>Hotel Type: {hotel.hotelCategory}</p>
                                    <button className="btn btn-success"> View </button>
                                </div>
                            </div>
                        </div>
                )}
                </div>

            </div>
        );
    }
}