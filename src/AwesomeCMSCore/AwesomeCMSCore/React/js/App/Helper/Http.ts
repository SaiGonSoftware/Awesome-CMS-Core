import axios, { AxiosPromise, AxiosResponse } from "axios";
import qs from "qs";

import {
  AppEnum,
  StatusCode
} from "./AppEnum";
import {
  getStorage,
  setStorage
} from "./StorageHelper";
import { TOKEN_ENDPOINT } from "./API_Endpoint/AccountEndpoint";
import { ITokenProp } from "@app/Helper/Models/Token";

export function Get(url: string): AxiosPromise<any> {
  const authHeader: ITokenProp = initAuthHeaders();
  const config: object = {
    headers: {
      Authorization: "Bearer " + authHeader
    }
  };

  return axios.get(url, config);
}

export function Post(url: string, data: any): AxiosPromise<any> {
  const authHeader: ITokenProp = initAuthHeaders();
  const config: any = {
    headers: {
      Authorization: "Bearer " + authHeader
    }
  };

  return axios.post(url, data, config);
}

export function PostWithSpinner(url: string, data: any): AxiosPromise<any> {
  return new Promise((resolve: any, reject: any) => {
    const authHeader: ITokenProp = initAuthHeaders();
    const config: object = {
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

export function PutWithSpinner(url: string, data: any): AxiosPromise<any> {
  return new Promise((resolve, reject) => {
    const authHeader: ITokenProp = initAuthHeaders();
    const config: object = {
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

export function Put(url: string, data: any): AxiosPromise<any> {
  const authHeader: ITokenProp = initAuthHeaders();
  const config: object = {
    headers: {
      Authorization: "Bearer " + authHeader
    }
  };

  return axios.put(url, data, config);
}

export function Delete(url: string): AxiosPromise<any> {
  const authHeader: ITokenProp = initAuthHeaders();
  const config: object = {
    headers: {
      Authorization: "Bearer " + authHeader
    }
  };

  return axios.delete(url, config);
}

function initAuthHeaders(): ITokenProp {
  const token: ITokenProp = getStorage(AppEnum.AuthToken);
  if (token != null) {
    return token.access_token;
  }
}

axios.interceptors.response.use(function (response: any): AxiosResponse<any>  {
  return response;
}, function (error: any): Promise<never> {
  const originalRequest: any = error.config;
  if (error.response.status === StatusCode.NotAuthorize) {
    const token: ITokenProp = getStorage(AppEnum.AuthToken);
    const refreshToken: string = token.refresh_token;

    Post(
      TOKEN_ENDPOINT,
      qs.stringify({
        refresh_token: refreshToken,
        grant_type: "refresh_token",
        scope: "offline_access"
      })
    ).then(function (res: any): AxiosPromise<any> {
      let token: ITokenProp = {
        access_token: res.data.access_token,
        refresh_token: refreshToken,
        token_type: res.data.token_type,
        expires_in: res.data.expires_in
      };

      setStorage(AppEnum.AuthToken, token);
      window.location.reload();
      return axios(originalRequest);

    }).catch(function (error: any): void {
      console.log(error);
    });
  }

  return Promise.reject(error);
});