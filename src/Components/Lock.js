import React from "react";

class Lock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLocked: false,
      iconName: "unlocked-orange"
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    console.log("This is..." + this)
    let nextLockedState = !this.state.isLocked
    let iconName = nextLockedState ? "locked-blue" : "unlocked-orange"

    this.setState({
      isLocked: !this.state.isLocked,
      iconName: iconName
    })
    console.log("New icon should be " + this.state.iconName)
  }


  render() {
    return (
      <div>
        <button
          className="navbutton"
          onClick={this.onClick}
        >
          <img
            className={this.props.className}
            src={process.env.PUBLIC_URL + this.state.iconName + ".png"}
          />
        </button>
      </div>
    );
  }
}

export default Lock;