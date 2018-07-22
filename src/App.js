import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import './App.css';
import './Navbar.css'
import Intro from './Intro.js';
import Work from './Work.js';

class App extends Component {

    scrollToWork() {
        scrollToComponent(this.Work, { offset: -40, align: 'top', duration: 1000})
    }

    scrollToPlay() {

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
                        <li>Play</li>
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
