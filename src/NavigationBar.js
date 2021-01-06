import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import Modal from 'react-modal'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        backgroundColor       : '#092238'
    }
};

/**
 * The DogTracker class is used to track when a dog has last gone out
 */
class DogTracker extends React.Component {

    /**
     * Constructor for the DogTracker modal object
     * @param props
     */
    constructor (props) {
        super(props);
        this.state = {
            showModal: false,
            iconName: "paw-orange",
            status: this.getStatus(),
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    /**
     * Handle the opening of the modal
     */
    handleOpenModal () {
        this.setState({ showModal: true });
    }

    /**
     * Handle the closing of the modal
     */
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    /**
     * Log a movement
     * @param number the movement number, either 1 or 2
     */
    logMovement (number) {
        const response = fetch("http://localhost:5000/api/movement/" + number, {
            method: 'POST',
        })
            .then(() => this.getStatus())
    }

    /**
     * Get the status from the database for movements
     */
    getStatus () {
        fetch("http://localhost:5000/api/movement", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            // .then(res => console.log(res.json()))
            .then(res => res.json())
            .then(json => {
                // console.log(json)
                this.setState({
                    status: json,
                })
            })
    }

    /**
     * Helper function to determine the time difference between two date objects
     * @param d1 Date object 1
     * @param d2 Date object 2
     * @returns {string} d1 - d2 formatted as HH:MM
     */
    getTimeDifference(d1, d2) {
        const diff = (d1.getTime() - d2.getTime()) / 1000 / 60;
        const hours = parseInt(diff / 60)
        const minutes = Math.round(parseInt(diff))
        const seconds = Math.round((diff - minutes) * 60)
        // console.log(seconds)
        return (("" + hours).length == 1 ? "0" + hours : hours) + ":" + (("" + minutes).length == 1 ? "0" + minutes : minutes)
    }

    /**
     * Get the time since most recent movement 1 occurred
     * @returns {string}
     */
    getLastPee () {
        if (!this.state.status) {
            return "N/A"
        }
        const date = new Date(new Date(this.state.status[0].Timestamp).getTime() - (5*60*60000));
        const now = new Date();
        return this.getTimeDifference(now, date);
    }

    /**
     * Get the time since most recent movement 2 occurred
     * @returns {string}
     */
    getLastPoo () {
        if (!this.state.status) {
            return "N/A"
        }
        const date = new Date(new Date(this.state.status[1].Timestamp).getTime() - (5*60*60000));
        const now = new Date();
        return this.getTimeDifference(now, date);
    }

    /**
     * Get the layout for status from the server
     */
    showStatus () {
        return (
            <div>
                <table><tbody><tr>
                        <td className="widgetMainText">&nbsp;&nbsp;{this.getLastPee()}&nbsp;&nbsp;</td>
                        <td className="widgetMainText">&nbsp;&nbsp;{this.getLastPoo()}&nbsp;&nbsp;</td>
                    </tr><tr>
                        <td><div onClick={() => this.logMovement(1)} className="sensorButton false">
                            <div className="sensorButtonText">
                                <img width="120px" height="120px"
                                    src={process.env.PUBLIC_URL + "move1.png"}
                                />
                            </div>
                        </div></td>
                        <td><div onClick={() => this.logMovement(2)} className="sensorButton false">
                            <div className="sensorButtonText">
                                <img width="120px" height="120px"
                                     src={process.env.PUBLIC_URL + "move2.png"}
                                />
                            </div>
                        </div></td>
                </tr><tr><td colSpan="2">
                    <div onClick={() => {
                        this.logMovement(1);
                        this.logMovement(2)
                    }} className="sensorButton false">
                        <div className="sensorButtonText">
                            <img width="120px" height="120px"
                                 src={process.env.PUBLIC_URL + "move1.png"}
                            />
                            <img width="120px" height="120px"
                                 src={process.env.PUBLIC_URL + "move2.png"}
                            />
                        </div>
                    </div>
                </td></tr><tr><td>
                    <div onClick={this.handleCloseModal} className="sensorButton blink-true">
                        <div className="sensorButtonText">all done</div>
                    </div>
                </td></tr></tbody></table>
            </div>
        )
    }

    /**
     * Render the modal
     * @returns {JSX.Element}
     */
    render () {
        return (
            <div>
                <button className="navbutton" onClick={() => {
                    this.handleOpenModal();
                    console.log(this.getStatus())
                }}>
                    <img
                        className={this.props.className}
                        src={process.env.PUBLIC_URL + this.state.iconName + ".png"}
                    />
                </button>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    style={customStyles}
                >
                    {this.showStatus()}
                </Modal>
            </div>
        );
    }
}

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
            <div>
                <button
                    className="navbutton"
                    onClick={this.onClick}
                >
                    <img
                        className={this.props.className}
                        src={process.env.PUBLIC_URL + this.state.iconName + ".png"}
                    />
                </button>
            </div>
        );
    }
}

export const NavigationBar = () => (
    <Navbar expand="lg">
        <table><tr><td className="button-cell">
            <Lock className="navicon" />
        </td><td className="button-cell">
            <DogTracker className="navicon" />
        </td></tr></table>
    </Navbar>
)