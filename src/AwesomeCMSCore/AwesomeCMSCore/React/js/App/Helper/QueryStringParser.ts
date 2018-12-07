export function getUrlParams(parameter: any, defaultvalue: any): any {
	let urlparameter: any = defaultvalue;
	if (window.location.href.indexOf(parameter) > -1) {
			urlparameter = getUrlVars()[parameter];
	}
	return urlparameter;
}

function getUrlVars(): any {
	let vars: any = {};
	window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m: any, key: any, value: any): any {
			vars[key] = value;
	});
	return vars;
}

export function getAllUrlParams(url: string): object {

	// get query string from url (optional) or window
	let queryString: string = url ? url.split("?")[1] : window.location.search.slice(1);

	// we'll store the parameters here
	let obj: object = {};

	// if query string exists
	if (queryString) {

			// stuff after # is not part of query string, so get rid of it
			queryString = queryString.split("#")[0];

			// split our query string into its component parts
			let arr : Array<string> = queryString.split("&");

			// tslint:disable-next-line:typedef
			for (let i = 0; i < arr.length; i++) {
					// separate the keys and the values
					let a: Array<string> = arr[i].split("=");

					// in case params look like: list[]=thing1&list[]=thing2
					let paramNum: string = undefined;
					let paramName: string = a[0].replace(/\[\d*\]/, function (v) {
							paramNum = v.slice(1, -1);
							return "";
					});

					// set parameter value (use 'true' if empty)
					let paramValue: any = typeof (a[1]) === "undefined" ? true : a[1];

					// (optional) keep case consistent
					/* paramName = paramName.toLowerCase();
					paramValue = paramValue.toLowerCase(); */

					// if parameter name already exists

					if (obj[paramName]) {
							// convert value to array (if still string)
							if (typeof obj[paramName] === "string") {
									obj[paramName] = [obj[paramName]];
							}
							// if no array index number specified...
							if (typeof paramNum === "undefined") {
									// put the value on the end of the array
									obj[paramName].push(paramValue);
							} else {
									// put the value at that index number
									obj[paramName][paramNum] = paramValue;
							}
					} else {
							obj[paramName] = paramValue;
					}
			}
	}

	return obj;
}