import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { css } from 'emotion'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  // NavLink,
  } from 'reactstrap';

  

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false
     };
     
  }
  
  linkColor = css`
    color: black;
    margin: 0 5px;

    ` 
  activeLink = css`
    font-weight: bold;
  `
  

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
     
    return ( 
      <div>
        <Navbar color="light" light expand="md">
          <NavLink 
            exact to="/"
            className={this.linkColor}
            activeClassName={this.activeLink}
          >
            <h4>Node Blog</h4>
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink 
                  to="/projects" 
                  className={this.linkColor} 
                  activeClassName={this.activeLink}
                >
                  Projects
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink 
                  to="/actions" 
                  className={this.linkColor} 
                  activeClassName={this.activeLink}
                >
                  All Actions
                </NavLink>
              </NavItem>              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
     )
  }
}
 
export default Header;