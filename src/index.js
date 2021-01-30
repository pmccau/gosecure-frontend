import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WeatherDisplay from "./Components/WeatherDisplay";
import Clock from "./Components/Clock";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavigationBar } from './Components/NavigationBar';
import Modal from 'react-modal'
import ContactSensor from './Components/ContactSensor';
import * as config from './Config/AppConfig'
import DogTracker from "./Components/DogTracker";
const Settings = config.Settings;


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
        fetch(`${Settings.serverRootURL}:${Settings.serverPort}/api/logs/pins`, {
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
        fetch(`${Settings.serverRootURL}:${Settings.serverPort}/api/pins`, {
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
                <React.Fragment>
                    <Router>
                        <NavigationBar />
                    </Router>
                </React.Fragment>
                <div className="column-container">
                    <div className="column">
                        <WeatherDisplay zipcode="19147" />
                        {/*<RingDoorbellEvent />*/}
                        {/*<RingEvent />*/}
                        <ContactSensor
                            name="garage"
                            isClosed={this.state.garage}
                            blink={this.state.blink && this.state.garage} />
                        <ContactSensor
                            name="front door"
                            isClosed={this.state.front_door}
                            blink={this.state.blink && this.state.front_door} />
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
