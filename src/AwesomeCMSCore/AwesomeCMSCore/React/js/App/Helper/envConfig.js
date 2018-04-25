import axios from "axios";

let env = {};

env = {
  tokenUrl: "connect/token",
  loginUrl: "api/v1/Account/Login",
  portal: "/Portal/Index",
  tagCreate: "api/v1/Tag/CreateTag",
  tag: "api/v1/Tag/GetTag",
  userList: "api/v1/Account/UserList",
  deactiveAccount: "api/v1/Account/ToggleAccountStatus",
  getUserRolesList: "api/v1/Account/UserRoles",
  addNewUser: "api/v1/Account/AddNewUser",
  validateDuplicateAccountInfo: "api/v1/Account/ValidateDuplicateAccountInfo"
};

if (isDevEnviroment()) {
  axios.defaults.baseURL = "http://localhost:5000/";
} else {
  axios.defaults.baseURL = "prod url";
}

export default env;

export function isDevEnviroment() {
  return process.env.NODE_ENV !== "production";
}
