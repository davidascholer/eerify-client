import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import useLogin from "../../hooks/useLogin";
import EmailField from "../common/EmailField";
import PasswordField from "../common/PasswordField";
import ConfirmPasswordField from "../common/ConfirmPasswordField";
import SubmitButton from "../common/SubmitButton";
import { devDebug } from "../../util/helpers";
import { FormikObjectValuesProps } from "../../util/constants";
import useCreateUser from "../../hooks/useCreateUser";
import * as yup from "yup";

// Styles for the form fields
const styles = {
  field: {
    m: 1,
  },
};

// Validation types
export const emailValidation = yup
  .string()
  .email("Enter a valid email")
  .required("Email is required");

export const passwordValidation = yup
  .string()
  .min(8, "Password should be of minimum 8 characters length")
  .required("Password is required");

export const confirmPasswordValidation = yup
  .string()
  .oneOf([yup.ref("password")], "Passwords must match")
  .required("Password confirmation is required");

export const nullableValidation = yup.string().nullable().notRequired();

// Wrapper for the Formik form
const FormBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  border: `1px solid ${theme.colors.colorPalette.blue}`,
  borderRadius: "5px",
  width: "100%",
}));

// Create a component that displays an error message
const ErrorBox = ({ msg }: { msg: string }) => {
  return (
    <Box
      sx={[
        {
          color: "red",
          width: "100%",
          fontSize: "75%",
        },
        styles.field,
      ]}
    >
      {msg}
    </Box>
  );
};

type UserAuthFormProps = {
  propStyles?: object;
};
type UserResponseType = { data: any; status: any; error: any };
const defaultUser: FormikObjectValuesProps = {
  email: "",
  password: "",
  confirmPassword: "",
};
const defaultResponse = { data: null, status: null, error: null };

// User authentication form
export const UserAuthForm: React.FC<UserAuthFormProps> = ({ propStyles }) => {
  const navigate = useNavigate();
  const [validationSchema, setValidationSchema] = useState(
    yup.object({
      email: nullableValidation,
      password: nullableValidation,
      confirmPassword: nullableValidation,
    })
  );
  const [postData, setPostData] = useState<FormikObjectValuesProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const userLogin = useLogin(postData, false);
  const userCreate = useCreateUser(postData);
  const [userResponse, setUserResponse] =
    useState<UserResponseType>(defaultResponse);
  const [loginType, setLoginType] = useState<
    "FORGOT_PASSWORD" | "LOGIN" | "SIGNUP"
  >("LOGIN");

  /* Login */
  const handleSubmitLogin = async () => {
    const { email, password } = postData;
    if (!!email && !!password) {
      const loggedInUser = await userLogin.refetch();
      setUserResponse(loggedInUser);
      devDebug("handleSubmitLogin", loginType);
      navigate("/");
    }
  };

  /* Sign Up */
  const handleSubmitSignup = async () => {
    const { email, password } = postData;
    if (!!email && !!password) {
      const createdUser = await userCreate.refetch();
      setUserResponse(createdUser);
      devDebug("handleSubmitSignup", loginType);
      // navigate("/");
    }
  };

  /* Forgotten Password */
  const handleSubmitForgotPassword = () => {
    const { email } = postData;
    if (email) {
      devDebug("handleSubmitForgotPassword", loginType);
    }
  };

  // Set the initial validation schema. We cannot set this from the use initial state as type inferencing causes a but in Typescript that won't allow us to set nullable values to required values in different states.
  useEffect(() => {
    setValidationSchema(
      yup.object({
        email: emailValidation,
        password: passwordValidation,
        confirmPassword: nullableValidation,
      })
    );
  }, []);

  // Response of either the login, signup, or forgot password from the request
  // Runs whenever the submit button is clicked
  useEffect(() => {
    switch (loginType) {
      case "LOGIN":
        if (postData.email && postData.password) handleSubmitLogin();
        else setPostData(defaultUser);
        break;
      case "SIGNUP":
        if (postData.email && postData.password && postData.confirmPassword)
          handleSubmitSignup();
        else setPostData(defaultUser);
        break;
      case "FORGOT_PASSWORD":
        if (postData.email) handleSubmitForgotPassword();
        else setPostData(defaultUser);
        break;
      default:
        break;
    }

    // switch (userLogin.status) {
    //   case "loading":
    //     break;
    //   case "error":
    //     break;
    //   case "success":
    //     // Redirect to the root page
    //     navigate("/");
    //     break;
    //   default:
    //     break;
    // }
  }, [postData]);

  return (
    <Box sx={propStyles}>
      <Formik
        initialValues={defaultUser}
        validationSchema={validationSchema}
        onSubmit={(values: FormikObjectValuesProps) => setPostData(values)}
      >
        <FormBox>
          <Form style={{ width: "100%" }}>
            {/* Only show the email field if user has forgotten their password. */}
            <EmailField styles={styles.field} />
            {loginType === "LOGIN" && <PasswordField styles={styles.field} />}
            {loginType === "SIGNUP" && (
              <>
                <PasswordField styles={styles.field} />
                <ConfirmPasswordField styles={styles.field} />
              </>
            )}
            <SubmitButton styles={{ my: 2 }} />
            <ErrorBox
              msg={
                userResponse.error?.response?.data?.detail
                  ? userResponse.error.response.data.detail
                  : ""
              }
            />
          </Form>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            {loginType !== "LOGIN" && (
              <Button
                variant="text"
                onClick={() => {
                  setLoginType("LOGIN");
                  setValidationSchema(
                    yup.object({
                      email: emailValidation,
                      password: passwordValidation,
                      confirmPassword: nullableValidation,
                    })
                  );
                }}
              >
                Login
              </Button>
            )}
            {loginType !== "SIGNUP" && (
              <Button
                variant="text"
                onClick={() => {
                  setLoginType("SIGNUP");
                  setValidationSchema(
                    yup.object({
                      email: emailValidation,
                      password: passwordValidation,
                      confirmPassword: confirmPasswordValidation,
                    })
                  );
                }}
              >
                Sign Up
              </Button>
            )}
          </Box>
          {loginType !== "FORGOT_PASSWORD" && loginType !== "SIGNUP" && (
            <Button
              variant="text"
              onClick={() => {
                setLoginType("FORGOT_PASSWORD");
                setValidationSchema(
                  yup.object({
                    email: emailValidation,
                    password: nullableValidation,
                    confirmPassword: nullableValidation,
                  })
                );
              }}
            >
              Forgot Password
            </Button>
          )}
        </FormBox>
      </Formik>
    </Box>
  );
};
