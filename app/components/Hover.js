import React, { Component } from "react";

export default class Hover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOut() {
    this.setState({ hovering: false });
  }

  mouseOver() {
    this.setState({ hovering: true });
  }

  render() {
    const { hovering } = this.state;
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.children(hovering)}
      </div>
    );
  }
}
