import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";
// import store from "./store";
import App from "./App";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   {/* <Provider store={store}> */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
    </ThemeProvider>
  {/* </Provider> */}
  </React.StrictMode>,
)
