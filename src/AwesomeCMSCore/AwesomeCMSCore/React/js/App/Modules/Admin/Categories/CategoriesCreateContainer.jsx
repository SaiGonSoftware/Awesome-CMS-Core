import React, { Component } from "react";
import { render } from "react-dom";
import toastr from "toastr";

import { handleOnChange } from "Helper/StateHelper";
import { Get, PostWithSpinner } from "Helper/Http";
import { isDomExist } from "Helper/Util";
import {STATUS_CODE} from "Helper/AppEnum";
import { CATEGORIES_API } from 'Helper/API_Endpoint/PostOptionEndpoint';

import ACCReactCreateSelect from "Common/ACCSelect/ACCReactCreateSelect.jsx";
import Spinner from "Common/ACCAnimation/Spinner.jsx";

class CategoriesCreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      options: [],
      value: []
    };
  }

  componentDidMount() {
    Get(CATEGORIES_API).then(res => {
      this.setState({
        value: res.data.value
          ? JSON.parse(res.data.value)
          : []
      });
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const key = JSON.stringify(this.state.value.map(x => x.value));
    const value = JSON.stringify(this.state.value);

    const categoriesVm = {
      key,
      value
    };

    PostWithSpinner.call(this, CATEGORIES_API, categoriesVm)
      .then(res => {
        if (res.status === STATUS_CODE.Success) toastr.success("Create success");
      })
      .catch(() => {
        toastr.error("Something went wrong.Please try again");
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
    const { options, value } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col col-md-12" id="categoriesContainer">
            <div className="card">
              <div className="card-header">
                Create categories for your post
              </div>
              <div className="card-body">
                <ACCReactCreateSelect
                  {...options}
                  value={value}
                  handleOnChange={value => handleOnChange.call(this, value)}
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

if (isDomExist("categoriesCreationSelect")) {
  render(
    <CategoriesCreateContainer />, document.getElementById("categoriesCreationSelect")
  );
}

