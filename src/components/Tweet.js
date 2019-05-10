import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formatTweet, formatDate } from "../utils/helpers";
import TiArrowBackOutline from "react-icons/lib/ti/arrow-back-outline";
import TiHeartOutline from "react-icons/lib/ti/heart-outline";
import TiHeartFullOutline from "react-icons/lib/ti/heart-full-outline";
import { handleToggleTweet } from "../actions/tweets";

class Tweet extends Component {
  static propTypes = {
    authedUser: PropTypes.string,
    tweet: PropTypes.object,
    id: PropTypes.string.isRequired
  };

  toParent = (e, id) => {
    e.preventDefault();
  };
  handleLike = e => {
    e.preventDefault();
    const { dispatch, tweet, authedUser } = this.props;
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser
      })
    );
  };
  render() {
    const { tweet } = this.props;
    if (tweet === null) {
      return <p>This tweet doesn't exists</p>;
    }
    const {
      name,
      avatar,
      timeStamp,
      text,
      hasLiked,
      likes,
      replies,
      parentTweet
    } = tweet;
    return (
      <div className="tweet">
        <img src={avatar} alt={`Avatar of {name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timeStamp)}</div>
            {parentTweet && (
              <button
                className="replying-to"
                onClick={e => {
                  this.toParent(e, parentTweet.id);
                }}
              >
                Replying to @{parentTweet.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  };
};
export default connect(mapStateToProps)(Tweet);