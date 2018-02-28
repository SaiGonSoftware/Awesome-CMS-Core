import axios from "axios";

let env = {};

if (isDevEnviroment()) {
  env = {
    baseUrl: "http://randomshit.com",
    tokenUrl: "http://randomshit.com/connect/token"
  };
} else {
  env = {
    tokenUrl: "connect/token",
    loginUrl: "Account/Login",
    portal: "http://localhost:5000/Portal/Index"
  };
  axios.defaults.baseURL = "http://localhost:5000/";
}

export default env;

export function isDevEnviroment() {
  return process.env.NODE_ENV === "development";
}
