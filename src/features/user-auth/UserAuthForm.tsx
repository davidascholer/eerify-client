import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import useLoginQuery from "./hooks/useLoginQuery";
import ENDPOINTS from "./util/endpoints";
import useCookie from "../../lib/js-cookie/hooks/useCookie";
import EmailField from "./components/EmailField";
import PasswordField from "./components/PasswordField";
import SubmitButton from "./components/SubmitButton";
import { Formik } from "formik";

const styles = {
  container: {
    backgroundColor: "#fff",
    width: "300px",
    p: 5,
  },
};

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "5px",
});

export const UserAuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCookie = useCookie("app-auth");
  const refreshCookie = useCookie("app-refresh");

  const {
    refetch: loginRefetch,
    data: loginData,
    status: loginStatus,
    // isLoading: loginLoading,
    // error: loginError,
  } = useLoginQuery(ENDPOINTS.create, email, password);

  const handleLogin = (values: any) => {
    console.debug("Login Values:", values);
    // Handle login logic here (e.g., send credentials to server)
    // console.log("Email:", email);
    // console.log("Password:", password);
    //
    // saveCookies();
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
    // Disable eslint because we don't want to run this effect every time the cookies change are we are changing the cookies in the function.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);

  return (
    <Box sx={styles.container}>
      <Formik
        initialValues={{ password: "", verifyPassword: "" }}
        validate={(values) => {
          const errors: { [key: string]: string } = {};

          if (!values.password) {
            errors.password = "Password is required";
          }

          if (values.password !== values.verifyPassword) {
            errors.verifyPassword = "Passwords do not match";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        <FormContainer>
          <EmailField />
          <PasswordField onSubmit={handleLogin} />
          <SubmitButton />
        </FormContainer>
      </Formik>
    </Box>
  );
};
