import React, { Component } from 'react';

export default class NewHotel extends Component {

    async handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.location.value);
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row mb-2">
                                <label for="name" className="col-sm-6 col-form-label">Name</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Hotel Name"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="location" className="col-sm-6 col-form-label">Location</label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" name="location" id="location" placeholder="Hotel Location"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label className="col-sm-6 col-form-label">No of Rooms:</label>
                                <div className="col-md-6">
                                    <input type="number" className="form-control" name="num_of_rooms" id="num_of_rooms" placeholder="Total No Of Rooms"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="description" className="col-sm-6 col-form-label">Description</label>
                                <div className="col-sm-6">
                                    <textarea className="form-control" id="description" name ="description" placeholder="Hotel Description"></textarea>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <div className="col-sm-10">
                                    <button type="submit" className="btn btn-primary">Add Hotel</button>
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