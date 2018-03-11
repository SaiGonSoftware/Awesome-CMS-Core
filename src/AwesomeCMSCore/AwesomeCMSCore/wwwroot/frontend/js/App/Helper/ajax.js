import axios from "axios";

export function Get(url) {
  return axios.get(url);
}

export function Post(url, data) {
  return axios.post(url, data);
}
