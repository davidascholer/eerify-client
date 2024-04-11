import useGetUser from "./useGetUser";
import { SetStateAction, useEffect, useState } from "react";
import useVerifyToken from "./useVerifyToken";
import useRefreshToken from "./useRefreshToken";
import { VerifyTokenType } from "../util/constants";
import { devDebug } from "../util/helpers";
import { UseQueryResult } from "@tanstack/react-query";

/*
  This hook is used to automatically login the user when called from a component.
  It will check if the user has a valid auth token and refresh token.
  If the user has a valid auth token, it will fetch the user data.
  If the user has a valid refresh token, it will refresh the auth token. Then, fetch the user data.
  If the user has neither, it will silently do nothing (except return 4xx in network).

  NOTE: This hook should be called from a component after a check to make sure a user isn't already logged in to avoid redundancy.
*/
const useAutoLogin = () => {
  // Verify one of the auth tokens are valid. If not, don't attempt to sign in the user.
  const { data: verifyData } = useVerifyToken(true);
  const { status: refreshTokenStatus, refetch: refretchRefreshToken } =
    useRefreshToken();
  const {
    data: getUserData,
    status: getUserStatus,
    error: getUserError,
    refetch: refetchGetUser,
  } = useGetUser();

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
      refretchRefreshToken();
    }
    // else do nothing. Keep the user in the logged out state as all tokens have expired.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyData]);

  useEffect(() => {
    devDebug("useAutoLogin useRefreshTokenStatus changed", refreshTokenStatus);
    if (refreshTokenStatus === "success") {
      devDebug("useAutoLogin", "Auth token refreshed. Fetching user.");
      refetchGetUser();
    } else {
      devDebug(
        "useAutoLogin error",
        "Failed updating auth token from validated refresh token."
      );
    }
  }, [refetchGetUser, refreshTokenStatus]);

  const [userStatus, setUserStatus] = useState<
    "loading" | "error" | "success" | "idle"
  >("idle");
  const [userData, setUserData] = useState<UseQueryResult | undefined>(
    undefined
  );
  const [userError, setUserError] = useState<typeof getUserError | undefined>(
    undefined
  );

  useEffect(() => {
    setUserStatus(getUserStatus);
    setUserData(getUserData as SetStateAction<UseQueryResult | undefined>);
    setUserError(getUserError);
  }, [getUserStatus, getUserData, getUserError]);

  return {
    data: userData?.data,
    status: userStatus,
    error: userError,
  };
};

export default useAutoLogin;
