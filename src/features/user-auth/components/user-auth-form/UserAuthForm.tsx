import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import useLogin from "../../hooks/useLogin";
import { devDebug } from "../../util/helpers";
import { AuthFormValues } from "../../util/constants";
import useCreateUser from "../../hooks/useCreateUser";
import useVerifyEmail from "../../hooks/useVerifyEmail";
import useSendResetPasswordEmail from "../../hooks/useSendResetPasswordEmail";
import useResendResetPasswordEmail from "../../hooks/useResendResetPasswordEmail";
import { PATHS } from "../../../../app/paths";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const USER_NOT_ACTIVATED = "account is not activated";

// Zod schema with conditional requirements based on loginType
const baseSchema = z.object({
  loginType: z.enum(["FORGOT_PASSWORD", "LOGIN", "SIGNUP"]),
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8, { message: "Password should be of minimum 8 characters length" }).optional().or(z.literal("")),
  confirmPassword: z.string().optional().or(z.literal("")),
});

const authSchema = baseSchema.superRefine((data, ctx) => {
  if (data.loginType === "LOGIN") {
    if (!data.password || data.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required",
        path: ["password"],
      });
    }
  }
  if (data.loginType === "SIGNUP") {
    if (!data.password || data.password.length < 8) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Password is required", path: ["password"] });
    }
    if (!data.confirmPassword) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Password confirmation is required", path: ["confirmPassword"] });
    } else if (data.password !== data.confirmPassword) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Passwords must match", path: ["confirmPassword"] });
    }
  }
});

// Create a component that displays an error message
const ErrorBox = ({ msg }: { msg: string }) => {
  if (!msg) return null;
  return <div className="text-destructive text-center text-xs my-2 w-full">{msg}</div>;
};

type UserAuthFormProps = {
  propStyles?: object;
};
type UserResponseType = { data: object | unknown; error: string | unknown };
const defaultUser: AuthFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};
const defaultResponse = { data: {}, error: "" };

// User authentication form
export const UserAuthForm: React.FC<UserAuthFormProps> = ({ propStyles }) => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<"FORGOT_PASSWORD" | "LOGIN" | "SIGNUP">("LOGIN");
  const formResolver = useMemo(() => zodResolver(authSchema), []);
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: formResolver,
    defaultValues: {
      loginType,
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });
  const [loading, setLoading] = useState(false);
  const [activationEmailSent, setActivationEmailSent] = useState(false);
  const [postData, setPostData] = useState<AuthFormValues>({
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

  // Keep loginType in form state so schema can validate conditionally
  useEffect(() => {
    form.setValue("loginType", loginType, { shouldValidate: false });
    // Clear errors when switching modes
    form.clearErrors();
  }, [loginType]);

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
      <div className="flex flex-col items-center justify-center">
        <div className="my-2 mb-5 text-sm">
          An activation email has been sent to {postData.email}
        </div>
        <div className="mb-2 text-xs opacity-80">Didn't receive the email?</div>
        <Button size="sm" onClick={sendActivationEmail}>Resend Activation Email</Button>
      </div>
    );

  return (
    <div className="w-full" style={propStyles as any}>
      <div className="flex flex-col items-center p-5 border rounded-md w-full">
        <Form {...form}>
          <form
            className="w-full space-y-3"
            onSubmit={form.handleSubmit((values) => {
              setPostData({
                email: values.email,
                password: values.password || "",
                confirmPassword: values.confirmPassword || "",
              });
            })}
          >
            <FormField
              control={form.control}
              name="email"
                render={({ field }: { field: ControllerRenderProps<any, any> }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(loginType === "LOGIN" || loginType === "SIGNUP") && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }: { field: ControllerRenderProps<any, any> }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="off" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {loginType === "SIGNUP" && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }: { field: ControllerRenderProps<any, any> }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" autoComplete="off" placeholder="Confirm Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
              />
            )}

            <input type="hidden" {...form.register("loginType")} value={loginType} />

            {loading ? (
              <div className="flex w-full justify-center my-2">
                <Loader2 className="size-5 animate-spin" />
              </div>
            ) : (
              <Button type="submit" className="w-full">
                {loginType === "LOGIN" && "Login"}
                {loginType === "SIGNUP" && "Sign Up"}
                {loginType === "FORGOT_PASSWORD" && "Send Reset Email"}
              </Button>
            )}
            <ErrorBox msg={typeof userResponse.error === "string" ? userResponse.error : ""} />
          </form>
        </Form>

        {typeof userResponse.error === "string" &&
          userResponse?.error?.toLowerCase() === USER_NOT_ACTIVATED && (
            <Button variant="ghost" size="sm" onClick={sendActivationEmail}>
              Send Activation Email
            </Button>
          )}

        <div className="flex w-full justify-evenly mt-2">
          {loginType !== "LOGIN" && (
            <Button variant="ghost" size="sm"
              onClick={() => {
                setLoginType("LOGIN");
              }}
            >
              Login
            </Button>
          )}
          {loginType !== "SIGNUP" && (
            <Button variant="ghost" size="sm"
              onClick={() => {
                setLoginType("SIGNUP");
              }}
            >
              Sign Up
            </Button>
          )}
        </div>
        {loginType !== "FORGOT_PASSWORD" && loginType !== "SIGNUP" && (
          <Button variant="ghost" size="sm" onClick={() => setLoginType("FORGOT_PASSWORD")}>Forgot Password</Button>
        )}
      </div>
    </div>
  );
};
