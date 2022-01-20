import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';


import { HotelBookingContext } from '../context/HotelBookingContext';

const Welcome = () => {
    const { isConnectedToWallet, connectWallet, chainId } = useContext(HotelBookingContext);


    return (
        <div>
            {!isConnectedToWallet &&
                <Button onClick={connectWallet}>Connect Wallet to get started</Button>
            }
            {
                chainId && chainId != '0x13881' &&

                <p style={{ color:"red"}}>Please switch your network to Polygon Mumbai Testnet</p>
            }
        </div>
    );
}

export default Welcome;