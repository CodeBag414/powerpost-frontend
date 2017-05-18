import React, { Component } from 'react';
import Toggle from 'react-toggle';
import classnames from 'classnames';

import MultiLineInput from 'components/MultiLineInput';
import PopupBorder from 'components/PopupBorder';

import Wrapper from './Wrapper';

const streams = [
  { name: 'facebook', icon: 'fa fa-facebook-square', color: '#39579A' },
  { name: 'twitter', icon: 'fa fa-twitter-square', color: '#44ABF6' },
  { name: 'linkedin', icon: 'fa fa-linkedin-square', color: '#2278B8' },
  { name: 'pinterest', icon: 'fa fa-pinterest-square', color: '#BD081C' },
  { name: 'google', icon: 'fa fa-google-plus-square', color: '#DD4E41' },
];

class SharedStreams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      includePost: true,
      streamIndex: 0,   // defaults to facevook
      message: '123',
      allMessage: '123',
      streamMessage: {},
    };
  }

  handleMessageChange = (value) => {
    this.setState({
      message: value,
    });
  }

  handleMessageSave = () => {
    const { message, streamMessage, streamIndex } = this.state;

    const streamName = streams[streamIndex].name;

    this.setState({
      streamMessage: {
        ...streamMessage,
        [streamName]: message,
      },
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

export default SharedStreams;
