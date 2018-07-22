import React, { Component } from 'react';
import './App.css';
import './Card.css';

class Card extends Component {
    render() {
        return (
            <div className="Card">
                <div id="description"><p>{this.props.description}</p></div>
            </div>
        );
    }
}

export default Card;
