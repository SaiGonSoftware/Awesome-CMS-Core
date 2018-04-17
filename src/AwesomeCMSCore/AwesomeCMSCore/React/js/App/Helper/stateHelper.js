export function onChange(e) {
  console.log("onChange", e.target.name);
  console.log("onChange", e.target.value);
  this.setState({
    [e.target.name]: e.target.value
  });
}

export function onBlur(e) {
  console.log("onBlur", e.target.name);
  console.log("onBlur", e.target.value);
  this.setState({
    touched: { ...this.state.touched, [e.target.name]: true }
  });
}

export function onCheck(e) {
  this.setState({
    [e.target.name]: e.target.checked
  });
}
