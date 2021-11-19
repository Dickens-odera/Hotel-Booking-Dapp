import React, { Component } from 'react';
import Web3 from 'web3';

export default class NewHotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const web3 = await window.web3;
        const hotel = {
            name: event.target.name.value,
            location: event.target.location.value,
            description:event.target.description.value,
            noOfRooms: event.target.num_of_rooms.value
        }
        const tx = await this.props.hotelContract.methods.addHotel(
            hotel.noOfRooms,
            hotel.name,
            hotel.description,
            hotel.location).send({
                from: await this.props.account,
                value: web3.utils.toWei(this.props.listingFee.toString(),"ether"),
                gas: 6721975
        }).then(( result) =>{
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
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
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
                                    <textarea className="form-control" id="description" name ="description" placeholder="Hotel Description"></textarea>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="file" className="col-sm-6 col-form-label">Photo</label>
                                <div className="col-sm-6">
                                    <input type="file" accept=".jpg, .png, .svg" name="image" id="image" placeholder="Upload File"/>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-primary">Add Hotel</button>
                                </div>
                                <div className="col-sm-6">
                                    <button onClick={this.clearForm} className="btn btn-primary">Clear Form</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        );
    }
}