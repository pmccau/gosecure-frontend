import React from 'react';
import { Navbar } from 'react-bootstrap';
import Modal from './Modal'
import Lock from './Lock'


class NavigationBar extends React.Component {

    state = {
        show: false
    };
    showModal = e => {
        this.setState({
            show: !this.state.show
        });
    };

    render() {
        return (
            <Navbar expand="lg">
                <Lock
                    className="navicon"
                />
                <button
                    className="navbutton"
                    onClick={e => {
                        this.showModal(e);
                    }}
                >
                    <img className="navicon" src={process.env.PUBLIC_URL + "paw-orange.png"} />
                </button>

                <Modal onClose={this.showModal} show={this.state.show}>
                    This is where the buttons will go to mark off the pee & poo
                </Modal>
            </Navbar>
        )
    }
}

export default NavigationBar;