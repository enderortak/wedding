
import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "semantic-ui-container/container.css";
import "semantic-ui-header/header.css";
import Dashboard from "../Dashboard/Dashboard";
import NavBar from "../NavBar/NavBar";
import "./../../shared/style/react-toastify.css";
import Tasks from "./../Tasks/Tasks";
import Guests from "./../Guests/Guests";
import "./App.css";
import Hero from "./components/Hero";
  
window.secureMode = false;
class App extends Component {
  state = { contentStyle: {},  bgStyle: {}}
  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
}

handleScroll(event) {
  const scrollY = window.scrollY > 0 ? window.scrollY : 0; // negative scroll fix for mobile
    this.setState({
      contentStyle: {
        opacity: Math.min(1, 1 - (scrollY/400)),
        transform: "translateY(" + scrollY * 0.5 + "px) scaleY(" + Math.max(0, 1 - (scrollY/500)) + ")"
      },
      bgStyle: { opacity: Math.min(1, 1 - (scrollY/600)) }
    });
}
  render() {
    return (
      <BrowserRouter>    
      <div className="App">
        {!window.secureMode && <Hero contentStyle={this.state.contentStyle} bgStyle={this.state.bgStyle} /> }
        {!window.secureMode && <NavBar />}
        <div id="content">
        <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/tasks" component={Tasks}/>
            <Route path="/guests" component={Guests}/>
        </Switch>
        </div>
        <ToastContainer />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
