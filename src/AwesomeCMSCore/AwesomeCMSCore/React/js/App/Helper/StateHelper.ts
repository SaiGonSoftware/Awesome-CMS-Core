export function onChange(e: { target: { name: any; value: any; }; }): void {
	this.setState({
		[e.target.name]: e.target.value
	});
}

export function handleOnChange(value: any): void {
	this.setState({ value });
}

export function onBlur(e: any): void {
	this.setState({
		touched: { ...this.state.touched, [e.target.name]: true }
	});
}

export function onCheck(e: any): void {
	this.setState({
		[e.target.name]: e.target.checked
	});
}