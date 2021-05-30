import React from "react";
import  Navigation from "./Navigation";
import Home from './Home'
import Contact from './Contact'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Card from './Card'
import '../ListItem.css'
import LoginRegister from "./LoginRegister";
function About() {
  return (
    <div>
     
     <LoginRegister></LoginRegister>
    </div>
  );
}

export default About;