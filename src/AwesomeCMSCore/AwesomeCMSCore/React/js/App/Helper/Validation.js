export function shouldMarkError(field, errors) {
  return errors[field] && this.state.touched[field];
}

export function validateInput(validationArr) {
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

export function isFormValid(validationArr) {
  const errors = validateInput(validationArr);
  const isFormValid = Object.keys(errors).some(x => errors[x]);

  return !isFormValid;
}
