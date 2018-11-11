import React, {Component} from 'react'
import {render} from "react-dom";

import {Get} from "Helper/Http";
import {INDEX_ENDPOINT} from 'Helper/API_Endpoint/IndexEndpoint';
import {isDomExist} from "Helper/Util";

import PostContainer from './Post/PostContainer.jsx';

class IndexComponent extends Component {
		constructor(props) {
				super(props);
				this.state = {
						vm: null
				}
		}

		componentDidMount() {
				Get(INDEX_ENDPOINT).then(res => {
						this.setState({vm: res.data});
				})
		}

		render() {
				const {vm} = this.state;
				
				return vm
						? (
								<container>
										{vm
												.posts
												.map(post => (<PostContainer key={post.id} post={post}/>))}
								</container>
						)
						: null
		}
}

if (isDomExist("index-page")) {
		render(
				<IndexComponent/>, document.getElementById("index-page"));
}
