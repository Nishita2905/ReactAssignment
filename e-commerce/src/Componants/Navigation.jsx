import React from "react";
import { Link, withRouter } from "react-router-dom";
import fire from "../config/Fire";


function Navigation(props) {

  const go=()=>{
    localStorage.removeItem("cuser");
  }
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            My Application
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              
              <li
                class={`nav-item  ${
                  props.location.pathname === "/contact" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/contact">
                  Products
                </Link>

               
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <form>
                <button style={{"backgroundColor":"red"}}  onClick={()=>go()} class="nav-link">
                  Logout
                </button>
                </form>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
  
}


export default withRouter(Navigation);