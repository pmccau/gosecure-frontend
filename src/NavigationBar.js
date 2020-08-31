import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { DogTracker } from './DogTracker'


class Lock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLocked: false,
            iconName: "unlocked-orange"
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        console.log("This is..." + this)
        let nextLockedState = !this.state.isLocked
        let iconName = nextLockedState ? "locked-blue" : "unlocked-orange"

        this.setState({
            isLocked: !this.state.isLocked,
            iconName: iconName
        })
        console.log("New icon should be " + this.state.iconName)
    }

    render() {
        return (
            <button
                className="navbutton"
                onClick={this.onClick}
            >
                <img
                    className={this.props.className}
                    src={process.env.PUBLIC_URL + this.state.iconName + ".png"}
                />
            </button>
        );
    }
}

export const NavigationBar = () => (
    <Navbar expand="lg">
        {/*<DogTracker />*/}
        <Lock
            className="navicon"
        />
        <a href={"/"}>
            <img
                className="navicon"
                src={process.env.PUBLIC_URL + "paw-orange" + ".png"}
            />
        </a>
        {/*<Navbar.Brand href="/">*/}

        {/*</Navbar.Brand>*/}

        {/*<Navbar.Collapse id="basic-navbar-nav">*/}
        {/*    <Nav className="ml-auto">*/}
        {/*        /!*<Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>*!/*/}
        {/*        /!*<Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>*!/*/}
        {/*    </Nav>*/}
        {/*</Navbar.Collapse>*/}
    </Navbar>
)