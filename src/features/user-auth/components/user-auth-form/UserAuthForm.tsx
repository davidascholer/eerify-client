import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useLogin from "../../hooks/useLogin";
import EmailField from "../common/EmailField";
import PasswordField from "../common/PasswordField";
import ConfirmPasswordField from "../common/ConfirmPasswordField";
import SubmitButton from "../common/SubmitButton";
import { devDebug } from "../../util/helpers";
import { FormikObjectValuesProps } from "../../util/constants";
import useCreateUser from "../../hooks/useCreateUser";
import useVerifyEmail from "../../hooks/useVerifyEmail";
import * as yup from "yup";
import useSendResetPasswordEmail from "../../hooks/useSendResetPasswordEmail";
import useResendResetPasswordEmail from "../../hooks/useResendResetPasswordEmail";
import { PATHS } from "../../../../app-root/paths";

// Styles for the form fields
const styles = {
  field: {
    m: 1,
  },
};

const USER_NOT_ACTIVATED = "account is not activated";

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
          textAlign: "center",
          my: 2,
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
type UserResponseType = { data: object | unknown; error: string | unknown };
const defaultUser: FormikObjectValuesProps = {
  email: "",
  password: "",
  confirmPassword: "",
};
const defaultResponse = { data: {}, error: "" };

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
  const [loading, setLoading] = useState(false);
  const [activationEmailSent, setActivationEmailSent] = useState(false);
  const [postData, setPostData] = useState<FormikObjectValuesProps>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const userLogin = useLogin(postData);
  const userCreate = useCreateUser();
  const verifyEmail = useVerifyEmail();
  const sendResetPasswordEmail = useSendResetPasswordEmail();
  const resendResetPasswordEmail = useResendResetPasswordEmail();
  const [userResponse, setUserResponse] =
    useState<UserResponseType>(defaultResponse);
  const [loginType, setLoginType] = useState<
    "FORGOT_PASSWORD" | "LOGIN" | "SIGNUP"
  >("LOGIN");

  const sendActivationEmail = async () => {
    const response = await resendResetPasswordEmail(postData.email);
    devDebug("sendActivationEmail response", response);
    if (response.success) {
      // Happy path
      navigate(PATHS.USER_AUTH + "?message=Password reset email sent");
      location.reload();
    } else {
      setUserResponse({
        data: {},
        error: "Unable to send password reset email",
      });
    }
  };

  /* Login */
  const handleSubmitLogin = async () => {
    setLoading(true);
    const { email, password } = postData;
    if (!!email && !!password) {
      const response = await userLogin();
      devDebug("handleSubmitLogin response", response);
      if (response.success) {
        navigate(PATHS.ROOT);
      }
      setUserResponse({
        data: response.data,
        error: response.error,
      });
    }
    setLoading(false);
  };

  /* Sign Up */
  const handleSubmitSignup = async () => {
    setLoading(true);
    const { email, password } = postData;
    if (!!email && !!password) {
      const createdUser = await userCreate(email, password);
      if (createdUser.success) {
        setActivationEmailSent(true);
      } else {
        setUserResponse({
          data: {},
          error: createdUser.error,
        });
      }
    }
    setLoading(false);
  };

  /* Forgotten Password */
  const handleSubmitForgotPassword = async () => {
    setLoading(true);
    const { email } = postData;
    if (email) {
      const verifiedEmail = await verifyEmail(email);
      if (!verifiedEmail.success) {
        setUserResponse({
          data: {},
          error: "Email does not exist",
        });
        setLoading(false);
        return;
      } else {
        const isActive = verifiedEmail?.data?.is_active;
        if (typeof isActive === "boolean" && isActive === false) {
          setUserResponse({
            data: {},
            error: USER_NOT_ACTIVATED,
          });
          setLoading(false);
          return;
        }
      }

      const response = await sendResetPasswordEmail(email);
      if (response.success) {
        // Happy path
        navigate(PATHS.USER_AUTH + "?message=Password reset email sent");
        location.reload();
      } else {
        setUserResponse({
          data: {},
          error: "Unable to send password reset email",
        });
      }
    }
    setLoading(false);
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
  }, [postData]);

  if (activationEmailSent)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ m: 2, mb: 5 }}>
          An activation email has been sent to {postData.email}
        </Typography>
        <Typography sx={{ mb: 1, fontSize: "75%" }}>
          Didn't receive the email?
        </Typography>
        <Button
          sx={{ fontSize: "75%" }}
          variant="contained"
          onClick={sendActivationEmail}
        >
          Resend Activation Email
        </Button>
      </Box>
    );

  return (
    <Box sx={propStyles}>
      <Formik
        initialValues={defaultUser}
        validationSchema={validationSchema}
        onSubmit={(values: FormikObjectValuesProps) => {
          setPostData(values);
        }}
      >
        {/* optional props https://formik.org/docs/api/formik */}
        {() => (
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
              {loading ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    my: 2,
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <SubmitButton styles={{ my: 2 }} />
                  <ErrorBox
                    msg={
                      typeof userResponse.error === "string"
                        ? userResponse.error
                        : ""
                    }
                  />
                </>
              )}
            </Form>
            {typeof userResponse.error === "string" &&
              userResponse?.error?.toLowerCase() === USER_NOT_ACTIVATED && (
                <Button
                  sx={{ fontSize: "75%" }}
                  variant="text"
                  onClick={sendActivationEmail}
                >
                  Send Activation Email
                </Button>
              )}
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
        )}
      </Formik>
    </Box>
  );
};
