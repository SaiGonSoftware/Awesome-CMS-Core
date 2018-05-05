import axios from "axios";
let env = {};

env = {
  tokenUrl: "connect/token",
  loginUrl: "api/v1/Account/Login",
  portal: "/Portal/Index",
  tagCreate: "api/v1/PostOptions/CreateTag",
  tag: "api/v1/PostOptions/Tag",
  categoriesCreate: "api/v1/PostOptions/CreateCategories",
  categories: "api/v1/PostOptions/Categories",
  userList: "api/v1/Account/UserList",
  deactiveAccount: "api/v1/Account/ToggleAccountStatus",
  getUserRolesList: "api/v1/Account/UserRoles",
  getUserRolesById: "api/v1/Account/GetUserRolesById",
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