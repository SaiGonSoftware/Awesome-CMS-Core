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

  return axios.post(url, data, config).then(res => {
    if (res.status === statusCode.Success) toastr.success("Done");
    if (res.status === statusCode.BadRequest)
      toastr.error("Something went wrong please try again");
  });
}

function initAuthHeaders() {
  const token = getStorage(AppEnum.authToken);
  if (token != null) {
    return token.access_token;
  }
}
