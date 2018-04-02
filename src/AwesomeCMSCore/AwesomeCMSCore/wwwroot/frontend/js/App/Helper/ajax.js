import axios from "axios";
import { AppEnum } from "./appEnum";
import { getStorage } from "./storageHelper";

export function Get(url) {
  const authHeader = initAuthHeaders();
  const config = {
    headers: { Authorization: "Bearer " + authHeader }
  };

  return axios.get(url, config);
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
