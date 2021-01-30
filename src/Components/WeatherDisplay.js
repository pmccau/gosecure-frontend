import React from "react";
import * as config from '../Config/AppConfig'
const Settings = config.Settings;

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
        this.retrieveData(this.props.zipcode)

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
        this.retrieveData(this.props.zipcode)
    }

    /**
     * Go out and hit the API for the weather data
     */
    retrieveData(zipCode) {
        fetch(`${Settings.serverRootURL}:${Settings.serverPort}/api/weather/${zipCode}`, {
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

export default WeatherDisplay;