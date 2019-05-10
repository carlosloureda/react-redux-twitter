import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
class TweetPage extends Component {
  static propTypes = {};

  render() {
    const { id, replies } = this.props;
    return (
      <div>
        <Tweet id={id} />
        <NewTweet id={id} />
        {replies.length !== 0 && <h3 className="center">Replies</h3>}
        {replies.length !== 0 && (
          <ul>
            {replies.map(replyId => (
              <li key={replyId}>
                <Tweet id={replyId} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, tweets, users }, props) => {
  const { id } = props.match.params;

  return {
    id,
    replies: !tweets[id]
      ? []
      : tweets[id].replies.sort(
          (a, b) => tweets[b].timestamp - tweets[a].timestamp
        )
  };
};
export default connect(mapStateToProps)(TweetPage);
