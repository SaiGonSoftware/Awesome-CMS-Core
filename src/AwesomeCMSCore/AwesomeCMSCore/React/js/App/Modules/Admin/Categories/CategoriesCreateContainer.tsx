import React, { Component } from "react";
import { render } from "react-dom";
import toastr from "toastr";
import { handleOnChange } from "@HelperStateHelper";
import { Get, PostWithSpinner } from "@HelperHttp";
import { isDomExist } from "@HelperUtil";
import { StatusCode } from "@HelperAppEnum";
import { CATEGORIES_API } from "@HelperAPI_Endpoint/PostOptionEndpoint";
import ACCReactCreateSelect from "@Common/ACCSelect/ACCReactCreateSelect.tsx";
import Spinner from "@Common/ACCAnimation/Spinner.tsx";
type CategoriesCreateContainerState = {
  id: any | null,
  value: any | undefined[],
  loading: boolean,
  options: undefined[]
};
class CategoriesCreateContainer extends Component<
  {},
  CategoriesCreateContainerState
> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      options: [],
      value: [],
      id: null
    };
  }
  componentDidMount() {
    Get(CATEGORIES_API).then(res => {
      this.setState({
        id: res.data.id,
        value: res.data.value ? JSON.parse(res.data.value) : []
      });
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const key = JSON.stringify(this.state.value.map(x => x.value));
    const value = JSON.stringify(this.state.value);
    const categoriesVm = {
      id: this.state.id,
      key,
      value
    };
    PostWithSpinner.call(this, CATEGORIES_API, categoriesVm)
      .then(res => {
        if (res.status === StatusCode.Success) toastr.success("Create success");
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
              <div className="card-header">Create categories for your post</div>
              <div className="card-body">
                <ACCReactCreateSelect
                  {...options}
                  value={value}
                  handleOnChange={value => handleOnChange.call(this, value)}
                />
                <br /> {this.renderButton()}
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
