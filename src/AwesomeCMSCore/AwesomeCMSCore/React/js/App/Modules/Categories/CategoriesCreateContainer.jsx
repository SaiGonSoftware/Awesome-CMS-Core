import React, { Component } from "react";
import { render } from "react-dom";
import toastr from "toastr";

import { handleOnChange } from "../../Helper/stateHelper";
import { Get, PostWithSpinner } from "../../Helper/ajax";
import { isDomExist } from "../../Helper/util";
import ACCReactSelect from "../../Common/ACCReactSelect.jsx";
import Spinner from "../../Common/Spinner.jsx";
import env from "./../../Helper/envConfig";
import statusCode from "./../../Helper/StatusCode";

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
    Get(env.categories).then(res => {
      this.setState({
        value: res.data.categoriesOptions
          ? JSON.parse(res.data.categoriesOptions)
          : []
      });
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const categoriesData = JSON.stringify(this.state.value.map(x => x.value));
    const categoriesOptions = JSON.stringify(this.state.value);

    const categoriesVm = {
      categoriesData,
      categoriesOptions
    };

    PostWithSpinner.call(this, env.categoriesCreate, categoriesVm)
      .then(res => {
        if (res.status === statusCode.Success) toastr.success("Create success");
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
          <div className="col col-md-12" id="tagContainer">
            <div className="card">
              <div className="card-header">
                Create categories for your post (Simply type in what you want)
              </div>
              <div className="card-body">
                <ACCReactSelect
                  id="tagCreate"
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
    <CategoriesCreateContainer />,
    document.getElementById("categoriesCreationSelect")
  );
}

CategoriesCreateContainer.propTypes = {};
