export function shouldMarkError(field, errors) {
  console.log(errors[field]);
  console.log(this.state.touched[field]);
  return errors[field] && this.state.touched[field];
}

export function validate(validationArr) {
  let validateData = [];
  // true means invalid, so our conditions got reversed
  for (let i = 0; i < validationArr.length; i++) {
    for (let key in validationArr[i]) {
      validateData.push({ [key] : validationArr[i][key].length === 0 });
    }
    console.log(validateData);
    return validateData;
  }
}
