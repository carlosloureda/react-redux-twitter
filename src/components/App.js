import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared.js";
import DashBoard from "./Dashboard";
import LoadingBar from "react-redux-loading";
import NewTweet from "./NewTweet";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        <LoadingBar />
        {this.props.loading === true ? null : <DashBoard />}
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    loading: authedUser === null
  };
};
export default connect()(App);
