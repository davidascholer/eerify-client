import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import useLoginQuery from "../../hooks/useLoginQuery";
import ENDPOINTS from "../../util/endpoints";
import useCookie from "../../../../lib/js-cookie/hooks/useCookie";
import EmailField from "../common/EmailField";
import PasswordField from "../common/PasswordField";
import SubmitButton from "../common/SubmitButton";
import {
  FormikObjectProps,
  FormikObjectValuesProps,
  TOKEN_NAMES,
  validationSchema,
} from "../../util/constants";
import { Form, Formik, useFormik } from "formik";

// Styles for the form fields
const styles = {
  field: {
    m: 1,
    mt: 2,
  },
};

// Wrapper for the Formik form
const FormBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  border: "1px solid black",
  borderRadius: "5px",
  marginTop: "20px",
  width: "100%",
  maxWidth: "600px",
});

// Create a component that displays an error message
const ErrorBox = ({ msg }: { msg: string }) => {
  return (
    <>
      <Box
        sx={{
          color: "red",
          width: "100%",
          display: typeof msg === "object" ? "block" : "none",
        }}
      >
        {msg}
      </Box>
    </>
  );
};

// User authentication form
export const UserAuthForm = () => {
  const [postData, setPostData] = useState<FormikObjectValuesProps>({
    email: "1",
    password: "3",
  });
  const authCookie = useCookie(TOKEN_NAMES.auth);
  const refreshCookie = useCookie(TOKEN_NAMES.refresh);
  const {
    refetch: loginRefetch,
    data: loginData,
    status: loginStatus,
    error: loginError,
  } = useLoginQuery(ENDPOINTS.create, postData);

  const handleSubmit = (values: FormikObjectValuesProps) => {
    setPostData(values);
    loginRefetch();
  };

  useEffect(() => {
    if (loginData) {
      const { access, refresh } = loginData as {
        access: string;
        refresh: string;
      };
      if (access && refresh) {
        authCookie.set("JWT " + access);
        refreshCookie.set("JWT " + refresh);
      }
    }
    // Disable eslint because we don't want to run this effect every time the cookies change are we are changing the cookies in the function.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);

  useEffect(() => {
    console.debug("Login Status:", loginStatus);
  }, [loginStatus]);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <FormBox>
        <Form>
          <EmailField styles={styles.field} />
          <PasswordField styles={styles.field} />
          <SubmitButton styles={styles.field} />
          <ErrorBox msg={JSON.stringify(loginError)} />
        </Form>
      </FormBox>
    </Formik>
  );
};
