import useReactQuery from "../../../lib/react-query/useReactQuery";
import APIClient from "../../../lib/react-query/services/api-client";
import USER_ENDPOINTS from "../util/endpoints";

// Create an  instance of the API client custom to reset a password
const loginClient = () => {
  const url: string = `/${USER_ENDPOINTS.resetPassword}`;
  const client = new APIClient(url);
  return client;
};

/*
  Make a server call to the api to reset a password.
*/
const useResetPassword = (uuid: string, email: string, runOnMount: boolean) => {
  const client = loginClient();

  const resetPassword = async () => {
    const response = await client.post({ uid: uuid, token: email });
    if (response.status === 200) {
      // Do something in needed.
    } else {
      return new Error("Unable to reset password.");
    }
    return response;
  };

  return useReactQuery({
    queryKey: USER_ENDPOINTS.resetPassword.split("/"),
    queryFn: resetPassword,
    enabled: runOnMount,
  });
};

export default useResetPassword;
