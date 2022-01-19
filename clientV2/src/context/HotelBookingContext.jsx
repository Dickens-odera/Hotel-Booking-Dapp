import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from './utils/constants';

export const HotelBookingContext = React.createContext();

const { ethereum } = window;

export const HotelBookingContextProvider = ({ children }) => {

    const [hotelItems, setHotelItems] = useState([]);
    const [roomItems, setRoomItems] = useState([]);
    const [isConnectedToWallet, setIsConnectedToWallet] = useState(false);
    const [connectedAddress, setConnectedAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hotelFormData, setHotelFormData] = useState({ name: "", description: "", location: "", imageHash: "" });
    const [chainId, setChainId] = useState(null);
    const [isBooked, setIsBooked] = useState(false);
    const [isHotelOwner, setIsHotelOwner] = useState(false);
    const [listingFee, setListingFee] = useState(null);

    const getBookingContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log({
            provider,
            signer,
            contract
        });
        return contract;
    }

    const checkIfWallectIsConnected = async () => {
        try {
            if (!ethereum) {
                alert("Please Install Metamask");
                throw new Error("No ethereum object detected");
            }
            else {
                const accounts = await ethereum.request({ method: 'eth_accounts' });
                if (accounts.length) {
                    setConnectedAddress(accounts[0]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                alert("Please Install Metamask");
                throw new Error("No Ethereum object detected, please install metamask");
            } else {
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                setConnectedAddress(accounts[0]);
                setIsConnectedToWallet(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addNewHotel = async () => {

    }

    const fetchHotelBioData = async () => {

    }

    const addNewRoom = async () => {

    }

    const fetchRoomBioData = async () => {

    }

    const bookRoom = async () => {

    }


    useEffect(() => {
        checkIfWallectIsConnected();
    }, []);
    return (
        <HotelBookingContext.Provider value={{
            connectWallet, isConnectedToWallet, hotelItems, roomItems, connectedAddress, isLoading, hotelFormData, chainId,
            isBooked, isHotelOwner, listingFee
        }}>
            {children}
        </HotelBookingContext.Provider>
    )
}
