import APIClient from "../../../lib/react-query/services/api-client";
import USER_ENDPOINTS from "../util/endpoints";
import { devDebug } from "../util/helpers";

// Create an  instance of the API client custom to create a user
const verifyEmailClient = () => {
  const url: string = `/${USER_ENDPOINTS.verifyEmail}`;
  const client = new APIClient(url);
  return client;
};

type UseVerifyEmailResponse = {
  status: number;
  data: { email?: string; is_active?: boolean; error: string };
};
/*
  Make a server call to the api to get create a user.
*/
const useVerifyEmail = () => {
  const client = verifyEmailClient();

  const verifyEmail = async (email: string) => {
    try {
      const response: UseVerifyEmailResponse = await client.post({
        email,
      });
      devDebug("useVerifyEmail response", response);
      if (response.status >= 200 && response.status < 209) {
        return {
          success: true,
          status: response.status,
          data: response.data,
        };
      } else {
        return {
          success: false,
          status: response.status,
          data: response.data,
        };
      }
    } catch (error) {
      devDebug("useVerifyEmail error", error);
      return { success: false, error: "invalid" };
    }
  };

  return verifyEmail;
};

export default useVerifyEmail;
