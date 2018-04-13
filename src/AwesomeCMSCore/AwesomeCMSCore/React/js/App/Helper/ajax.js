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

export function PostWithSpinner(url, data) {
  return new Promise((resolve, reject) => {
    const authHeader = initAuthHeaders();
    const config = {
      headers: { Authorization: "Bearer " + authHeader }
    };

    this.setState({
      loading: true
    });

    axios
      .post(url, data, config)
      .then(data => {
        this.setState({
          loading: false
        });
        resolve(data);
      })
      .catch(error => {
        this.setState({
          loading: false
        });
        reject(error);
      });
  });
}

function initAuthHeaders() {
  const token = getStorage(AppEnum.authToken);
  if (token != null) {
    return token.access_token;
  }
}
