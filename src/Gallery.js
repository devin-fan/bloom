import React, { Component } from 'react';
import './App.css';
import './Gallery.css';
import Card from './Card.js'

class Gallery extends Component {
    render() {
        return (
            <div id="Gallery">
                <Card description={"Look how pretty it looks when you can see the description of this project! Isn't it amazing?! - Devin"}/>
                <Card />
                <Card />
                <Card />
            </div>
        );
    }
}

export default Gallery;
