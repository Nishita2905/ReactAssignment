import {React,  Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Navigation from "../Componants/Navigation";
import About1 from '../Componants/About1'
import Contact from '../Componants/Contact'
import LoginRegister from "./LoginRegister";
import AddInventory from '../Componants/AddInventory';
class Home1 extends Component
{
  render()
  {
    return(
      <div>
      <Router>
      <Navigation />

      
      <Switch>
        <Route exact path="/about">
            <About1></About1>
        </Route>
        <Route exact path="/contact">
          
          <AddInventory></AddInventory>
          
         
        </Route>
        
      </Switch>
    </Router>

    </div>
      
      
      
    );
  }
}
export default Home1;