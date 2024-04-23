/* 
Hide sidebar if the endpoints is blacklisted.
Blacklisted endpoints are not allowed to be accessed through the sidebar.
*/

import { PATHS } from "../../app-root/paths";

const BLACKLISTED_ENDPOINTS = [PATHS.ACTIVATE_BASE, PATHS.PASSWORD_RESET_BASE];

export const isBlacklisted = (endpoint: string) => {
  return BLACKLISTED_ENDPOINTS.includes(endpoint);
};
