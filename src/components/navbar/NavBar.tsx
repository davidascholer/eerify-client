import { useState, useLayoutEffect, useEffect } from "react";
import TopAppBar from "./TopAppBar";
import AppDrawer from "./AppDrawer";
import { useAppSelector, useAppDispatch } from "../../lib/redux-toolkit/hooks";
import { setOrientation } from "../../redux/slices/settingsSlice";

export default function NavBar() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ratioOver3to2 = size.height / size.width >= 1.5;
  const [appDrawerOpen, setAppDrawerOpen] = useState<boolean>(false);
  const toggleAppDrawer = (dir: boolean | null) =>
    dir == null
      ? setAppDrawerOpen((prevValue) => !prevValue)
      : setAppDrawerOpen(dir);
  const orientation = useAppSelector((state) => state.settings.orientation);
  const dispatch = useAppDispatch();

  // Set up and destroy a listener for orientation change
  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Dispatch the new orientation if changed
  useEffect(() => {
    dispatch(setOrientation(ratioOver3to2 ? "vertical" : "horizontal"));
  }, [dispatch, ratioOver3to2]);

  return (
    <>
      <TopAppBar toggleAppDrawer={toggleAppDrawer} />
      {orientation === "vertical" ? (
        <AppDrawer
          appDrawerOpen={appDrawerOpen}
          toggleAppDrawer={toggleAppDrawer}
        />
      ) : (
        <AppDrawer
          appDrawerOpen={appDrawerOpen}
          toggleAppDrawer={toggleAppDrawer}
        />
      )}
    </>
  );
}
