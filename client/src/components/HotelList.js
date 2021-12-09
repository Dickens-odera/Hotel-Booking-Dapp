import React,{ Component  } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Web3 from 'web3';
import HotelItem from './HotelItem';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import NewHotel from './NewHotel';

export default class  HotelList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            currentHotelId:null,
            hotel:{},
            show:false,
            selectedHotelId:null
        }
        this.fetchRooms = this.fetchRooms.bind(this);
        this.fetchHotelBioData = this.fetchHotelBioData.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showAlert = this.showAlert.bind(this);
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

    async closeModal() {
        this.setState({ show: false });
    }

    async showModal(event) {
        event.preventDefault();
        await this.setState({ selectedHotelId: event.target.id });
        this.setState({ show: true });
        console.log("Selected Hotel Id", this.state.selectedHotelId);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const web3 = await window.web3;
        const roomItem = {
            name: event.target.name.value,
            hotelId: this.state.selectedHotelId,
            totalBeds: event.target.total_beds.value,
            pricePerNight: await web3.utils.toWei(event.target.price_per_night.value.toString(), 'ether'),
            number: event.target.room_number.value,
            description: event.target.description.value
        }

        await this.props.hotelContract.methods.addRoom(
            roomItem.hotelId,
            roomItem.totalBeds,
            roomItem.pricePerNight,
            roomItem.number,
            roomItem.name,
            roomItem.description
        ).send({
            from: this.props.account,
            gas: 1500000,
            gasPrice: '30000000000'
        }).then((result) => {
            console.log(result);
            window.alert("Room Added Successfully");
            window.location.reload();
        }).catch((error) => { console.error(error) })
    }

    async showAlert(event){
        event.preventDefault();
        window.alert("Comming Soon");
    }

    render(){
        const hotels = this.props.hotels.sort(( a, b ) => {
            return b.id - a.id;
        });
        const totalHotels = this.props.totalHotels;
        const listingFee = this.props.listingFee;
        const account = this.props.account;
        const provider = this.props.provider;
        const hotelContract = this.props.hotelContract;
        return (
            <div className="container mb-2">
                <h6>Total Hotels: {totalHotels}</h6>
                <h6>Listing Fee: {listingFee} ETH</h6>
                <NewHotel hotelContract={hotelContract}
                    listingFee={listingFee}
                    account={account}
                    provider={provider}
                />
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
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Button className="btn btn-success btt-sm" onClick={this.showAlert} id={hotel.id}> View </Button>
                                        </div>
                                        <div className="col-md-6">
                                            {this.props.account === hotel.user &&
                                                <Button variant="primary" onClick={this.showModal} id={hotel.id}>
                                                    Add Room
                                                </Button>
                                            }
                                            { this.props.account !== hotel.user &&
                                                <Button variant="info" onClick={this.showAlert}> View Rooms </Button>
                                            }
                           
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                )}
                </div>
                <Modal show={this.state.show} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row mb-2">
                                <label for="name" className="col-sm-6 col-form-label">Name: </label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Room Name"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="hotel_id" className="col-sm-6 col-form-label">Hotel Id:</label>
                                <div className="col-md-6">
                                    <input type="number" disabled value={this.state.selectedHotelId} className="form-control" name="hotel_id" id="hotel_id" placeholder="Total No Of Rooms"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="price_per_night" className="col-sm-6 col-form-label">Price Per Night:</label>
                                <div className="col-md-6">
                                    <input type="number" className="form-control" name="price_per_night" id="price_per_night" placeholder="Total No Of Rooms" step="any"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="total_beds" className="col-sm-6 col-form-label">Total Beds:</label>
                                <div className="col-md-6">
                                    <input type="number" className="form-control" name="total_beds" id="total_beds" placeholder="Total No Of Rooms"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="room_number" className="col-sm-6 col-form-label">Number:</label>
                                <div className="col-md-6">
                                    <input type="number" className="form-control" name="room_number" id="room_number" placeholder="Total No Of Rooms"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="description" className="col-sm-6 col-form-label">Description: </label>
                                <div className="col-sm-6">
                                    <textarea className="form-control" id="description" name="description" placeholder="Hotel Description"></textarea>
                                </div>
                            </div>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeModal}>
                                    Close
                                </Button>
                                <Button type="submit" variant="primary">
                                    Add Room
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Body>
                </Modal>

            </div>  
        );
    }
}