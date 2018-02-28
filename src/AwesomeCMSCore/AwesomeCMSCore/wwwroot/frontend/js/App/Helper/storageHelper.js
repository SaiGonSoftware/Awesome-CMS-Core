export function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key) {
    return localStorage.getItem(key);
}

export function removeStorage(key) {
    localStorage.removeItem(key);
}