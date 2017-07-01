import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import { fetchPostSetRequest } from './actions';
import { selectPostSet } from './selectors';

import Wrapper from './Wrapper';
import SocialInfo from './SocialInfo';
import PostContent from './PostContent';
import SocialTabs from './SocialTabs';

const logoImg = require('../../assets/images/logo1.png');

class PublicPage extends Component {
  static propTypes = {
    fetchPostSet: PropTypes.func.isRequired,
    postSet: PropTypes.shape.isRequired,
    params: PropTypes.shape,
  }

  state = {
    thumbUrl: '',
    websiteUrl: '',
    title: '',
    accountColor: '',
    accountDescription: '',
    creationTime: '',
    message: '',
    mediaItems: [],
  }

  componentDidMount() {
    const { params } = this.props;
    if (params.id) {
      this.props.fetchPostSet({
        id: params.id,
      });
    }
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.async= true;
    script.innerHTML = `drift.on('ready', function(api) { api.widget.hide(); });`;
    this.instance.appendChild(script);
  }

  componentWillReceiveProps({ postSet }) {
    if (this.props.postSet !== postSet) {
      const creationTime = moment.unix(postSet.getIn(['details', 'creation_time'])).format('LLL');

      this.setState({
        thumbUrl: postSet.getIn(['details', 'account', 'properties', 'thumb_url']),
        websiteUrl: postSet.getIn(['details', 'account', 'properties', 'website_url']),
        title: postSet.getIn(['details', 'account', 'title']),
        accountColor: postSet.getIn(['details', 'account', 'properties', 'color']),
        accountDescription: postSet.getIn(['details', 'account', 'properties', 'description']),
        creationTime,
        message: postSet.getIn(['details', 'message']),
        mediaItems: postSet.getIn(['details', 'media_items']),
      });
    }
  }

  render() {
    const { thumbUrl, websiteUrl,
      title, accountColor,
      accountDescription, creationTime, message,
      mediaItems,
    } = this.state;

    return (
      <Wrapper>
        <div className="header"><a href="https://www.powerpost.digital"><img role="presentation" src={logoImg} /></a></div>
        <div className="container" style={{ marginTop: '60px' }}>
          <div className="row">
          <SocialInfo
            url={thumbUrl}
            websiteUrl={websiteUrl}
            title={title}
            color={accountColor}
            description={accountDescription}
          />
          <PostContent
            creationTime={creationTime}
            message={message}
            mediaItems={mediaItems}
          />
          </div>
        </div>
        <div ref={(el) => (this.instance = el)} />
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
