import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Navbar</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <Link to="/home" className="nav-item nav-link">Home</Link>
                <Link to="/projects" className="nav-item nav-link">Projects</Link>
                <Link to="/tasks" className="nav-item nav-link">Tasks</Link>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
}

export default Navbar;