import React, { useState, useEffect, useContext } from 'react';

import { HotelBookingContext } from '../context/HotelBookingContext';


const HotelList = () => {
    const { hotelItems } = useContext(HotelBookingContext);

    const HotelItemCard = ({ hotel }) => {
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
                        <p><span style={{ fontWeight: "bold" }}>Owner:</span> {hotel.owner}</p>
                        <p><span style={{ fontWeight: "bold" }}>Total Rooms:</span> {hotel.numberOfRooms}</p>
                        <p><span style={{ fontWeight: "bold" }}>Date of Creation:</span> {hotel.createdAt}</p>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="row">
            { hotelItems && hotelItems.length > 0 &&
                hotelItems.map(( hotel, index) => (
                    <HotelItemCard hotel={hotel} />
                ))
            }
        </div>
    );
}

export default HotelList;