import { useAppSelector } from "../lib/redux-toolkit/hooks";

export const useThemeMode = () =>
  useAppSelector((state) => state.settings.colorTheme);
