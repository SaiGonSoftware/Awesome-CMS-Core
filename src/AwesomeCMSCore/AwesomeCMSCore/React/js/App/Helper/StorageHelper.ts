export function setStorage(key: any, value: any): void {
	localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key: any): object {
	return JSON.parse(localStorage.getItem(key));
}

export function removeStorage(key: any): void {
	localStorage.removeItem(key);
}
