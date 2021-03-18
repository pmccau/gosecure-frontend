import React from "react";
import Modal from "react-modal";
import * as config from '../Config/AppConfig'
import {useState} from "react";
import IframeResizer from "iframe-resizer-react";
const CustomStyles = config.CustomStyles;

/**
 * Simple modal object. Pass in props to build an iframe modal
 *
 * src: the source link
 * scrolling: whether to allow or disallow scrolling
 * iconName: The name of the icon to be shown as the button
 * className: The class name of the icon
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