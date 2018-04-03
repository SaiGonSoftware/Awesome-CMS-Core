import axios from "axios";

let env = {};

if (isDevEnviroment()) {
  env = {
    tokenUrl: "connect/token",
    loginUrl: "api/Account/Login",
    portal: "http://localhost:5000/Portal/Index",
    tagCreate: "api/Tag/CreateTag",
    tag: "api/Tag/GetTag"
  };
  axios.defaults.baseURL = "http://localhost:5000/";
} else {
  env = {
    baseUrl: "http://randomshit.com",
    tokenUrl: "http://randomshit.com/connect/token"
  };
}

export default env;

export function isDevEnviroment() {
  return process.env.NODE_ENV !== "production";
}
