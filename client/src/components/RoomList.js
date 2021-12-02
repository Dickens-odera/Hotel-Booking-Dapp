import React, { Component } from 'react';

export default class RoomList extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomId:null
        }
        
        this.bookRoom = this.bookRoom.bind(this);
    }

    async bookRoom(event){
        event.preventDefault();
        this.setState({ roomId: event.target.id });
        //contrinue with the implementation of booking here
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
                                                        <th>Id:</th>
                                                        <th>Hotel Id:</th>
                                                        <th>Name:</th>
                                                        <th>Total Beds:</th>
                                                        <th>Price Per Night:</th>
                                                        <th>Room Number:</th>
                                                        <th>Description:</th>
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
                                                                {room.isBooked === false ?
                                                                    <button onClick={this.bookRoom} id={room.id} className="btn btn-sm btn-primary" >Book Room</button>
                                                                    :

                                                                    <button className="btn btn-sm btn-primary btn-disabled">Booked</button>
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
            </div>
        );
    }
}