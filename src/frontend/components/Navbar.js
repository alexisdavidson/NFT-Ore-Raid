import {
    Link
} from "react-router-dom";

import { Navbar, Container } from 'react-bootstrap'
import logo from './assets/logo.png'

const Navigation = () => {
    return (
        <Navbar expand="lg" variant="dark">
            <Container>
                <Navbar.Brand>
                    <img src={logo} className="" alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            </Container>
        </Navbar>
    )

}

export default Navigation;