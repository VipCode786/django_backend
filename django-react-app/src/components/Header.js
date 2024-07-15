import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
               
                <Navbar.Brand href="/" className="mx-auto">
                    <img
                        alt=""
                        src="/logok.svg" // Replace with your logo path
                        height="70"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/create">Create</Nav.Link>
                        {/* <Nav.Link href="#update">Update</Nav.Link>
                        <Nav.Link href="#delete">Delete</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
