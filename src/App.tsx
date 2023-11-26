import { useState } from 'react'
import reactLogo from './assets/image/tree.jpeg'
import './App.css'
import TopAppBar from './components/navbars/TopAppBar'
import { CssBaseline, ThemeProvider, Typography } from '@mui/material'
// import store from "./store";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
import lightTheme from "./theme";
// import {darkTheme} from "./theme";
import AppDrawer from './components/navbars/AppDrawer';

function Temp() {

  const [appDrawerOpen, setAppDrawerOpen] = useState<boolean>(false);
  const toggleAppDrawer = (dir:boolean | null) => dir == null ? setAppDrawerOpen(prevValue=>!prevValue) : setAppDrawerOpen(dir);
 
  return (
    <div>
      <TopAppBar toggleAppDrawer={toggleAppDrawer}/>
      <AppDrawer appDrawerOpen={appDrawerOpen} toggleAppDrawer={toggleAppDrawer}/>
      <div>
          <img style={{width:"50vw",height:"50vw"}} src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <Typography>Horror Hallow</Typography>
      <div>
          <img style={{width:"50vw",height:"50vw"}} src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <Typography>Horror Hallow</Typography>
      <div>
          <img style={{width:"50vw",height:"50vw"}} src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <Typography>Horror Hallow</Typography>
      <div>
          <img style={{width:"50vw",height:"50vw"}} src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <Typography>Horror Hallow</Typography>
      <div>
          <img style={{width:"50vw",height:"50vw"}} src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <Typography>Horror Hallow</Typography>
      <div>
          <img style={{width:"50vw",height:"50vw"}} src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <Typography>Horror Hallow</Typography>
      <div>
          <img style={{width:"50vw",height:"50vw"}} src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <Typography>Horror Hallow</Typography>
      <div>
          <img style={{width:"50vw",height:"50vw"}} src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <Typography>Horror Hallow</Typography>

    </div>
  )
}

function App() {

  return (
    <div>
       {/* <Provider store={store}> */}
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {/* <BrowserRouter> */}
            <Temp></Temp>
          {/* </BrowserRouter> */}
        </ThemeProvider>
      {/* </Provider> */}
      </div>
      )
}

export default App

