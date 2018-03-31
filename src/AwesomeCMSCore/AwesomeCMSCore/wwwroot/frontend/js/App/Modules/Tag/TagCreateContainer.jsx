import React, { Component } from "react";
import { render } from "react-dom";
import qs from "qs";

import { Post } from "../../Helper/ajax";
import { isDomExist } from "../../Helper/util";
import TagCreate from "./TagCreate.jsx";
import Spinner from "../../Common/Spinner.jsx";
import env from "./../../Helper/envConfig";
import statusCode from "./../../Helper/StatusCode";
import toastr from "toastr";

class TagCreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multi: true,
      loading: false,
      options: [],
      value: []
    };
  }

  handleOnChange = value => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const inputData = JSON.stringify(this.state.value.map(x => x.value));
    Post(env.tagCreate, qs.stringify({ tagName: inputData })).then(res => {
      this.setState({ loading: false });
    });
  };

  renderButton() {
    const isDataNotValid = this.state.value.length === 0;

    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleSubmit}
          disabled={isDataNotValid}
        >
          Save
        </button>
      );
    }
  }

  render() {
    const { options, value, multi } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col col-md-12" id="tagContainer">
            <div className="card">
              <div className="card-header">
                Create tag for your post (Simply type in what you want)
              </div>
              <div className="card-body">
                <TagCreate
                  id="tagCreate"
                  {...options}
                  value={value}
                  multi={multi}
                  handleOnChange={this.handleOnChange}
                />
                <br />
                {this.renderButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

if (isDomExist("tagCreationSelect")) {
  render(<TagCreateContainer />, document.getElementById("tagCreationSelect"));
}

TagCreateContainer.propTypes = {};
