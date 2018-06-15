import axios from "axios";
let env = {};

env = {
  tokenUrl: "connect/token",
  loginUrl: "api/v1/Account/Login",
  login: "/Account/Login",
  portal: "/Portal/Index",
  tagCreate: "api/v1/PostOptions/CreateTag",
  tag: "api/v1/PostOptions/Tag",
  categoriesCreate: "api/v1/PostOptions/CreateCategories",
  categories: "api/v1/PostOptions/Categories",
  userList: "api/v1/Account/UserList",
  deactiveAccount: "api/v1/Account/ToggleAccountStatus",
  getUserRolesList: "api/v1/Roles",
  getUserRolesById: "api/v1/Roles",
  addNewUser: "api/v1/Account/AddNewUser",
  addUserRoles: "api/v1/Account/AddUserRoles",
  editUserRoles: "api/v1/Roles/EditUserRoles",
  manageRole: "api/v1/Account/ManageRoles",
  validateDuplicateAccountInfo: "api/v1/Account/ValidateDuplicateAccountInfo",
  forgotPassword: "api/v1/Account/ForgotPassword",
  resetPassword: "api/v1/Account/ResetPassword"
};

export const ROLE_API_PATH =  "/api/v1/roles";

if (isDevEnviroment()) {
  axios.defaults.baseURL = "http://localhost:5000/";
} else {
  axios.defaults.baseURL = "prod url";
}

export default env;

export function isDevEnviroment() {
  return process.env.NODE_ENV !== "production";
}