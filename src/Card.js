import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import './App.css';
import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false
        }
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
    }

    handleMouseEnter(event) {
        this.setState({ hover: true })
    }

    render() {
        const softspring = { stiffness: 25, damping: 25};
        return (
            <div className="Card" onMouseEnter={this.handleMouseEnter} onClick={this.props.handler}>
                <Motion
                    style={{
                        opacity: spring(this.state.hover ? 0.8 : 0, softspring)
                    }}>
                    { style => <div className="info" style={{opacity: style.opacity }}>
                                <h1>{this.props.title}</h1>
                                <div className="description noselect"><p>{this.props.description}</p></div>
                                </div>
                    }
                </Motion>
                <div className="image"><img src={this.props.image} /></div>
            </div>
        );
    }
}

export default Card;
