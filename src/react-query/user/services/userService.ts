import { UserType, UserQueryType } from "../models/userTypes";
import APIClient from "../../services/api-client";

export default new APIClient<UserType | UserQueryType>("/auth/users/me/");
