export function shouldMarkError(field, errors) {
  const hasError = errors[field];
  const shouldShow = this.state.touched[field];

  return hasError ? shouldShow : false;
}
