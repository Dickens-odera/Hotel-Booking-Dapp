import React, {Component} from "react";

export default class NewRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotel:null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
    }
    render(){
        return(
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header"><div className="card-title">Add New Room</div></div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row mb-2">
                                <label for="name" className="col-sm-6 col-form-label">Name: </label>
                                <div className="col-sm-6">
                                    <input type="number" className="form-control" name="name" id="name" placeholder="Hotel Name"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="hotel_id" className="col-sm-6 col-form-label">Hotel Id:</label>
                                <div className="col-md-6">
                                    <input type="number" className="form-control" name="hotel_id" id="hotel_id" placeholder="Total No Of Rooms"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="price_per_night" className="col-sm-6 col-form-label">Price Per Night:</label>
                                <div className="col-md-6">
                                    <input type="number" className="form-control" name="price_per_night" id="price_per_night" placeholder="Total No Of Rooms"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="total_beds" className="col-sm-6 col-form-label">Total Beds:</label>
                                <div className="col-md-6">
                                    <input type="number" className="form-control" name="total_beds" id="total_beds" placeholder="Total No Of Rooms"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="room_number" className="col-sm-6 col-form-label">Number:</label>
                                <div className="col-md-6">
                                    <input type="number" className="form-control" name="room_number" id="room_number" placeholder="Total No Of Rooms"></input>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <label for="description" className="col-sm-6 col-form-label">Description: </label>
                                <div className="col-sm-6">
                                    <textarea className="form-control" id="description" name="description" placeholder="Hotel Description"></textarea>
                                </div>
                            </div>
                            <div className="form-group row mb-2">
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-primary">Add Room</button>
                                </div>
                                <div className="col-sm-6">
                                    <button className="btn btn-warning">Clear Form</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}