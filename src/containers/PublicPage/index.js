import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchPostSetRequest } from './actions';
import { selectPostSet } from './selectors';

import Wrapper from './Wrapper';
import SocialInfo from './SocialInfo';
import PostContent from './PostContent';
import SocialTabs from './SocialTabs';

const logoImg = require('../../assets/images/logo1.png');

class PublicPage extends Component {
  componentDidMount() {
    this.props.fetchPostSet({
      id: 7,
    });
  }

  componentWillReceiveProps({ postSet }) {
    console.log(postSet.getIn(['details', 'account_id']));
  }

  render() {
    return (
      <Wrapper>
        <div className="header"><img role="presentation" src={logoImg} /></div>
        <div className="content">
          <SocialInfo />
          <PostContent />
          <SocialTabs />
        </div>
      </Wrapper>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchPostSet: (payload) => dispatch(fetchPostSetRequest(payload)),
  };
}

const mapStateToProps = createStructuredSelector({
  postSet: selectPostSet(),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicPage);
