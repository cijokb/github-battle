import React, { createContext } from "react";

const { Consumer, Provider } = createContext();

const ThemeProvider = Provider;
const ThemeConsumer = Consumer;

export {
  ThemeProvider,
  ThemeConsumer
};
