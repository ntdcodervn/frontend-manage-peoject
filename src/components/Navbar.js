import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';

function NavbarComponent(props) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Manage Project App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/projectManage">Project Manage</Nav.Link>
            <Nav.Link href="/memberManage">Member Manage</Nav.Link>
            </Nav>
          
        </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarComponent;