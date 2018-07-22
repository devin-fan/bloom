import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import './App.css';
import './Navbar.css'
import Intro from './Intro.js';
import Work from './Work.js';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            scrolldir: 0,
            prevScroll: 0
        }
        this._timeout = null
        this.handleScroll = this.handleScroll.bind(this)
        this.readjustScroll = this.readjustScroll.bind(this)
    }

    componentDidMount() {
        document.addEventListener("scroll", this.handleScroll)
    }

    readjustScroll(scrollY) {
        let gallery = document.getElementById("Work")
        let galleryrect = gallery.getBoundingClientRect()
        if (scrollY > 100 && galleryrect.y > 140) {
            if (this.state.scrolldir > 0) {
                scrollToComponent(this.Work, { offset: -40, align: 'top', duration: 1000})
            } else {
                scrollToComponent(this.Intro, { offset: 0, align: 'top', duration: 1000})
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
        }, 25);
     }

    scrollToWork() {
        scrollToComponent(this.Work, { offset: -40, align: 'top', duration: 1000})
    }

    scrollToPlay(event) {
    }

    scrollToAbout() {
        scrollToComponent(this.About, { offset: 0, align: 'top', duration: 1000})
    }

    render() {
        return (
            <div className="App">
                <div className="Navbar noselect">
                    <ul>
                        <li onClick={this.scrollToWork.bind(this)}>Work</li>
                        <li onClick={this.scrollToPlay.bind(this)}>Play</li>
                        <li onClick={this.scrollToAbout.bind(this)}>About</li>
                    </ul>
                </div>

                <Intro ref={(section) => { this.Intro = section; }} />

                <Work ref={(section) => { this.Work = section; }}/>
            
                <div style={{height: "100vh"}} ref={(section) => { this.About = section; }}></div>
            </div>
        );
    }
}

export default App;
