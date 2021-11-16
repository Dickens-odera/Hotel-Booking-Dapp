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
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts().then((accounts) => {
      this.setState({ account: accounts[0]});
    });

    const netWorkID = await web3.eth.net.getId();
    const hotelContractData = HotelContract.networks[netWorkID];
    if (hotelContractData){
      const hotelContract = await new web3.eth.Contract(HotelContract.abi, hotelContractData.address);
      this.setState({ hotelContractABI: hotelContract });
    }else{
      window.alert("Failed to fectch hotel contract");
    }
  }

    render(){
      return (
          <React.Fragment>
          <Navbar account={this.state.account}/>
          <HotelList hotelContract={this.state.hotelContractABI} />
          </React.Fragment>
      );
    }
}
