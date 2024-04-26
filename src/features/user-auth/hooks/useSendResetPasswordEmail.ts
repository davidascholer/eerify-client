import APIClient from "../../../lib/react-query/services/api-client";
import USER_ENDPOINTS from "../util/endpoints";
import { devDebug } from "../util/helpers";

// Create an  instance of the API client custom to create a user
const forgottenPasswordUserClient = () => {
  const url: string = `/${USER_ENDPOINTS.resetPassword}`;
  const client = new APIClient(url);
  return client;
};

/*
  Make a server call to the api to get create a user.
*/
const useSendResetPasswordEmail = () => {
  const client = forgottenPasswordUserClient();

  const sendForgottenPasswordEmail = async (email: string) => {
    const response = await client.post({ email });
    if (response.status === 204) {
      devDebug("useSendResetPasswordEmail response", response);
      return { success: true, error: "" };
    } else {
      return { success: false, error: response.data.message };
    }
  };

  return sendForgottenPasswordEmail;
};

export default useSendResetPasswordEmail;
