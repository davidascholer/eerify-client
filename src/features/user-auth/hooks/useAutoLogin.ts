import useGetUser from "./useGetUser";
import { SetStateAction, useEffect, useState } from "react";
import useVerifyToken from "./useVerifyToken";
import useRefreshToken from "./useRefreshToken";
import { VerifyTokenType } from "../util/constants";
import { devDebug } from "../util/helpers";
import { UseQueryResult } from "@tanstack/react-query";
import { userSetEmail } from "../../../redux/slices/userSlice";
import { UserState } from "../../../redux/types";
import { useAppDispatch } from "../../../lib/redux-toolkit/hooks";
import { isLoggedIn } from "../../../redux/helper";

/*
  This hook is used to automatically login the user when called from a component.
  It will check if the user has a valid auth token and refresh token.
  If the user has a valid auth token, it will fetch the user data.
  If the user has a valid refresh token, it will refresh the auth token. Then, fetch the user data.
  If the user has neither, it will silently do nothing (except return 4xx in network).

  NOTE: This hook should be called from a component after a check to make sure a user isn't already logged in to avoid redundancy.
*/
const useAutoLogin = (bypass = false) => {
  // Verify one of the auth tokens are valid. If not, don't attempt to sign in the user.

  const [userStatus, setUserStatus] = useState<
    "loading" | "error" | "success" | "idle"
  >("idle");
  const [userData, setUserData] = useState<UseQueryResult | undefined>(
    undefined
  );
  const [userError, setUserError] = useState<typeof getUserError | undefined>(
    undefined
  );
  const { data: verifyData } = useVerifyToken(true);
  const { refetch: refetchRefreshToken } = useRefreshToken();
  const {
    data: getUserData,
    status: getUserStatus,
    error: getUserError,
    refetch: refetchGetUser,
  } = useGetUser();
  const dispatch = useAppDispatch();

  // Validate the auth token. If it's invalid but the refresh token is valid, refresh the auth token.
  useEffect(() => {
    const data = (verifyData as { data: VerifyTokenType })?.data;
    if (!data) return;

    devDebug("useAutoLogin verifiedToken type", data.type);
    if (data.verified && data.type === "auth") {
      devDebug("useAutoLogin", "Auth token verified. Fetching user.");
      refetchGetUser();
    } else if (data.verified && data.type === "refresh") {
      devDebug(
        "useAutoLogin",
        "Refresh token verified. Refreshing Auth Token."
      );
      // Refetch the user data when the auth token is refreshed.
      refetchRefreshToken().then((res) => {
        const status: number = (res.data as { status: number })?.status;
        if (status === 200) refetchGetUser();
        else devDebug("useAutoLogin refreshTokenStatus error", res);
      });
    }
    // else do nothing. Keep the user in the logged out state as all tokens have expired.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyData]);

  useEffect(() => {
    switch (getUserStatus) {
      case "loading":
        break;
      case "error":
        devDebug("useAutoLogin getUserError ", getUserError);
        break;
      case "success":
        // eslint-disable-next-line no-case-declarations
        const getData = getUserData as {
          response: { status: number } | undefined;
          status: number;
          message: string;
          data: UserState;
        };
        if (getData.status === 200) {
          devDebug("useAutoLogin getUserData status", getData.status);
          devDebug(
            "useAutoLogin getUserData getData?.data?.email",
            getData?.data?.email
          );
          dispatch(userSetEmail(getData?.data?.email));
          setUserData(
            getUserData as SetStateAction<UseQueryResult | undefined>
          );
        } else {
          devDebug(
            "useAutoLogin getUserData status ",
            getData.response?.status
          );
          devDebug("useAutoLogin getUserData message", getData.message);
          devDebug("useAutoLogin getUserData", getData);
          setUserError(getUserData);
        }
        break;
      default:
        break;
    }

    setUserStatus(getUserStatus);
    setUserError(getUserError);
  }, [getUserStatus, getUserData, getUserError]);

  // If there is a user in the redux store or some other condition, don't attempt to login the user.
  if (isLoggedIn() || bypass) return;

  return {
    data: userData?.data,
    status: userStatus,
    error: userError,
  };
};

export default useAutoLogin;
