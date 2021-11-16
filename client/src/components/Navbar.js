import React, { Component } from 'react';

export default class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "Hotel Booking DApp",
        }
    }

    render(){
        return(
            <React.Fragment>
                    <div className="container">
                    <nav className="navbar navbar-dark bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand text-center" href="#">
                                <h2 className="">{this.state.title}</h2>
                            </a>
                    
                        </div>
                    </nav>
                    <p>Account: {this.props.account}</p>
                    </div>
            </React.Fragment>
        );
    }
}
