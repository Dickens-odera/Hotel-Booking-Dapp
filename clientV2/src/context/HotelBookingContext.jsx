import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../utils/constants';

export const HotelBookingContext = React.createContext();

const { ethereum } = window;


const getBookingContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
}

export const HotelBookingContextProvider = ({ children }) => {

    const [hotelItems, setHotelItems] = useState([]);
    const [roomItems, setRoomItems] = useState([]);
    const [isConnectedToWallet, setIsConnectedToWallet] = useState(false);
    const [connectedAddress, setConnectedAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hotelFormData, setHotelFormData] = useState({ name: "", description: "", location: "", imageHash: "" });
    const [chainId, setChainId] = useState(null);
    const [isBooked, setIsBooked] = useState(false);
    const [isHotelOwner, setIsHotelOwner] = useState(false);
    const [listingFee, setListingFee] = useState(null);

    const checkIfWallectIsConnected = async () => {
        try {
            if (!ethereum) {
                alert("Please Install Metamask");
                throw new Error("No ethereum object detected");
            }
            else {
                const accounts = await ethereum.request({ method: 'eth_accounts' });
                if (accounts.length) {
                    getWalletAddress();
                    setIsConnectedToWallet(true);
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

    const getWalletAddress = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        setConnectedAddress(userAddress);
    }

    const fetchHotels = async() => {
        try{
            if(!ethereum){
                alert("Please Install Metamask");
                throw new Error("No Ethereum object detected");
            }else{
                const hotelBookingContract = getBookingContract();
                let activeAddress;
                const tx = await hotelBookingContract.listAllHotels().then(async( data ) => {
                    const hotelData = data.map(( hotelItem, index) => ({
                        id: hotelItem.id.toNumber(),
                        name: hotelItem.name,
                        description: hotelItem.description,
                        location: hotelItem.locationAddress,
                        owner: hotelItem.user,  
                        numberOfRooms: hotelItem.totalRooms.toNumber(),
                        imageUrl : hotelItem.imageHash,
                        createdAt: new Date(hotelItem.creationDate.toNumber() * 1000).toLocaleString(),
                        hotelType: hotelItem.hotelCategory,
                    }));
                    //console.log("Hotel Data", hotelData.reverse());
                    setHotelItems(hotelData.reverse());
                }).catch(( error ) => console.error(error));
            }
        }catch(error){
            console.error(error);
        }
    }

    const fetchRooms = async() => {

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

    const detectAccountChange = async() => {
        ethereum.on('accountsChanged', async (accounts) => {
            setConnectedAddress(accounts[0]);
            setIsConnectedToWallet(true);
        });
    }

    const detectNetworkChange = async() => {
        ethereum.on('chainChanged', async (chainId) => {
            console.log("ChainId", chainId);
            setChainId(chainId);
        });
    }

    useEffect(() => {
        checkIfWallectIsConnected();
        getWalletAddress();
        detectAccountChange();
        detectNetworkChange();
        fetchHotels();
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
