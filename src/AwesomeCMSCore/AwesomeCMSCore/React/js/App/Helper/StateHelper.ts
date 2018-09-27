export function onChange(e: { target: { name: any; value: any; }; }) {
	this.setState({
		[e.target.name]: e.target.value
	});
}

export function handleOnChange(value: any) {
	this.setState({ value });
}

export function onBlur(e: any) {
	this.setState({
		touched: { ...this.state.touched, [e.target.name]: true }
	});
}

export function onCheck(e: any) {
	this.setState({
		[e.target.name]: e.target.checked
	});
}
