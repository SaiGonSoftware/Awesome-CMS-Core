import axios from "axios";
import qs from 'qs';

import {
	APP_ENUM,
	STATUS_CODE
} from "./AppEnum";
import {
	getStorage,
	setStorage
} from "./StorageHelper";
import {
	TOKEN_ENDPOINT
} from './API_Endpoint/AccountEndpoint';

axios.defaults.baseURL = process.env.BASE_URL;

export function Get(url) {
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

export function PostWithSpinner(url, data, contentType = "") {
	return new Promise((resolve, reject) => {
		const authHeader = initAuthHeaders();
		const config = {
			headers: {
				Authorization: "Bearer " + authHeader,
				'Content-Type': contentType == "" ? "application/json;charset=UTF-8" : contentType
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

function initAuthHeaders() {
	const token = getStorage(APP_ENUM.AUTH_TOKEN);
	if (token != null) {
		return token.access_token;
	}
}

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	const originalRequest = error.config;
	if (error.response.status === STATUS_CODE.NotAuthorize) {
		const token = getStorage(APP_ENUM.AUTH_TOKEN);
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

			setStorage(APP_ENUM.AUTH_TOKEN, token);
			window.location.reload();
			return axios(originalRequest);

		}).catch(function (error) {
			console.log(error);
		});
	}

	return Promise.reject(error);
})