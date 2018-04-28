import axios from "axios";

let env = {};

env = {
  tokenUrl: "connect/token",
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
