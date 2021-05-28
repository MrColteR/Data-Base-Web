import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
export class Navigation extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                        Home
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/supplier">
                        Supplier
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/supply">
                        Supply
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/details">
                        Details
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-dark text-white" to="/historyprice">
                        History Price
                    </NavLink>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}