export function setStorage(key: any, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key: any) {
  return JSON.parse(localStorage.getItem(key));
}

export function removeStorage(key: any) {
  localStorage.removeItem(key);
}