export function shouldMarkError(field: any, errors: any): any {
  return errors[field] && this.state.touched[field];
}

export function validateInput(validationArr: []): [] {
  let validateData = [];
  // true means invalid, so our conditions got reversed
  for (let i = 0; i < validationArr.length; i++) {
    for (let key in validationArr[i]) {
      validateData.push({ [key]: validationArr[i][key].trim().length === 0 });
    }
  }

  let validateObject = Object.assign({}, ...validateData);

  return validateObject;
}

export function isFormValid(validationArr: []) {
  const errors = validateInput(validationArr);
  const isFormValid = Object.keys(errors).some(x => errors[x]);

  return !isFormValid;
}

export function isEmptyArray(array: []): boolean {
  return typeof array !== "undefined" && array.length > 0;
}

export function isEmptyString(value: string) {
  return (value == null || value === "");
}