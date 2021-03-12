import React from "react";
import Modal from "react-modal";
import * as config from '../Config/AppConfig'
const CustomStyles = config.CustomStyles;

/**
 * The DogTracker class is used to track when a dog has last gone out. It
 * will open a modal in the render function when the icon is clicked. This
 * is anchored in the NavigationBar.
 *
 * Does not interact with the server - all logic is self-contained. Previously
 * was hitting a DB on back end, but it was unnecessary and inefficient
 *
 * Key points:
 * =============================================================================
 * handleModalChange  =>  Opens/Closes
 * getLastMovement    =>  Displays the time difference since last
 *                        movement using some helpers
 * logMovement        =>  Set the most recent occurrence of a movement
 */
class PiholeModal extends React.Component {

  /**
   * Constructor for the DogTracker modal object
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      iconName: "pi_logo",
      status: undefined,
      timeout: null,
    };
    // this.logMovement = this.logMovement.bind(this);
  }

  /**
   * Handle the opening/closing of the modal
   */
  handleModalChange(isOpen) {
    if (isOpen) {

      const timer = setTimeout(() => {this.handleModalChange(false)}, 60000);

      this.setState({
        showModal: isOpen,
        timeout: timer,
      });

    } else {
      if (this.timeout) clearTimeout(this.timeout);
      this.setState({
        showModal: isOpen,
        timeout: null,
      });
    }
  }

  /**
   * Log a movement - this will set the most recent occurrence
   * @param number the movement number, either 1 or 2
   */
  // logMovement(number) {
  //   let newState = new Array();
  //   if (number == 3) {
  //     for (let i = 0; i < 2; i++) {
  //       newState[i] = {
  //         Timestamp: Date.now(),
  //         Movement_Type: i + 1,
  //       }
  //     }
  //   } else {
  //     // Set the state - keep the unintended one
  //     const keepState = this.state.status ? this.state.status[number % 2] : undefined;
  //     newState[number % 2] = keepState;
  //     newState[number - 1] = {
  //       Timestamp: Date.now(),
  //       Movement_Type: number,
  //     }
  //   }
  //   this.setState({
  //     status: newState,
  //   })
  // }

  /**
   * Gets the difference between a date and the current time. It's a little ugly, but it works.
   * @param d The date in question
   * @returns {{milliseconds: number, hours: number, seconds: number, minutes: number, days: number}}
   */
  // getFormattedDifference(d) {
  //   // Calc helpers
  //   const now = new Date(Date.now());
  //   const msPerDay = 1000 * 60 * 60 * 24;
  //   const msPerHour = 1000 * 60 * 60;
  //   const msPerMinute = 1000 * 60;
  //
  //   // Difference between now and d
  //   const diff = now - d;
  //
  //   // How many days difference?
  //   const daysDiff = Math.floor(diff / msPerDay);
  //   const remainder1 = diff - (msPerDay * daysDiff);
  //   const hoursDiff = Math.floor(remainder1 / msPerHour);
  //   const remainder2 = remainder1 - (msPerHour * hoursDiff);
  //   const minutesDiff = Math.floor(remainder2 / msPerMinute);
  //   const remainder3 = remainder2 - (msPerMinute * minutesDiff);
  //   const secondsDiff = Math.floor(remainder3 / 1000);
  //   const millisecondsDiff = remainder3 - (1000 * secondsDiff);
  //
  //   return {
  //     days: daysDiff,
  //     hours: hoursDiff,
  //     minutes: minutesDiff,
  //     seconds: secondsDiff,
  //     milliseconds: millisecondsDiff,
  //   }
  // }

  /**
   * Helper function to format a time difference object as text. Will
   * be something like "about x <time period>(s) ago"
   * @param diff
   * @returns {string}
   */
//   getTextDifference(diff) {
//     if (diff.hours == 0 && diff.days == 0 && diff.minutes == 0) {
//       return "Less than a minute ago";
//     } else if (diff.hours == 0 && diff.days == 0) {
//       return `About ${diff.minutes} minute${diff.minutes == 1 ? "" : "s"} ago`;
//     } else if (diff.days == 0) {
//       let hr = diff.hours;
//       if (diff.minutes > 15 && diff.minutes <= 45) {
//         hr = `${hr}.5`;
//       } else if (diff.minutes > 45) {
//         hr = `${diff.hours + 1}`;
//       }
//       return `About ${hr} hour${hr == 1 ? "" : "s"}`;
//     } else {
//       return `${diff.days} ${diff.days == 1 ? "whole day" : "days"}!`;
//     }
//
//   return "?";
// }

  /**
   * Get the last movement for a specific type. If not available,
   * will return "i'm not sure"
   * @param number Either 1 or 2
   * @returns {string|number} Will be a formatted text indicating time since last
   */
  // getLastMovement (number) {
  //   if (!this.state.status) {
  //     return "i'm not sure...";
  //   } else if (!this.state.status[number - 1]) {
  //     return "i'm not sure...";
  //   }
  //   const d = new Date(this.state.status[number - 1].Timestamp);
  //   return this.getTextDifference(this.getFormattedDifference(d));
  // }
  //

  /**
   * Render the modal
   * @returns {JSX.Element}
   */
  render () {
    return (
      <div>
        <button className="navbutton" onClick={() => {
          this.handleModalChange(true);
        }}>
          <img
            className={this.props.className}
            src={process.env.PUBLIC_URL + this.state.iconName + ".png"}
          />
        </button>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={CustomStyles}
        >
          <div>
              <iframe src="http://192.168.86.213/admin/index.php"
                style={{width: '1200px', height: "800px", overflow: "auto"}}/>
              <div onClick={ () => this.handleModalChange(false) } className="sensorButton blink-true">
                <div className="sensorButtonText">all done</div>
              </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default PiholeModal;