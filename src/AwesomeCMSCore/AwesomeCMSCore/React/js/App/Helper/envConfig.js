import axios from "axios";

let env = {};

env = {
  tokenUrl: "connect/token",
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ACC-api-versioning (#128)
  loginUrl: "api/v1/Account/Login",
  portal: "/Portal/Index",
  tagCreate: "api/v1/Tag/CreateTag",
  tag: "api/v1/Tag/GetTag",
  userList: "api/v1/Account/UserList",
  deactiveAccount: "api/v1/Account/ToggleAccountStatus",
  getUserRolesList: "api/v1/Account/UserRoles",
  addNewUser: "api/v1/Account/AddNewUser",
  validateDuplicateAccountInfo: "api/v1/Account/ValidateDuplicateAccountInfo"
<<<<<<< HEAD
=======
  loginUrl: "api/Account/Login",
  portal: "http://localhost:5000/Portal/Index",
  tagCreate: "api/Tag/CreateTag",
  tag: "api/Tag/GetTag",
  userList: "api/Account/UserList",
  deactiveAccount: "api/Account/ToggleAccountStatus",
  groupList: "api/Group/GroupList",
  getGroup: "api/Group/GetGroup",
  editGroup: "Group/EditGroup",
  getUserRolesList: "api/Account/RoleList",
  addNewGroup : "api/Group/CreateGroup"
>>>>>>> Create Group Completed
=======
>>>>>>> ACC-api-versioning (#128)
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
