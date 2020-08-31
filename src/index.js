import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

/**
 * This is the main display component for the weather readout
 */
class WeatherDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.icons = {
            "01d": "sun",
            "01n": "moon",
            "02d": "sun_clouds",
            "02n": "moon_clouds",
            "03d": "clouds",
            "03n": "clouds",
            "04d": "clouds",
            "04n": "clouds",
            "09d": "sun_rain",
            "10d": "rain",
            "11d": "thunder",
            "13d": "snow",
            "50d": "mist"
        }
    }

    /** Once mounted, retrieve the weather data for today
     *
     * Note: Currently hardcoded to Philly data in the server. This needs
     * to be updated to be zip-code request (ask user to share location data,
     * or override)
     */
    componentDidMount() {
        this.retrieveData()

        // Refresh weather every 10 minutes
        this.intervalID = setInterval(
            () => this.tick(),
            1000 * 60 * 10
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
    }

    /**
     * Go out and hit the API for the weather data
     */
    retrieveData() {
        fetch("http://localhost:8080/api/weather", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => this.parseResponse(json))
    }

    /**
     * Parse the response from the Go server to pull out the stuff we're interested in
     */
    parseResponse(json) {
        this.setState({
            description: json.weather[0].description,
            mainDescription: json.weather[0].main,
            temperature: this.convertFromKelvin(json.main.temp),
            temperature_hi: this.convertFromKelvin(json.main.temp_max),
            temperature_low: this.convertFromKelvin(json.main.temp_min),
            humidity: json.main.humidity,
            iconCode: json.weather[0].icon,
        })
        console.log(this.state.iconCode)
    }

    /**
     * Helper function to convert from Kelvin to Farenheit
     * @param kValue The value in Kelvin
     */
    convertFromKelvin(kValue) {
        return Math.round((kValue - 273.15) * 9/5 + 32)
    }

    render() {
        return (
            <div className={"widgetContainer"}>
                <div className={"widgetMainContainer"}>
                    <div className="widgetMainText">
                        {this.state.temperature + "°"}
                    </div>
                    <div className="widgetMainTextSmall">
                        {this.state.temperature_low +"° - " + this.state.temperature_hi+ "°"}
                    </div>
                </div>
                <div className={"widgetSecondaryContainer"}>
                    <img className="widgetSecondaryImg"
                         src={process.env.PUBLIC_URL + this.icons[this.state.iconCode] + ".png"}
                    />
                    <div className="widgetSecondaryText">
                        {this.state.description}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * This class serves as the clock component of the display
 */
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getFormattedDate()
    }

    /**
     * Setup the tick interval
     */
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    /**
     * Clock ticking
     */
    tick() {
        let dateObj = this.getFormattedDate()
        this.setState({
            time: dateObj.time,
            date: dateObj.date,
            suffix: dateObj.suffix
        });
    }

    /**
     * Helper function to retrieve a formatted date object, contains time
     * suffix (pm vs. am), time, and date
     */
    getFormattedDate() {
        let now = new Date();
        let hour = now.getHours() > 12 ? now.getHours() - 12 : now.getHours()
        let suffix = now.getHours() > 12 ? "pm" : "am"
        let time = hour + ":" +
            String(now.getMinutes()).padStart(2, '0') + ":" +
            String(now.getSeconds()).padStart(2, '0')
        let date = new Date().toLocaleDateString()

        return {
            time: time,
            date: date,
            suffix: suffix
        }
    }

    /**
     * Clear out the intervalID for reset
     */
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div className="widgetContainer">
                <div className="widgetMainContainer">
                    <div className="widgetMainText">
                        {this.state.time}
                    </div>
                    <div className="widgetMainTextSmall">
                        {this.state.suffix}
                    </div>
                </div>
                <div className="widgetSecondaryContainer">
                    <div className="widgetSecondaryText">
                        {this.state.date}
                    </div>
                </div>
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
        fetch("http://localhost:8080/api/pins", {
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
                let audio = old_state ? 'opening.mp3' : 'closing.mp3'
                audio = new Audio(process.env.PUBLIC_URL + audio)
                audio.play()
            }
        }
    }

    render() {
        return (
            <div>
                <div className="column-container">
                    <div className="column">
                        <WeatherDisplay />
                    </div>
                    <div className="column">
                        <Clock />
                    </div>
                </div>
                <div className={"sensorContainer"}>
                    <ContactSensor
                        name="garage"
                        isClosed={this.state.garage}
                        blink={this.state.blink && this.state.garage}/>
                    <ContactSensor
                        name="front door"
                        isClosed={this.state.front_door}
                        blink={this.state.blink && this.state.front_door}/>
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
