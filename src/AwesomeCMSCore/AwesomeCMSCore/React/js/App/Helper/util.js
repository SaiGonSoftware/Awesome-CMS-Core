export function navigateToUrl(url) {
    window.location = url;
}

export function isDomExist(domName) {
    return document.getElementById(domName) !== null;
}