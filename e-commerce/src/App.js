import React,{Component} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Navigation from "./Componants/Navigation";
import About from "./Componants/About";
import Contact from "./Componants/Contact";
import Home from './Componants/Home';
import logo from './logo.svg';
import fire from './config/Fire'
import './App.css';
import Card from './Componants/Card'
import ListItem from './Componants/ListItem'
import LoginRegister from './Componants/LoginRegister'
import Home1 from './Componants/Home1'
import AddInventory from './Componants/AddInventory'
import 'bootstrap/dist/css/bootstrap.min.css'
class App extends React.Component
{
  constructor()
  {
    super();
    this.state={
      user:JSON.parse(localStorage.getItem("cuser"))||null
    }
  }

 // componentDidMount(){
   // this.authListener();
  //}

 // authListener(){
   // fire.auth().onAuthStateChanged((user) => {
     // if(user){
       // this.setState({user});
      //}else{
        //this.setState({user:null});
     // }
    //});
 // }

  render()
  {
    return (
      
      <div className="App">
        <div>
          {this.state.user ? (<Home1 />) : (< LoginRegister/>)}
        </div>
    </div>
    
    );
  }
  
}
export default App;
