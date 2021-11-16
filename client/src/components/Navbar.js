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
                    <div className="container mb-2">
                    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                        <a className="navbar-brand text-uppercase" href="#">{this.state.title}</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li class="nav-item active">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Hotels</a>
                                </li>
                            </ul>
                            <span class="navbar-text mr-sm-2 float-left">
                                <p className="my-2 my-sm-0">{this.props.account}</p>
                            </span>
                        </div>
                    </nav>
                    </div>
            </React.Fragment>
        );
    }
}
