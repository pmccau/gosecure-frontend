import React from "react";
import Modal from "react-modal";
import * as config from '../Config/AppConfig'
import {useState} from "react";
import IframeResizer from "iframe-resizer-react";
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
function IFrameModal(props) {

  const [showModal, setShowModal] = useState(false);
  const [timeout, setTimeout] = useState(null);

  /**
   * Handle the opening/closing of the modal
   */
  const handleModalChange = (isOpen) => {
    if (isOpen) {
      const timer = setTimeout(() => {handleModalChange(false)}, 60000);
      setTimeout(timer);
    } else {
      if (timeout) clearTimeout(timeout);
      setTimeout(null);
    }
    setShowModal(isOpen);
  }

  /**
   * Render the modal
   * @returns {JSX.Element}
   */
  return (
    <div>
      <button className="navbutton" onClick={() => {
        handleModalChange(true);
      }}>
        <img
          className={props.className}
          src={process.env.PUBLIC_URL + props.iconName + ".png"}
        />
      </button>
      <Modal
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
        style={CustomStyles}
      >
        <div>
            <table><tbody>
            <tr><td>
                {/*<iframe src={props.src} />*/}
                <IframeResizer scrolling={props.scrolling} src={props.src} style={{ width: '500px', minWidth: '100%', height: '400px', overflow: "auto"}} />
            </td></tr>
            <tr><td>
                <div onClick={ () => handleModalChange(false) } className="sensorButton-small blink-true">
                    <div className="sensorButtonText-small">all done</div>
                </div>
            </td></tr>
            </tbody></table>
        </div>
      </Modal>
    </div>
  );
}

export default IFrameModal;