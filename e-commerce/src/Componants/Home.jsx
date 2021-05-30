import React, { Component } from "react";
import Card from "./Card";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from './About'
import Contact from './Contact'
import  Navigation from "./Navigation";
import "../App.css"
import "../ListItem.css"
import "../index.css"

class Home extends Component
{
  render()
  {
    return(
      <div>
      <Router>
      <Navigation />
     
  
    </Router>
    </div>
      
      
      
    );
  }
}
export default Home;