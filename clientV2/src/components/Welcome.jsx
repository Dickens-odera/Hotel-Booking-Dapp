import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import  HotelList  from './HotelList';
import { Spinner } from 'react-bootstrap';

import { HotelBookingContext } from '../context/HotelBookingContext';

const Welcome = () => {
    const { isConnectedToWallet, connectWallet, chainId, isLoading } = useContext(HotelBookingContext);


    return (
        <div>
            {!isConnectedToWallet &&
                <Button onClick={connectWallet}>Connect Wallet to get started</Button>
            }
            {
                chainId && chainId != '0x13881' ? (
                    <p style={{ color: "red" }}>Please switch your network to Polygon Mumbai Testnet</p>
                ):
                (
                    <div>
                            {!isLoading ? 
                                <HotelList />
                                :
                                <div>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Fetching available hotels...</span>
                                    </Spinner>
                                </div>
                            }
                    </div>
                )
            }
        </div>
    );
}

export default Welcome;