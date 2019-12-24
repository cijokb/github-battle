import React, { Component, lazy, Suspense, useState } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./components/Nav";
import Loading from "./components/Loading";
import "./index.css";


const Popular = lazy(() => import("./components/Popular"));
const Battle = lazy(() => import("./components/Battle"));
const Results = lazy(() => import("./components/Results"));

const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme((theme) => (
      theme === "light" ? "dark" : "light"
    ));
  }
  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className="container">
            <Nav toggleTheme={toggleTheme} />
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={Popular} />
                <Route exact path="/battle" component={Battle} />
                <Route path="/battle/results" component={Results} />
                <Route render={() => <h1> 404</h1>} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
};

ReactDom.render(<App />, document.getElementById("app"));
