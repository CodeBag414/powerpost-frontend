import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';
import classnames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import MultiLineInput from 'components/MultiLineInput';
import PopupBorder from 'components/PopupBorder';

import {
  updatePostSetRequest,
} from 'containers/App/actions';

import {
  selectPostSet,
} from 'containers/PostEditor/selectors';

import Wrapper from './Wrapper';

const streams = [
  { name: 'message_facebook', icon: 'fa fa-facebook-square', color: '#39579A' },
  { name: 'message_twitter', icon: 'fa fa-twitter-square', color: '#44ABF6' },
  { name: 'message_linkedin', icon: 'fa fa-linkedin-square', color: '#2278B8' },
  { name: 'message_pinterest', icon: 'fa fa-pinterest-square', color: '#BD081C' },
  { name: 'message_google', icon: 'fa fa-google-plus-square', color: '#DD4E41' },
];

class SharedStreams extends Component {
  static propTypes = {
    postSet: PropTypes.object,
    updatePostSet: PropTypes.func,
  }

  state = {
    includePost: true,
    streamIndex: 0,   // defaults to facebook
    message: '',
    allMessage: '',
    streamMessage: {},
  };

  componentWillReceiveProps(nextProps) {
    const { postSet } = nextProps;

    if (this.props.postSet !== nextProps.postSet) {
      const postDetails = postSet.get('details');
      this.setState({
        allMessage: postDetails.get('message'),
        streamMessage: postDetails.get('properties'),
      });
    }
  }

  handleMessageChange = (value) => {
    this.setState({
      message: value,
    });
  }

  handleMessageSave = () => {
    const { postSet, updatePostSet } = this.props;
    const { message, streamMessage, streamIndex } = this.state;

    const postDetails = postSet.get('details').toJS();
    const streamName = streams[streamIndex].name;
    const newStreamMessage = {
      ...streamMessage,
      [streamName]: message,
    };
    this.setState({
      streamMessage: newStreamMessage,
    });

    updatePostSet({
      ...postDetails,
      id: postDetails.post_set_id,
      properties: newStreamMessage,
    });
    console.log('call me', streamMessage);
  }

  switchStream = (streamIndex) => {
    const { includePost, allMessage, streamMessage } = this.state;
    if (!includePost) {
      return;
    }

    const streamName = streams[streamIndex].name;

    this.setState({
      streamIndex,
      message: streamMessage[streamName] || allMessage,
    });
  }

  toggleIncludePost = () => {
    this.setState({
      includePost: !this.state.includePost,
    });
  }

  render() {
    const { includePost, streamIndex, message } = this.state;

    return (
      <Wrapper>
        <div className="first-row">
          <span className="include-label">Include this post in this brand's shared stream?</span>
          <Toggle
            defaultChecked={includePost}
            icons={false}
            onChange={this.toggleIncludePost}
          />
        </div>
        <section className={classnames({ disabled: !includePost })}>
          <div className="second-row">
            Modify Channel Messages
          </div>
          <div className="third-row">
            Optionally, you can click on the icons below to set the default message for each channel
          </div>
          <div className="stream-row">
            { streams.map((s, index) => {
              const color = (includePost && streamIndex === index) ?
                streams[streamIndex].color : undefined;
              return (
                <i
                  key={index}
                  className={classnames(s.icon, { enabled: includePost })}
                  style={{ color }}
                  onClick={() => this.switchStream(index)}
                />
              );
            })}
          </div>
          <div className="popup-wrapper">
            <PopupBorder
              left={0}
              top={16}
              arrowLeft={11 + (30 * streamIndex)}
              borderColor={streams[streamIndex].color}
            >
              <div className="message-wrapper">
                <MultiLineInput
                  highlightFocus={false}
                  message={message}
                  handleMessageChange={this.handleMessageChange}
                  onBlur={this.handleMessageSave}
                />
              </div>
            </PopupBorder>
          </div>
        </section>
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  postSet: selectPostSet(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updatePostSet: (payload) => dispatch(updatePostSetRequest(payload)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SharedStreams);
