import axios from "axios";
import { AppEnum } from "./appEnum";
import { getStorage } from "./storageHelper";
import statusCode from "./StatusCode";
import toastr from "toastr";

export function Get(url) {
  return axios.get(url);
}

export function Post(url, data) {
  const authHeader = initAuthHeaders();
  const config = {
    headers: { Authorization: "Bearer " + authHeader }
  };

  return axios.post(url, data, config);
}

function initAuthHeaders() {
  const token = getStorage(AppEnum.authToken);
  if (token != null) {
    return token.access_token;
  }
}
