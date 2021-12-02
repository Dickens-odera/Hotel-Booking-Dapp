import React,{ Component, useState } from 'react';
import Web3 from 'web3';
import HotelItem from './HotelItem';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

export default class  HotelList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            currentHotelId:null,
            hotel:{}
        }
        this.fetchRooms = this.fetchRooms.bind(this);
        this.fetchHotelBioData = this.fetchHotelBioData.bind(this);

    }

    async fetchHotelBioData(event){
        event.preventDefault();
        await this.setState({ currentHotelId: event.target.id });
        console.log("Current clicked id", this.state.currentHotelId)
        await this.props.hotelContract.methods.getHotelBioData(this.state.currentHotelId).call().then((result) => {
            if(result){
                const hotel = {
                    id: result._id,
                    name: result._name,
                    totalRooms: result._totalRooms,
                    dateOfCreation: result._date,
                    category: result._category,
                    location: result._location,
                    imageHash: result._photo,
                    description: result._description,
                    rooms: []
                }
                this.setState({ hotel: hotel });
                this.fetchRooms();
                console.log("Hotel Name", hotel.name);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    async fetchRooms() {
        await this.props.hotelContract.methods.listRooms().call().then((data) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].hotelId === this.state.currentHotelId) {
                    this.state.hotel.rooms.push(data[i]);
                    console.log("Rooms Found:", this.state.hotel.rooms);
                } else {
                    console.log("This hotel has no rooms");
                }
            }
        }).catch((error) => {
            console.error(error);
        });
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
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button className="btn btn-success btt-sm" onClick={this.fetchHotelBioData} id={hotel.id}> View </button>
                                        </div>
                                        <div className="col-md-6">
                                            {this.props.account === hotel.user ? 
                                                <button  type="button" className="btn btn-warning btn-sm" data-toggle="modal" data-target="#exampleModal"> Add Rooms </button>
                                                    :
                                                <button className="btn btn-warning btn-sm"> View Rooms </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                )}
                </div>

            </div>  
        );
    }
}