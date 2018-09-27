import axios from "axios";

export function isDevEnviroment() {
  return process.env.NODE_ENV !== "production";
}

if (isDevEnviroment()) {
  axios.defaults.baseURL = "http://localhost:5000/";
} else {
  axios.defaults.baseURL = "http://localhost:5000/";
}

