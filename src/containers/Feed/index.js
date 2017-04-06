import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';

import {
  fetchSocialFeed,
} from './actions';

import {
  makeSelectSocialFeed,
} from './selectors';

/**
 * Feed is the container for all social feeds -
 * i.e. Facebook, Twitter, Pinterest, LinkedIn and WordPress
 */
class Feed extends Component {

  componentDidMount() {
    this.fetchFeed(this.props);
  }

  componentWillReceiveProps(props) {
    if (this.props.location !== props.location) {
      this.fetchFeed(props);
    }
  }

  fetchFeed = (props) => {
    const { location, getSocialFeed } = props;
    const connectionId = location.pathname.split('/').pop();
    getSocialFeed(connectionId);
  }

  render() {
    const { feed } = this.props;
    // console.log('feed: *******', feed);

    return (
      <div>
        {feed.map((post) =>
          <div style={{ width: '100px', height: '50px' }}>{post.caption}</div>
        )}
      </div>
    );
  }
}

Feed.propTypes = {
  location: PropTypes.object,
  getSocialFeed: PropTypes.func,
  feed: PropTypes.array,
};

function mapDispatchToProps(dispatch) {
  return {
    getSocialFeed: (connectionId) => dispatch(fetchSocialFeed(connectionId)),
  };
}

const mapStateToProps = createStructuredSelector({
  feed: makeSelectSocialFeed(),
});

export default UserCanAccount(connect(mapStateToProps, mapDispatchToProps)(Feed));
