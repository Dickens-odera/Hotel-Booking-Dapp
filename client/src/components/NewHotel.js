import React, { Component } from 'react';
import Web3 from 'web3';
import ipfs from '../ipfs';
import NewRoom from './NewRoom';

export default class NewHotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageBuffer: null,
            ipfsImageHash: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.capturePhoto = this.capturePhoto.bind(this);
        this.fetchImageHash = this.fetchImageHash.bind(this);
    }

    async componentWillMount() {
    }

    async capturePhoto(event){
        event.preventDefault();
        const file = event.target.files[0];
        const reader = await new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = async() => {
            this.setState({ imageBuffer: Buffer(reader.result) });
            console.log("Image Buffer: ", this.state.imageBuffer);
            await this.fetchImageHash();
        }
    }

    async fetchImageHash(){
        await ipfs.files.add(this.state.imageBuffer, (error, result) => {
            if(error){
                console.error(error);
                return;
            }else{
                this.setState({ ipfsImageHash: result[0].hash });
                console.log("Ipfs Image Hash:", this.state.ipfsImageHash);
            }
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const web3 = await this.props.provider;
        const fee = await this.props.listingFee;
        const account = await this.props.account;
        const hotelContract = await this.props.hotelContract;

        const hotel = {
            name: event.target.name.value,
            location: event.target.location.value,
            description:event.target.description.value,
            noOfRooms: event.target.num_of_rooms.value
        }
        console.log("Hash:", this.state.ipfsImageHash);
        const tx = await hotelContract.methods.addHotel(
            hotel.noOfRooms, 
            hotel.name, 
            hotel.description, 
            hotel.location, 
            this.state.ipfsImageHash
            ).send({
                from: account,
                value: await web3.utils.toWei(fee.toString(),"ether"),
                gas: 6721975
        }).then(( result) =>{
            console.log("Image Hash after file upload",this.state.ipfsImageHash);
            console.log(result);
            window.location.reload();
        }).catch(( err) => {
            console.error(err);
        });
    }

    async clearForm(event){
        event.preventDefault();
    }

    render(){
        return(
            <div className="container mb-2">
                <div className="row">
                    {/* <div className="col-md-3"></div> */}
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header"><div className="card-title">List New Hotel</div></div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group row mb-2">
                                        <label for="name" className="col-sm-6 col-form-label">Name: </label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" name="name" id="name" placeholder="Hotel Name"></input>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label for="location" className="col-sm-6 col-form-label">Location: </label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" name="location" id="location" placeholder="Hotel Location"></input>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label for="num_of_rooms" className="col-sm-6 col-form-label">No of Rooms:</label>
                                        <div className="col-md-6">
                                            <input type="number" className="form-control" name="num_of_rooms" id="num_of_rooms" placeholder="Total No Of Rooms"></input>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label for="description" className="col-sm-6 col-form-label">Description: </label>
                                        <div className="col-sm-6">
                                            <textarea className="form-control" id="description" name="description" placeholder="Hotel Description"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <label for="file" className="col-sm-6 col-form-label">Photo</label>
                                        <div className="col-sm-6">
                                            <input type="file" onChange={this.capturePhoto} accept=".jpg, .png, .svg" name="image" id="image" placeholder="Upload File" />
                                        </div>
                                    </div>
                                    <div className="form-group row mb-2">
                                        <div className="col-sm-6">
                                            <button type="submit" className="btn btn-primary">List Hotel</button>
                                        </div>
                                        <div className="col-sm-6">
                                            <button onClick={this.clearForm} className="btn btn-warning">Clear Form</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <NewRoom />
                </div>
            </div>
        );
    }
}