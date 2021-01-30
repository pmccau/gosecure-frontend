import React from "react";
import Modal from "react-modal";
import * as config from './AppConfig'
const CustomStyles = config.CustomStyles;

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

export default RingDoorbellEvent;