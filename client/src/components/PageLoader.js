import React,{ Component } from 'react';
import Loader from 'react-loader-spinner';

export default class PageLoader extends Component
{
    render(){
        return(
            <Loader
                type="Circles" //Puff ,Mutating Dots ,ThreeDots, TailSpin, Rings, Oval, Hearts,Circles,Ball-Triangle,Audio
                color="#00BFFF"
                height={200}
                width={100}
                timeout={5000}
                visible={true}
            />
        );
    }
}