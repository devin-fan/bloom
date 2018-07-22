import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import './App.css';
import './Gallery.css';
import Card from './Card.js'
import logo from './logo.svg'

class Gallery extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scrolldir: 0,
            prevScroll: 0
        }
        this.Card = []
        this._timeout = null
        this.handleScroll = this.handleScroll.bind(this)
        this.readjustScroll = this.readjustScroll.bind(this)
    }

    componentDidMount() {
        document.addEventListener("scroll", this.handleScroll)
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
        return (
            <div>
                <div id="Gallery">
                    <Card ref={(section) => { this.Card.push(section); }} title={"Devin's Project"} image={logo} description={"Look how pretty it looks when you can see the description of this project! Isn't it amazing?! - Devin"}/>
                    <Card ref={(section) => { this.Card.push(section); }}/>
                    <Card ref={(section) => { this.Card.push(section); }}/>
                    <Card ref={(section) => { this.Card.push(section); }}/>
                </div>
                <div id="Display">
                    <div className="display"></div>
                </div>
            </div>
        );
    }
}

export default Gallery;
