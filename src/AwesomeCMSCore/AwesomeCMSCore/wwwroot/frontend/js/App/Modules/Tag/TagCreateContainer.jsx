import React, { Component } from "react";
import { render } from "react-dom";

import { isDomExist } from "../../Helper/util";
import TagCreate from "./TagCreate.jsx";

class TagCreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multi: true,
      options: [],
      value: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    this.setState({ value });
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
                <a href="#" className="btn btn-primary">
                  Save
                </a>
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
