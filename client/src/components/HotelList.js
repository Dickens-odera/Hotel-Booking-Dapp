import React,{ Component, useState } from 'react';
import Web3 from 'web3';
const web3 = window.web3;

export default class  HotelList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true
        }
    }

    async componentWillMount(){
        await this.fetchHotels();
    }

    async addHotel(){

    }

    async fetchHotels(){

    }

    render(){
        return (
            <div className="container mb-2">
                <h6>Total Hotels: { this.props.totalHotels}</h6>
                <h6>Listing Fee: { this.props.listingFee } ETH</h6>
                {this.props.hotels.map((hotel, index) => {
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">Hotel</div>
                                </div>
                                <div className="card-body">
                                    Name: {hotel.name}
                                    Location: {hotel.location}
                                    Published By: {hotel.user }
                                </div>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        );
    }
}