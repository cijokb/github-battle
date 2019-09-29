import React, { Component } from "react";
import ReactDom from "react-dom";
import "./index.css";
import Popular from "./components/Popular";
import Battle from "./components/Battle";
class App extends Component {
  render() {
    return (
      <div className="container">
        <Battle/>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
