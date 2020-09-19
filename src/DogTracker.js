import React from "react";
import { Modal, Button } from 'react-bootstrap';



class DogModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setShow: this.props.setShow,
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }

    open() {
        console.log("Opened!")
        this.setState({
            setShow: true,
        })
    }

    close() {
        console.log("Closed!")
        this.setState({
            setShow: false,
        })
        console.log("State updated..." + this.state)
    }

    render() {
        console.log(this.state)

        return(
            <Modal
                show={this.props.setShow}
                onHide={this.close}
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.setShow}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.close}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        )
    }

}


class DogTracker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            setShow: false,
            iconName: "paw-orange",
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)

        console.log("State:")
        console.log(JSON.stringify(this.state))
        console.log("This.open = " + this.open)
    }

    open() {
        this.setState({
            setShow: true,
        })
    }

    close() {
        console.log("State beforehand: " + this.state.setShow)
        this.setState({
            setShow: false,
        })
        console.log("State after: " + this.state.setShow)
    }

    render() {
        console.log("State when rendering: " + JSON.stringify(this.state))
        return (
                <Button
                        className="navbutton"
                        variant="primary"
                        onClick={this.open}>
                        <img
                            className={this.props.className}
                            src={process.env.PUBLIC_URL + this.state.iconName + ".png"}
                        />
                        <Modal
                            show={this.state.setShow}
                            onHide={this.close}
                            // backdrop="static"
                            // keyboard={true}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.state.setShow}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.close}>
                                    Close
                                </Button>
                                <Button variant="primary">Understood</Button>
                            </Modal.Footer>
                        </Modal>
                </Button>

        );
    }
}

export default DogTracker;