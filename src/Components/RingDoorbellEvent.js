import React from "react";
import Modal from "react-modal";
import * as config from './AppConfig'
const CustomStyles = config.CustomStyles;

class RingDoorbellEvent extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
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

export default RingDoorbellEvent;