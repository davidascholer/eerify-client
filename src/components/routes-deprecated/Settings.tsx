import { useAppSelector, useAppDispatch } from "../../lib/redux-toolkit/hooks";
import { setColorTheme } from "../../redux/slices/settingsSlice";
import { Switch } from "../ui/switch";

const Settings = () => {
  const colorTheme = useAppSelector((state) => state.settings.colorTheme);
  const dispatch = useAppDispatch();
  const isDarkTheme = colorTheme === "dark";

  const togglecolorTheme = () => {
    dispatch(setColorTheme(isDarkTheme ? "light" : "dark"));
  };

  return (
    <div className="flex flex-col justify-between min-h-full w-full">
      <div className="w-full">
        <div>
          <h2 className="text-center mt-2">Settings</h2>
          <div className="border-t m-2" />
        </div>
        <div className="mx-5 my-2">
          <div className="flex flex-row items-center">
            <div className="mr-10">
              <p>Color Mode</p>
            </div>
            <div className="mr-10 flex items-center gap-3">
              <Switch
                aria-label="Color Mode"
                checked={isDarkTheme}
                onCheckedChange={togglecolorTheme}
                className="bg-primary"
              />
              <span className="text-sm">{isDarkTheme ? "DARK" : "LIGHT"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center m-1 text-[0.8rem]">
        {(() => {
          const version =
            (import.meta.env.VITE_APP_VERSION as string | undefined) ??
            (typeof APP_VERSION !== "undefined" ? APP_VERSION : "0.0.0");
          return `v${version}`;
        })()}
      </div>
    </div>
  );
};

export default Settings;
