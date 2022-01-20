import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';

import { HotelBookingContext } from '../context/HotelBookingContext';


const HotelList = () => {
    const { hotelItems, connectedAddress } = useContext(HotelBookingContext);

    const HotelItemCard = ({ hotel, connectedAddress }) => {
        return (
            <div className="col-md-4 mb-2" key={hotel.id}>
                <div className="card">
                    <div className="card-header content-center">
                        <div className="card-title">
                            {hotel.name}
                        </div>
                    </div>
                    <div className="card-body justify-content-center">
                        <div className="justify-content-centre">
                            <img src={`https://ipfs.infura.io/ipfs/${hotel.imageUrl}`} alt="hotel image" style={{ width: '100%', height: '200px' }} className="mb-3 img-thumbnail"></img>
                        </div>
                        <p><span style={{ fontWeight: "bold" }}>Description:</span> {hotel.description} </p>
                        <p><span style={{ fontWeight: "bold" }}>Location:</span> {hotel.location}</p>
                        <p><span style={{ fontWeight: "bold" }}>Owner:</span>
                                {`${hotel.owner.slice(0, 5)}...${hotel.owner.slice(hotel.owner.length - 4)}`}
                        </p>
                        <p><span style={{ fontWeight: "bold" }}>Total Rooms:</span> {hotel.numberOfRooms}</p>
                        <p><span style={{ fontWeight: "bold" }}>Date of Creation:</span> {hotel.createdAt}</p>
                        <div className="row">
                            <div className="col-md-6">
                                <Button variant="success">View</Button>
                            </div>
                            <div className="col-md-6">
                                { hotel.owner === connectedAddress ?
                                    (
                                        <Button variant="primary">Add Room</Button>
                                    ):
                                    (
                                        <Button variant="primary">View Rooms</Button>
                                    )    
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="row">
            { hotelItems && hotelItems.length > 0 &&
                hotelItems.map(( hotel, index) => (
                    <HotelItemCard key={hotel.id} hotel={hotel} connectedAddress={connectedAddress} />
                ))
            }
        </div>
    );
}

export default HotelList;