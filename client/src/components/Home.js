import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div className="container">
                <Navbar />
                <div className="row">
                    <div className="col-md-12">
                        <p className="text-center">Welcome to the home Component</p>
                    </div>
                </div>
            </div>
        );
    }
}