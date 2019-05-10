import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared.js";
import DashBoard from "./Dashboard";
import authedUser from "../reducers/authedUser.js";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return <div>{this.props.loading === true ? null : <DashBoard />}</div>;
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    loading: authedUser === null
  };
};
export default connect()(App);
