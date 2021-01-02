import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherDisplay from "./WeatherDisplay";
import Clock from "./Clock";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './NavigationBar';
import Modal from 'react-modal'


/**
 * This will be the contact sensor display
 */
class ContactSensor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"sensorButton " + this.props.isClosed + " blink-" + this.props.blink }>
                <div className="sensorButtonText">
                    {this.props.name}
                </div>
            </div>
        )
    }
}

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class RingDoorbellEvent extends React.Component {
    constructor () {
        super();
        this.state = {
            showModal: false,
            videoSrc: "https://share-service-download-bucket.s3.amazonaws.com/06758602/6912457573228323776_stamp.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA46UYW43TEIVUMTZD%2F20201231%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201231T162808Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDQB4MCxm%2FukcR8YsLUWcOV03audlljJIdrXOxVQoEEfQIhAK24wtzNzsgqAaTf4MydeZcaK6eB7stDJ7LC5qeSWd8GKr0DCI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMODkwNDUyMjQwMTAyIgzakpLtf6sW%2Ba8Vo6IqkQP2slSVmG4O1NFNWPTOMWUYKkeKGR8o%2BXt1PSlA8sfrChV9RxXPrV2jIiQKNck6QuMi1jt85ZECrjHDVeN2Fy4mUNzC9bVNjcmyIvDPWaJzFlaNh4fF%2FXInRlbvNEUeVaDhhXmwe1oCOEJuSo8nAIQ3BMSzOa5hDNB8DGodSh5xcWxLgUB0MOBhIK5Gs6pDsOYOBb5Je9hZCtLGGVWBRbc1NBcrz9biJoBYAUgc6OGRKlTu7LpWG4cwXhY%2Bymt545xXUyde2AGmQV5vyV85rocDujWB5wpXBOjtBk1uAP6zdkT9%2FXmc0gfRbl1sWjpI7aU3f5LJiH9S1hASPC2liULiryeRv4aouVpg0%2Fib%2FrXOvq%2FCWoNxxlXFsabV0BXqITgGsQ7hiaLDzfqDXoMMZCc1X46Rk4ZzRzZPg%2BEXJekxhXwyaKAN2G5yasvZcYQJCOkZkM0WAVKfK%2FRkogpXEm4FG%2BBmMJK2KrUWKQYzKVfWzFiRi4By1xLL%2BOkEVnj7huKjaUlgIyaOR3M0sHBXD3L9bjCv%2Fbb%2FBTrqAUEHJlGExefsWpDnmlY3u%2BR7nNyu6fTY%2FIzs0M2vkjzSKUOomArE0x9Xr1QQOTS3yF1CtltOo6TibQUyj2aU5ZNqE09A7FeSi5jHV%2FZkpH7lYzlvw2EvYVnqhdTRCVtePMyKtofv6Zhs9cpQrpmdFsH2pYoIEGNm2K2m%2FNXL77TtiGDQP%2Bz4RI9ie0N8rLfE8ydoFyDUr7WlIVHNEdU4A%2Br9EaueIm7cyCR4FVgF%2Be2g8mvBU5QfiiGPw%2Bj4HTiemNC0fVHgJjf2tJUyC2fdD8Mx0No6jcJ%2BYdMp0i8%2FjvmiENmA8%2BYz1%2FX%2FeQ%3D%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=f26f16df2fa8034c96808353c681ffec15cb10ef5d4b3776692ebb6ddbd75479"
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true }, () => {
            // setTimeout(this.handleCloseModal(), 3000);
            console.log("Working");
            setTimeout(() => {this.setState({showModal: false})}, 10000);
        });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render () {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Trigger Modal</button>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    style={customStyles}
                >
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                    <iframe src={this.state.videoSrc} width="800" height="600" allow="autoplay" />
                </Modal>
            </div>
        );
    }
}

/**
 * Basic root class
 */
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            garage: false,
            front_door: false,
            blink: false
        }
    }

    /**
     * This should really be a component of its own... TODO
     */
    retrievePinLogs() {
        fetch("http://localhost:5000/api/logs/pins", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                let events = json["events"].split("\n")
                if (events[0].charAt(0) != '[') {
                    events = events.slice(1, events.length - 1)
                }
                for (let i = 0; i < events.length; i++) {
                    console.log(" > i=" + events[i])
                }
            })
    }

    /** Once mounted, retrieve the weather data for today
     *
     * Note: Currently hardcoded to Philly data in the server. This needs
     * to be updated to be zip-code request (ask user to share location data,
     * or override)
     */
    componentDidMount() {
        this.retrieveData()

        // Refresh weather every second
        this.intervalID = setInterval(
            () => this.tick(),
            500
        );
    }

    /**
     * Clear out the intervalID for reset
     */
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    /**
     * Clock ticking
     */
    tick() {
        this.retrieveData()
        let nextBlink = !this.state.blink
        this.setState({
            blink: nextBlink,
        })
    }

    /**
     * Go out and hit the API for the pin data
     */
    retrieveData() {
        fetch("http://localhost:5000/api/pins", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => this.parseResponse(json))
    }

    parseResponse(json) {
        for (let i = 0; i < json.length; i++) {
            let sensor = json[i]
            sensor.Name = sensor.Name.replace(" ", "_")
            if (this.state[sensor.Name] != sensor.Current) {
                let old_state = this.state[sensor.Name]
                this.setState({
                    [sensor.Name]: sensor.Current,
                })
                let audio = old_state ? 'closing.mp3' : 'opening.mp3'
                audio = new Audio(process.env.PUBLIC_URL + audio)
                audio.play()
            }
        }
    }


    render() {
        return (
            <div>
                {/*<button*/}
                {/*    className="test-log"*/}
                {/*    onClick={this.retrievePinLogs}*/}
                {/*>FETCH!*/}
                {/*</button>*/}
                <React.Fragment>
                    <Router>
                        <NavigationBar />
                    </Router>
                </React.Fragment>
                <div className="column-container">
                    <div className="column">
                        <WeatherDisplay />
                        {/*<RingDoorbellEvent />*/}
                        {/*<RingEvent />*/}
                        <ContactSensor
                            name="garage"
                            isClosed={this.state.garage}
                            blink={this.state.blink && this.state.garage}/>
                        <ContactSensor
                            name="front door"
                            isClosed={this.state.front_door}
                            blink={this.state.blink && this.state.front_door}/>
                    </div>
                    <div className="column">
                        <Clock />
                    </div>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
