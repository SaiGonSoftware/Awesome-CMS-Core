import axios from "axios";

let env = {};

env = {
  tokenUrl: "connect/token",
  loginUrl: "api/Account/Login",
  portal: "http://localhost:5000/Portal/Index",
  tagCreate: "api/Tag/CreateTag",
  tag: "api/Tag/GetTag",
  userList: "api/Account/UserList"
};

if (isDevEnviroment()) {
  axios.defaults.baseURL = "http://localhost:5000/";
}
/*  else {
  env = {
    baseUrl: "http://randomshit.com",
    tokenUrl: "http://randomshit.com/connect/token"
  }; } */

export default env;

export function isDevEnviroment() {
  return process.env.NODE_ENV !== "production";
}
