import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import useCustomQuery from "../../lib/react-query/hooks/useCustomQuery";
import useCookie from "../../lib/js-cookie/hooks/useCookie";

const LoginFormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
});

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCookie = useCookie("app-auth");
  const refreshCookie = useCookie("app-refresh");

  const handleLogin = () => {
    // Handle login logic here (e.g., send credentials to server)
    // console.log("Email:", email);
    // console.log("Password:", password);
    //
    saveCookies();
  };

  const saveCookies = () => {
    // Save token to cookie
    authCookie.set("auth-token3");
    refreshCookie.set("app-refresh3");
  };

  const userQuery = useCustomQuery({}, ["auth", "users"]);

  if (userQuery.isError) {
    return (
      <>
        <Typography>auth {authCookie.value}</Typography>
        <Typography>refresh {refreshCookie.value}</Typography>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Typography sx={{ color: "red" }}>
          error: {JSON.stringify(userQuery.error)}
        </Typography>
      </>
    );
  }

  if (userQuery.isLoading) return <Typography>loading</Typography>;

  return (
    <LoginFormContainer>
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Typography color="textSecondary">
        JSON object:
        {JSON.stringify(userQuery.data)}
      </Typography>
    </LoginFormContainer>
  );
};

export default Login;
