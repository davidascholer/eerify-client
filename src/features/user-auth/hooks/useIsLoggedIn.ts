import { useAppSelector } from "../../../lib/redux-toolkit/hooks";

const useIsLoggedIn = () => !!useAppSelector((state) => state.user.email);

export default useIsLoggedIn;
