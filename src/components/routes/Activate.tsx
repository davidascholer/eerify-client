/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, type PropsWithChildren } from "react";
import { Box, Button, CircularProgress, Link, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import EerifyLogo from "../../assets/icons/EerifyLogo";
import useUserActivation from "../../features/user-auth/hooks/useUserActivation";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../app-root/paths";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 280,
    height: 280,
    m: 3,
  },
};

const Activate: React.FC<PropsWithChildren> = () => {
  const { uid, token } = useParams();
  const activateUser = useUserActivation();
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const [activationSuccessful, setActivationSuccessful] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const activate = async () => {
      // If the uid and token are not valid string, the router will go to a 404 page
      if (typeof uid === "string" && typeof token === "string") {
        const result = await activateUser(uid, token);
        setActivationSuccessful(result.success);
        setMessage(result.message);
      }
    };

    activate();

    // necessary to only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={styles.container}>
      <Link href="/">
        <EerifyLogo sx={styles.image} />
      </Link>
      {activationSuccessful === null ? (
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
      ) : null}
      {activationSuccessful === false ? (
        <>
          <Typography sx={{ m: 2 }}>{message}</Typography>
          <Button onClick={() => navigate(PATHS.USER_AUTH)}>
            Login To Resend Activation Email
          </Button>
        </>
      ) : null}
      {activationSuccessful === true ? (
        <>
          <Typography sx={{ m: 2 }}>{message}</Typography>
          <Button variant="contained" onClick={() => navigate(PATHS.USER_AUTH)}>
            Login
          </Button>
        </>
      ) : null}
    </Box>
  );
};

export default Activate;
