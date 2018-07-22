import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import { Motion, spring } from 'react-motion';
import './App.css';
import './Gallery.css';
import Card from './Card.js';
import logo from './logo.svg';

class Gallery extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scrolldir: 0,
            prevScroll: 0,
            displayingCard: [false]
        }
        this.Card = []
        this.Display = []
        this._timeout = null
        this.handleScroll = this.handleScroll.bind(this)
        this.readjustScroll = this.readjustScroll.bind(this)
        this.handleClickCard = this.handleClickCard.bind(this)
        this.toggleDisplay = this.toggleDisplay.bind(this)
    }

    componentDidMount() {
        document.addEventListener("scroll", this.handleScroll)
    }

    handleClickCard(itemid) {
        document.body.style.overflow = "hidden" 
        let display = this.Display[itemid]
        display.style.display = "block"
        let displayState = this.state.displayingCard
        displayState[itemid] = true
        this.setState({ displayingCard: displayState})
    }

    handleClickDisplay(itemid) {
        document.body.style.overflow = "auto"
        let displayState = this.state.displayingCard
        displayState[itemid] = false
        this.setState({ displayingCard: displayState})
    }

    toggleDisplay(itemid) {
        let display = this.Display[itemid]
        display.style.display = this.state.displayingCard[itemid] ? "block" : "none"
    }

    readjustScroll(scrollY) {
        let gallery = document.getElementById("Gallery")
        let galleryrect = gallery.getBoundingClientRect()
        if (galleryrect.y <= 40) {
            for (let i = 1; i < gallery.childElementCount; i++) {
                let first = gallery.children[i-1]
                let second = gallery.children[i]
                let firstrect = first.getBoundingClientRect()
                let secondrect = second.getBoundingClientRect()
                if (secondrect.top < firstrect.bottom) {
                    if (5 < secondrect.top - firstrect.top && secondrect.top - firstrect.top < 200) {
                        scrollToComponent(this.Card[i], { offset: -40, align: 'top', duration: 500})
                        return
                    } else {
                        if (5 < firstrect.bottom - secondrect.top && firstrect.bottom - secondrect.top < 200) {
                            scrollToComponent(this.Card[i-1], { offset: -firstrect.bottom + secondrect.top - 80, align: 'top', duration: 750})
                            return
                        }
                    }
                }
            }
        } 
    }

    handleScroll(event) {
        this.setState({
            prevScroll: window.scrollY,
            scrolldir: Math.sign(window.scrollY - this.state.prevScroll)
        })
        if(this._timeout){ //if there is already a timeout in process cancel it
            clearTimeout(this._timeout);
        }
        this._timeout = setTimeout(() => {
            this._timeout = null;
            this.readjustScroll(window.scrollY)
        }, 50);
     }

    render() {
        const springconfig = { stiffness: 100, damping: 15};
        return (
            <div>
                <div id="Gallery">
                    <Card 
                        ref={(section) => { this.Card.push(section); }} 
                        handler={this.handleClickCard.bind(this, 0)}
                        title={"Devin's Project"} image={logo} 
                        description={"Look how pretty it looks when you can see the description of this project! Isn't it amazing?! - Devin"}
                    />
                    <Card ref={(section) => { this.Card.push(section); }}/>
                    <Card ref={(section) => { this.Card.push(section); }}/>
                    <Card ref={(section) => { this.Card.push(section); }}/>
                </div>
                <div id="Display">
                    <Motion
                        style={{ top: spring(this.state.displayingCard[0] ? 0 : 100, springconfig)}}
                        onRest={this.toggleDisplay.bind(this, 0)}
                    >
                        {style => 
                            <div 
                                className="display" 
                                style={{transform:`translateY(${style.top}vh)`}}
                                ref={(section) => { this.Display.push(section); }}
                                onClick={this.handleClickDisplay.bind(this, 0)}
                            >
                                <div className="display-content"></div>
                            </div>
                        }
                    </Motion>
                </div>
            </div>
        );
    }
}

export default Gallery;
