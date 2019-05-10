import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Tweet from "./Tweet";

class DashBoard extends Component {
  static propTypes = {
    tweetsIds: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <ul className="dashboard-list">
          {this.props.tweetsIds.map(id => (
            <li key={id}>
              {/* <div>TWEET ID: {id}</div> */}
              <Tweet id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ tweets }) => {
  return {
    tweetsIds: Object.keys(tweets).sort(
      (a, b) => tweets[b].timestamp - tweets[a].timestamp
    )
  };
};
export default connect(mapStateToProps)(DashBoard);
