import React, { Component } from 'react';
import './App.css';
import './Card.css';

class Card extends Component {
    render() {
        return (
            <div className="Card">
                <div className="info">
                    <div className="header">
                        <div className="header-position">
                            <h1>{this.props.title}</h1>
                        </div>
                    </div>
                    <div className="description noselect"><p>{this.props.description}</p></div>
                </div>
                <div className="image"><img src={this.props.image} /></div>
            </div>
        );
    }
}

export default Card;
