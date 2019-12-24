import React, { createContext } from "react";

const ThemeContext = createContext();

const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

export default ThemeContext;
export {
  ThemeProvider,
  ThemeConsumer
};
