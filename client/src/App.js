import React, {Component} from 'react';
import Navbar from './components/Navbar';
import HotelList from './components/HotelList';
import Web3 from 'web3';
import HotelContract from '../src/abi/Hotel.json';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      hotelContractABI:null,
      totalHotels: null,
      hotels: [],
      hotelListingFee:null,
    }
  }

  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchain();
  }

  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    }else{
      window.alert("Non-Ethereum browser detected, please consider installing MetaMask Extension for your browser");
    }
  }

  async loadBlockchain(){
    let totalNumberOfHotels;
    let listingFee;
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

      //fetch total Number of hotels
      totalNumberOfHotels = await this.state.hotelContractABI.methods.totalHotels().call().then((total) => {
        console.log("Total Hotels: ", total);
        this.setState({ totalHotels: total });
      }).catch((err) => {
        console.log(err);
      });

      //fetch listing fee
      listingFee = await this.state.hotelContractABI.methods.hotelListingFee().call().then((fee) => {
        const feeAmount = web3.utils.fromWei(fee.toString(), "ether");
        this.setState({ hotelListingFee: feeAmount });
      }).catch((err) => {
        console.log(err);
      })
    }else{
      window.alert("Failed to fectch hotel contract");
    }
  }

    render(){
      return (
          <React.Fragment>
          <Navbar account={this.state.account}/>
          <HotelList hotelContract={this.state.hotelContractABI} 
                     totalHotels={this.state.totalHotels}
                     listingFee={this.state.hotelListingFee}
                     hotels={this.state.hotels}
                     />
          </React.Fragment>
      );
    }
}
