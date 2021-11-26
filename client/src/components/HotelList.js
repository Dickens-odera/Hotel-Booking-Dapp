import React,{ Component, useState } from 'react';
import Web3 from 'web3';
import HotelItem from './HotelItem';

export default class  HotelList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
        }
    }

    render(){
        const hotels = this.props.hotels.sort(( a, b ) => {
            return b.id - a.id;
        });
        const totalHotels = this.props.totalHotels;
        const listingFee = this.props.listingFee;
        return (
            <div className="container mb-2">
                <h6>Total Hotels: {totalHotels}</h6>
                <h6>Listing Fee: {listingFee} ETH</h6>
                
                <div className="row">
                    { hotels.map((hotel) => 
                        <div key={hotel.id} className="col-md-4 mr-2 mb-2">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">{ hotel.name }</div>
                                </div>
                                <div className="card-body">
                                    <img src={`https://ipfs.infura.io/ipfs/${hotel.imageHash}`} alt="hotel image" style={{ width: '100%', height: '200px'}} className="mb-3 img-thumbnail"></img>
                                    <p>Location: {hotel.locationAddress}</p>
                                    <p>Descrition: {hotel.description}</p>
                                    <p>Number Of Rooms: {hotel.totalRooms}</p>
                                    <p>Published By: {hotel.user}</p>
                                    <p>Hotel Type: {hotel.hotelCategory == 0 ? "Chain Hotel":""}</p>
                                    <p>Image Hash: {hotel.imageHash}</p>
                                    <button className="btn btn-success"> View Rooms </button>
                                </div>
                            </div>
                        </div>
                )}
                </div>

            </div>  
        );
    }
}