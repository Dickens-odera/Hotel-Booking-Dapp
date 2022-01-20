import React,{ useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { HotelBookingContext } from '../context/HotelBookingContext';


const NavbarComponent = () => {
    const { connectedAddress } = useContext(HotelBookingContext);

    return (
        <div>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Hotel Booking Dapp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Hotels</Nav.Link>
                            <Nav.Link href="#link">Rooms</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Nav.Link>
                        { `${connectedAddress.slice(0,5)}...${connectedAddress.slice(connectedAddress.length - 4 )}` }
                    </Nav.Link>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarComponent;