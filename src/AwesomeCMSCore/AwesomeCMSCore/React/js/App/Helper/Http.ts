import axios, { AxiosPromise } from "axios";
import qs from "qs";

import {
  APP_ENUM,
  StatusCode
} from "./AppEnum";
import {
  getStorage,
  setStorage
} from "./StorageHelper";
import { TOKEN_ENDPOINT } from "./API_Endpoint/AccountEndpoint";

export function Get(url: string): AxiosPromise<any> {
  const authHeader = initAuthHeaders();
  const config = {
    headers: {
      Authorization: "Bearer " + authHeader
    }
  };

  return axios.get(url, config);
}

export function Post(url, data) {
  const authHeader = initAuthHeaders();
  const config = {
    headers: {
      Authorization: "Bearer " + authHeader
    }
  };

  return axios.post(url, data, config);
}

export function PostWithSpinner(url, data) {
  return new Promise((resolve, reject) => {
    const authHeader = initAuthHeaders();
    const config = {
      headers: {
        Authorization: "Bearer " + authHeader
      }
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

export function PutWithSpinner(url, data) {
  return new Promise((resolve, reject) => {
    const authHeader = initAuthHeaders();
    const config = {
      headers: {
        Authorization: "Bearer " + authHeader
      }
    };

    this.setState({
      loading: true
    });

    axios
      .put(url, data, config)
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

export function Put(url, data) {
  const authHeader = initAuthHeaders();
  const config = {
    headers: {
      Authorization: "Bearer " + authHeader
    }
  };

  return axios.put(url, data, config);
}

export function Delete(url) {
  const authHeader = initAuthHeaders();
  const config = {
    headers: {
      Authorization: "Bearer " + authHeader
    }
  };

  return axios.delete(url, config);
}

function initAuthHeaders(): string {
  const token = getStorage(APP_ENUM.AuthToken);
  if (token != null) {
    return token.access_token;
	}
	
	return 
}

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const originalRequest = error.config;
  if (error.response.status === StatusCode.NotAuthorize) {
    const token = getStorage(APP_ENUM.AuthToken);
    const refreshToken = token.refresh_token;

    Post(
      TOKEN_ENDPOINT,
      qs.stringify({
        refresh_token: refreshToken,
        grant_type: "refresh_token",
        scope: "offline_access"
      })
    ).then(function (res) {
      let token = {
        access_token: res.data.access_token,
        refresh_token: refreshToken,
        token_type: res.data.token_type,
        expires_in: res.data.expires_in
      };

      setStorage(APP_ENUM.AuthToken, token);
      window.location.reload();
      return axios(originalRequest);

    }).catch(function (error) {
      console.log(error);
    });
  }

  return Promise.reject(error);
})