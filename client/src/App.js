import React, {Component} from 'react';
import Navbar from './components/Navbar';
import NewHotel from './components/NewHotel';
import HotelList from './components/HotelList';
import NewRoom from './components/NewRoom';
import Web3 from 'web3';
import HotelContract from '../src/abi/Room.json';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      hotelContractABI:null,
      totalHotels: null,
      hotels: [],
      hotelListingFee:null,
      loading:true,
      provider:null,
    }
  }

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchain();
    await this.fetchListingFee();
    await this.fetchHotels();
  }

  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      this.setState({ provider: window.web3});
      await window.ethereum.enable();
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
      this.setState({ provider: window.web3 });
    }else{
      window.alert("Non-Ethereum browser detected, please consider installing MetaMask Extension for your browser");
    }
  }

  async loadBlockchain(){
    let totalNumberOfHotels;
    const web3 = await window.web3;
    const accounts = await web3.eth.getAccounts().then((accounts) => {
      this.setState({ account: accounts[0]});
    });

    const netWorkID = await web3.eth.net.getId();
    const hotelContractData = HotelContract.networks[netWorkID];
    if (hotelContractData){
      //set the contract ABI
      const hotelContract = await new web3.eth.Contract(HotelContract.abi, hotelContractData.address);
      this.setState({ hotelContractABI: hotelContract });
      //console.log(hotelContract)

      //fetch total Number of hotels
      totalNumberOfHotels = await this.state.hotelContractABI.methods.totalHotels().call().then((total) => {
        console.log("Total Hotels: ", total);
        this.setState({ totalHotels: total });
      }).catch((err) => {
        console.error(err);
      });
    }else{
      window.alert("Failed to fetch hotel contract");
    }
  }

  async fetchHotels() {
    let result;
    for (let i = 0; i <= this.state.totalHotels; i++) {
    result = await this.state.hotelContractABI.methods.hotelItems(i).call().then((hotel) => {
        this.setState({
          hotels: [...this.state.hotels, hotel]
        });
      }).catch((err) => {
        console.error(err);
      });
    }
    console.log("Hotels", ...this.state.hotels);
  }

  async fetchListingFee(){
    const web3 = this.state.provider;
    let listingFee;
    listingFee = await this.state.hotelContractABI.methods.hotelListingFee().call().then((fee) => {
      const feeAmount = web3.utils.fromWei(fee.toString(), "ether");
      this.setState({ hotelListingFee: feeAmount });
      console.log("Listing Fee: ", feeAmount);
    }).catch((err) => {
      console.error(err);
    });
  }
  
    render(){
      return (
          <React.Fragment>
            {/* <BrowserRouter >
            <Routes >
              <Route path="/" element={<HotelList /> }></Route>
            </Routes>
            </BrowserRouter> */}
          <Navbar account={this.state.account}/>
          <NewHotel hotelContract={this.state.hotelContractABI}
            listingFee={this.state.hotelListingFee}
            account={this.state.account}
            provider={this.state.provider}
            />
          <HotelList hotelContract={this.state.hotelContractABI} 
                     totalHotels={this.state.totalHotels}
                     listingFee={this.state.hotelListingFee}
                     hotels={this.state.hotels}
                      account={this.state.account}
                     />
          </React.Fragment>
      );
    }
}
