import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import './App.css';
import './Navbar.css'
import Intro from './Intro.js';
import Work from './Work.js';

class App extends Component {

    constructor(props) {
        super(props)
        this._timeout = null
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
        document.addEventListener("scroll", this.handleScroll)
    }

    readjustScroll(scrollY) {
        let gallery = document.getElementById("Work").getBoundingClientRect()
        if (scrollY > 100 && scrollY < gallery.top) {
            scrollToComponent(this.Work, { offset: -40, align: 'top', duration: 1000})
        }
    }

    handleScroll(event) {
        if(this._timeout){ //if there is already a timeout in process cancel it
            clearTimeout(this._timeout);
        }
        this._timeout = setTimeout(() => {
            this._timeout = null;
            this.readjustScroll(window.scrollY)
        }, 100);
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

                <Intro />

                <Work ref={(section) => { this.Work = section; }}/>
            
                <div style={{height: "100vh"}} ref={(section) => { this.About = section; }}></div>
            </div>
        );
    }
}

export default App;
