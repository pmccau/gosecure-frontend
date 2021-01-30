import React from "react";

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

export default ContactSensor;