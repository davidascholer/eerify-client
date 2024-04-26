import APIClient from "../../../lib/react-query/services/api-client";
import USER_ENDPOINTS from "../util/endpoints";
import { serverErrorValidated, handleServerResponse } from "../util/helpers";

// Create an  instance of the API client custom to create a user
const resetPasswordClientClient = () => {
  const url: string = `/${USER_ENDPOINTS.resetPasswordConfirm}`;
  const client = new APIClient(url);
  return client;
};

/*
  Make a server call to the api to get create a user.
*/
const useResetPasswordConfirm = () => {
  const client = resetPasswordClientClient();

  const resetPasswordClient = async (
    uid: string,
    token: string,
    password: string
  ) => {
    try {
      const response = await client.post({
        uid: uid,
        token: token,
        new_password: password,
      });
      return handleServerResponse(response);
    } catch (error: Error | unknown | any) {
      return {
        success: false,
        error: serverErrorValidated(error?.response?.data),
      };
    }
  };

  return resetPasswordClient;
};

export default useResetPasswordConfirm;
