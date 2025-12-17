import React from "react";
import UserAuthPage from "../../features/user-auth/pages/UserAuthPage";
import EerifyLogo from "../../assets/icons/EerifyLogo";

const styles = {
  width: "100%",
  objectFit: "contain",
  minWidth: "300px",
  maxWidth: "800px",
};

const UserAuth: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center m-2">
      <EerifyLogo style={{ width: "300px", height: "300px", margin: 20, marginBottom: 40 }} />
      <UserAuthPage propStyles={styles} />
    </div>
  );
};

export default UserAuth;
