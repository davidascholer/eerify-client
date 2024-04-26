import { useNavigate } from "react-router-dom";
import { PATHS } from "../../app-root/paths";

// Allows the user to navigate to refresh the current page.
const whiteList = [PATHS.USER_AUTH];

export const useHandleNavigate = () => {
  const navigate = useNavigate();
  return (path: string) => {
    if (location.pathname !== path) navigate(path);
    else if (whiteList.includes(path)) window.location.reload();
  };
};
