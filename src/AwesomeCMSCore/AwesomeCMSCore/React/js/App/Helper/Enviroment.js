import axios from "axios";

if (isDevEnviroment()) {
  axios.defaults.baseURL = "http://localhost:5000/";
} else {
  axios.defaults.baseURL = "prod url";
}

export function isDevEnviroment() {
  return process.env.NODE_ENV !== "production";
}