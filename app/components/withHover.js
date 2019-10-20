import React, { Component } from "react";

export default function withHover(Wrapper, propName = "hovering") {
  return class WithHover extends Component {
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
      const props = {
          ...this.props,
          [propName]: hovering
      }; 
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Wrapper {...props} />
        </div>
      );
    }
  };
}
