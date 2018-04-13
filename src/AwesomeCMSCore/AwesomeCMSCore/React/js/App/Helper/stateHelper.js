export function onChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
}

export function onBlur(e) {
  this.setState({
    touched: { ...this.state.touched, [e.target.name]: true }
  });
}
