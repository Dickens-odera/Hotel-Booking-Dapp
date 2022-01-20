import React, { useState, useEffect, useContext } from 'react';
import { Button } from 'react-bootstrap';

import { HotelBookingContext } from '../context/HotelBookingContext';


const HotelList = () => {
    const { hotelItems, connectedAddress, addNewRoom, fetchHotelBioData, fetchRooms } = useContext(HotelBookingContext);

    const HotelItemCard = ({ hotel, connectedAddress, fetchHotelBioData, fetchRooms }) => {
        return (
            <div className="col-md-4 mb-2" key={hotel.id}>
                <div className="card row">
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
                                <Button variant="success" onClick={fetchHotelBioData}>View</Button>
                            </div>
                            {
                                connectedAddress &&

                                <div className="col-md-6">
                                        {hotel.owner && hotel.owner === connectedAddress &&
                                            (
                                            <Button onClick={addNewRoom}>Add Room</Button>

                                            ) 
                                        }
                                        {hotel.owner && hotel.owner !== connectedAddress &&
                                            (
                                            <Button onClick={fetchRooms}>View Rooms</Button>

                                            )
                                        }
                                </div>
                            }
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
                    <HotelItemCard key={hotel.id} hotel={hotel} connectedAddress={connectedAddress} fetchHotelBioData={fetchHotelBioData} fetchRooms={fetchRooms} />
                ))
            }
        </div>
    );
}

export default HotelList;