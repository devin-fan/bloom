import React, { Component } from 'react';
import './App.css';
import './Work.css';
import Gallery from './Gallery.js'

class Work extends Component {
    render() {
        return (
            <div id="Work" className="section">
                <Gallery />
            </div>
        );
    }
}

export default Work;
