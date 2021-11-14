import React,{ useState } from 'react';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
const HotelContractABI = '/build/contracts/Hotel.json';
const RoomContractABI = '/build/contracts/Room.json';
const BookingContractABI = '/build/contracts/Booking.json';
const BookingContractAddress = process.env.BOOKING_CONTRACT_ADDRESS;

export default function HotelList(props){
    const [ totalHotels, setTotalNumberOfHotels ] = useState(0);
    const [ hotels, setHotels ] = useState([]);
    const [ network, setNetwork ] = useState("");
    const [ account, setAccount] = useState("");
    const [ accounts, setAccounts ] = useState([]);
    const [ listingFee, setListingFee ] = useState(0);
    const [ nightPrice, setNightPrice ] = useState(0);

    const getNetwork = async() => {
        const network = await web3.eth.net.getNetworkType();
        setNetwork(network);
        console.log("Contract Address", BookingContractAddress);
    }

    const getUserAccounts = async() => {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setAccount(account);
        //const contract = await new web3.eth.Contract(BookingContractABI, BookingContractAddress);
        //const defaultAccount = contract.defaultAccount;
        //console.log(defaultAccount);
    }

    const setHotelListingFee = async(e) => {
        e.preventDefault();
        const fee = await web3.utils.toWei(e.target.value.toString(),"ether");
        setListingFee(fee.toNumber());
    }

    const setRoomNightPrice = async(e) => {
        e.preventDefault();
        const amount = await web3.utils.toWei(e.target.value.toString(),"ether");
        setNightPrice(amount.toNumber());
    }

    const addHotel = async(e) => {
        e.preventDefault();
    }
    
    return(
        <div className="container">
            <button className="btn btn-primary" onClick={getNetwork}>
                Fetch Network
            </button>
            <p>Network: {network}</p>
        </div>
    );
}