import { useState, useLayoutEffect } from 'react';
import TopAppBar from './TopAppBar';
import AppDrawer from './AppDrawer';

export default function NavBar() {

    const [size, setSize] = useState({width: 0, height: 0});
    const ratioOver3to2 = size.height / size.width >= 1.5;
    const [appDrawerOpen, setAppDrawerOpen] = useState<boolean>(false);
    const toggleAppDrawer = (dir:boolean | null) => dir == null ? setAppDrawerOpen(prevValue=>!prevValue) : setAppDrawerOpen(dir);

    useLayoutEffect(() => {
        function updateSize() {
          setSize({width: window.innerWidth, height: window.innerHeight});
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, []);
    
    return (
      <>
      <TopAppBar toggleAppDrawer={toggleAppDrawer}/>
      {ratioOver3to2 ?
      <AppDrawer appDrawerOpen={appDrawerOpen} toggleAppDrawer={toggleAppDrawer}/>
      :
      <></>
      }
      </>
    );
  }