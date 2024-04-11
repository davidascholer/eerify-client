import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import useLogin from "../../hooks/useLogin";
import EmailField from "../common/EmailField";
import PasswordField from "../common/PasswordField";
import SubmitButton from "../common/SubmitButton";
import { validationSchema } from "../../util/helpers";
import { FormikObjectValuesProps } from "../../util/constants";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

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
        sx={[
          styles.field,
          {
            color: "red",
            width: "100%",
            fontSize: "80%",
            // display: typeof msg === "object" ? "block" : "none",
          },
        ]}
      >
        {msg}
      </Box>
    </>
  );
};

// User authentication form
export const UserAuthForm = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<FormikObjectValuesProps>({
    email: "",
    password: "",
  });
  const [runLoginQuery, setRunLoginQuery] = useState<boolean>(false);
  const {
    // refetch: loginRefetch,
    data: loginData,
    status: loginStatus,
    error: loginError,
  }: { data: any; status: any; error: any } = useLogin(postData, runLoginQuery);

  const handleSubmit = (values: FormikObjectValuesProps) => {
    const { email, password } = values;
    if (!!email && !!password) {
      setPostData({ email, password });
    } else {
      setRunLoginQuery(false);
      setPostData({ email: "", password: "" });
    }
    setRunLoginQuery(true);
  };

  // const handleCreateUser = (values: FormikObjectValuesProps) => {
  //   const { email, password } = values;
  //   setEmail(email);
  //   setPassword(password);
  //   if (password === verifyPassword) loginRefetch();
  // };

  useEffect(() => {
    switch (loginStatus) {
      case "loading":
        break;
      case "error":
        setRunLoginQuery(false);
        break;
      case "success":
        setRunLoginQuery(false);
        // Redirect to the root page
        navigate("/");
        break;
      default:
        break;
    }
    // Disable eslint because we don't want to run this effect every time the cookies change are we are changing the cookies in the function.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus]);

  // useEffect(() => {
  //   const data = loginData as FormikObjectValuesProps;
  //   if (typeof data?.email === "string" && typeof data?.password === "string")
  //     loginRefetch();
  // }, [loginData, loginRefetch]);

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
          <ErrorBox
            msg={
              loginError?.response?.data?.detail
                ? loginError.response.data.detail
                : ""
            }
          />
        </Form>
      </FormBox>
    </Formik>
  );
};
