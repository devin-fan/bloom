import React, { Component } from 'react';
import './App.css';
import './Gallery.css';
import Card from './Card.js'
import logo from './logo.svg'

class Gallery extends Component {
    render() {
        return (
            <div id="Gallery">
                <Card title={"Devin's Project"} image={logo} description={"Look how pretty it looks when you can see the description of this project! Isn't it amazing?! - Devin"}/>
                <Card />
                <Card />
                <Card />
            </div>
        );
    }
}

export default Gallery;
