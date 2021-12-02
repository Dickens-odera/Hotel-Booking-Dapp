import React, {Component} from "react";

export default class NewRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotel:null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentWillMount() {

    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const web3 = await window.web3;
        const roomItem = {
            name: event.target.name.value,
            hotelId: event.target.hotel_id.value,
            totalBeds: event.target.total_beds.value,
            pricePerNight: await web3.utils.toWei(event.target.price_per_night.value.toString(),'ether'),
            number: event.target.room_number.value,
            description: event.target.description.value
        }

        await this.props.hotelContract.methods.addRoom(
            roomItem.hotelId,
            roomItem.totalBeds,
            roomItem.pricePerNight,
            roomItem.number,
            roomItem.name,
            roomItem.description
        ).send({
            from: this.props.account,
            gas: 6721975,
            gasLimit: 3000000
        }).then(( result )=> {
            console.log(result);
            window.alert("Room Added Successfully");
            window.location.reload();
        }).catch(( error )=> { console.error( error)})
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
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Hotel Name"></input>
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