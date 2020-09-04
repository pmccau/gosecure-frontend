import React from "react";

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

export default Clock;