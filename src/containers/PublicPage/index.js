import React, { Component } from 'react';

import Wrapper from './Wrapper';
import SocialInfo from './SocialInfo';
import PostContent from './PostContent';
import SocialTabs from './SocialTabs';

const logoImg = require('../../assets/images/logo1.png');

class PublicPage extends Component {
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

export default PublicPage;
