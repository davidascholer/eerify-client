import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { Theme } from "@mui/material/styles";
import { Button, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import PasswordField from "../../features/user-auth/components/common/PasswordField";
import ConfirmPasswordField from "../../features/user-auth/components/common/ConfirmPasswordField";
import SubmitButton from "../../features/user-auth/components/common/SubmitButton";
import useResetPasswordConfirm from "../../features/user-auth/hooks/useResetPasswordConfirm";
import EerifyLogo from "../../assets/icons/EerifyLogo";
import { PATHS } from "../../app-root/paths";
import CenteredCircularProgress from "../loading/CenteredCircularProgress";

// Styles for the form fields
const styles = {
  field: {
    m: 1,
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    m: 3,
    p: 1,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: "500px",
    m: 3,
  },
  image: {
    width: 280,
    height: 280,
    m: 3,
  },
};

// Validation types
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

type UserValueType = { password: string; confirmPassword: string };
type UserResponseType = { success: boolean | undefined; error: string };
const defaultUser: UserValueType = {
  password: "",
  confirmPassword: "",
};
const defaultResponse: UserResponseType = { success: undefined, error: "" };

// User authentication form
const PasswordReset: React.FC = () => {
  const resetPasswordConfirm = useResetPasswordConfirm();
  const { uid, token } = useParams();
  const [loading, setLoading] = useState(false);
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const [userResponse, setUserResponse] =
    useState<UserResponseType>(defaultResponse);
  const navigate = useNavigate();

  /* Login */
  const handleSubmit = async (password: string) => {
    setLoading(true);
    setUserResponse(defaultResponse);
    if (typeof uid === "string" && typeof token === "string") {
      const response = await resetPasswordConfirm(uid, token, password);
      if (response.success) {
        // Happy path
        setResetSuccessful(true);
      } else {
        setUserResponse({ success: response.success, error: response.error });
      }
    }
    setLoading(false);
  };

  return (
    <Box sx={styles.container}>
      <Link href="/">
        <EerifyLogo sx={styles.image} />
      </Link>
      <Box sx={styles.innerContainer}>
        {resetSuccessful === true ? (
          <>
            <Typography sx={{ m: 2 }}>Password Updated Successfully</Typography>
            <Button
              variant="contained"
              onClick={() => navigate(PATHS.USER_AUTH)}
            >
              Login
            </Button>
          </>
        ) : (
          <Formik
            initialValues={defaultUser}
            validationSchema={yup.object({
              password: passwordValidation,
              confirmPassword: nullableValidation,
            })}
            onSubmit={(values: UserValueType) => handleSubmit(values.password)}
          >
            {() => (
              <FormBox>
                <Form style={{ width: "100%" }}>
                  <PasswordField styles={styles.field} />
                  <ConfirmPasswordField styles={styles.field} />

                  {loading ? (
                    <CenteredCircularProgress />
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
              </FormBox>
            )}
          </Formik>
        )}
      </Box>
    </Box>
  );
};

export default PasswordReset;
