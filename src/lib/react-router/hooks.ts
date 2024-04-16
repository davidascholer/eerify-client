import { useNavigate } from "react-router-dom";

export const useHandleNavigate = () => {
  const navigate = useNavigate();
  return (path: string) => {
    if (location.pathname !== path) navigate(path);
  };
};
