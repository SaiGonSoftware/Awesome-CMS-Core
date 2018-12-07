export function shouldMarkError(field: any, errors: any): any {
	return errors[field] && this.state.touched[field];
}

export function validateInput(validationArr: object[]): object[] {
	let validateData: object[] = [];
	// true means invalid, so our conditions got reversed
	// tslint:disable-next-line:typedef
	for (let i = 0; i < validationArr.length; i++) {
		// tslint:disable-next-line:forin
		for (let key in validationArr[i]) {
			validateData.push({ [key]: validationArr[i][key].trim().length === 0 });
		}
	}
	let validateObject: [] = Object.assign({}, ...validateData);
	return validateObject;
}

export function isFormValid(validationArr: []): boolean {
	const errors: any = validateInput(validationArr);
	const isFormValid: boolean = Object.keys(errors).some(x => errors[x]);
	return !isFormValid;
}

export function isEmptyArray(array: []): boolean {
	return typeof array !== "undefined" && array.length > 0;
}

export function isEmptyString(value: string): boolean {
	return value == null || value === "";
}
