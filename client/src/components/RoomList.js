import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class RoomList extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomId:null,
            show:false,
            tenantNumOfNights:null,
        }
        
        this.bookRoom = this.bookRoom.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    async bookRoom(event){
        event.preventDefault();
        const web3 = window.web3;
        let amount;
        const bookingDetails = {
            id: this.state.roomId,
            numOfNights: event.target.num_of_nights.value
        }
        console.log("Selected Number Of Nights",bookingDetails.numOfNights);
        //fetch room
        const selectedRoomItem = await this.props.hotelContract.methods.roomItemId(this.state.roomId).call()
        .then(async( room ) => {
            console.log("room", room);
            amount = await room.pricePerNight * bookingDetails.numOfNights.toString();
            console.log("Calculated Price", amount);
        }).catch((error) => {
            console.error(error);
        });
        //perform booking
        const result = await this.props.hotelContract.methods.bookRoom(
            bookingDetails.id,
            bookingDetails.numOfNights
        ).send({
            from: this.props.account,
            value: amount,
            gas: 1500000,
            gasPrice: '30000000000'
        }).then(( result ) => {
            console.log(result);
            window.alert("Room Booked Successfully");
            this.closeModal();
            window.location.reload();
        }).catch(( error) => {
            this.closeModal();
            console.error(error);
        });
    }

    async closeModal(){
        this.setState({ show: false});
    }

    async showModal(event){
        await this.setState({ roomId: event.target.id });
        this.setState({ show: true});
        console.log("Current Room ID ", this.state.roomId);
    }

    render(){
        const web3 = window.web3;
        const roomItems = this.props.rooms.sort(( a, b) => {
            return b.id - a.id;
        });
        return(
            <div className="container">
                <div className="row">
                        <div className="col-md-12 mb-2">
                            <div className="card">
                                <div className="card-header"><div className="card-title">Rooms</div></div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                    <table className="table table-sm table-hover table-bordered table-dark">
                                                <thead className="thead-dark">
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Hotel Id</th>
                                                        <th>Name</th>
                                                        <th>Total Beds</th>
                                                        <th>Price Per Night</th>
                                                        <th>Room Number</th>
                                                        <th>Description</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                            {roomItems.map(( room) =>
                                                        <tr key={room.id}>
                                                            <td>{room.id}</td>
                                                            <td>{room.hotelId}</td>
                                                            <td>{room.name}</td>
                                                            <td>{room.totalBeds}</td>
                                                            <td>{web3.utils.fromWei(room.pricePerNight.toString(), "ether")} ETH</td>
                                                            <td>{room.number}</td>
                                                            <td>{room.description}</td>
                                                            <td>
                                                                {room.isBooked === false && 
                                                            <Button variant="primary" onClick={this.showModal} id={room.id} className="btn btn-sm btn-primary" >Book Room</Button>
                                                                    
                                                                }
                                                                { room.isBooked === true &&
                                                            <Button variant="danger" className="btn btn-sm btn-primary" disabled>Booked</Button>

                                                                }
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                    </div>
                                </div>
                                {/* <div className="card-footer">
                                </div> */}
                            </div>
                        </div>
                </div>
                <Modal show={this.state.show} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Room Booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <form onSubmit={this.bookRoom}>
                                <div className="form-group row mb-2">
                                    <label for="num_of_nights" className="col-sm-6 col-form-label">Number Of Nights:</label>
                                    <div className="col-md-6">
                                        <input type="number" className="form-control" 
                                        name="num_of_nights" 
                                        id="num_of_nights" 
                                        placeholder="Total No Of Nights" 
                                        required
                                        onChange={(event) => this.setState({tenantNumOfNights: event.target.value})}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={this.closeModal}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary" disabled={!this.state.tenantNumOfNights || this.state.tenantNumOfNights <= 0 }>
                                        Confirm Booking
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}