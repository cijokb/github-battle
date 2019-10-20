import React, { Component } from "react";

export default class Hover extends Component {
  state = {
    hovering: false
  };
  mouseOut = () => {
    this.setState({ hovering: false });
  };

  mouseOver = () => {
    this.setState({ hovering: true });
  };

  render() {
    const { hovering } = this.state;
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.children(hovering)}
      </div>
    );
  }
}
