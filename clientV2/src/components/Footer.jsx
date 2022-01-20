import React, { useState, useEffect } from 'react';


const Footer = () => {
    return (
        <div className="container my-5">
            <div className="text-center text-dark p-3" style={{ "background-color": "rgba(0, 0, 0, 0.2)" }}>
                <p>© 2022 Copyright:</p>
                <a className="text-dark" href="https://github.com/Dickens-odera/Hotel-Booking-Dapp" target="_blank">Give a star on Github</a><br></br>
                <a className="text-dark" href="https://mumbai.polygonscan.com/address/0xCc1aB276cE5522de28EcFBA6eeBC1139fb5ba3BD" target="_blank">View On Polygonscan</a>
            </div>
        </div>
    );
}

export default Footer;
