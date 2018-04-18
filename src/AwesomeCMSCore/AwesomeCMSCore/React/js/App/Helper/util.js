export function navigateToUrl(url) {
    window.location = url;
}

export function isDomExist(domName) {
    return document.getElementById(domName) !== null;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}